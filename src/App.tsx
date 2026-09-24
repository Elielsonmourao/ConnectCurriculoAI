import React, { useState, useEffect } from 'react';
import { CVData, LinkedInRoleTemplate } from './types';
import { INITIAL_CV_DATA, LINKEDIN_ROLE_TEMPLATES, calculateATSScore, createCustomRoleTemplate } from './data/linkedinDatabase';
import { BLANK_CV_DATA } from './data/blankCV';
import { Header } from './components/Header';
import { StepTabs } from './components/StepTabs';
import { AssistantCard } from './components/AssistantCard';
import { LoadingScreen } from './components/LoadingScreen';
import { HomeScreen } from './components/HomeScreen';
import { Step1StyleAndRole } from './components/steps/Step1StyleAndRole';
import { Step2PersonalInfo } from './components/steps/Step2PersonalInfo';
import { Step3Summary } from './components/steps/Step3Summary';
import { Step4Experience } from './components/steps/Step4Experience';
import { Step5Education } from './components/steps/Step5Education';
import { Step6SkillsLanguages } from './components/steps/Step6SkillsLanguages';
import { Step7FinalizeDownload } from './components/steps/Step7FinalizeDownload';
import { Step8LinkedInGuide } from './components/steps/Step8LinkedInGuide';
import { CVPreview } from './components/CVPreview';
import { exportCVToPDF, printCVSafely } from './utils/pdfExport';
import { exportCVToWord } from './utils/wordExport';
import { ArrowLeft, ArrowRight, Download, Home, Sparkles, MessageSquare } from 'lucide-react';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<'home' | 'editor'>('home');

  const [cvData, setCvData] = useState<CVData>(() => {
    const saved = localStorage.getItem('curriculo_ia_cv_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.warn('Falha ao restaurar dados salvos, usando padrão:', e);
      }
    }
    return INITIAL_CV_DATA;
  });

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAiOnline, setIsAiOnline] = useState<boolean>(true);
  const [showMobilePreview, setShowMobilePreview] = useState<boolean>(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState<boolean>(false);
  const [isGeneratingRoleAI, setIsGeneratingRoleAI] = useState<boolean>(false);

  // Template ativo de cargo (pode ser pré-definido ou personalizado/gerado pela IA)
  const [activeRoleTemplate, setActiveRoleTemplate] = useState<LinkedInRoleTemplate>(() => {
    const savedRole = localStorage.getItem('curriculo_ia_role_template');
    if (savedRole) {
      try {
        return JSON.parse(savedRole);
      } catch (e) {
        console.warn('Falha ao restaurar role template do storage:', e);
      }
    }
    const matched = LINKEDIN_ROLE_TEMPLATES.find((t) => t.roleName === cvData.targetRole);
    if (matched) return matched;
    return createCustomRoleTemplate(cvData.targetRole || 'Auxiliar Administrativo', cvData.targetArea || 'Administração & Escritório');
  });

  // Salvar no localStorage automaticamente a cada alteração
  useEffect(() => {
    try {
      localStorage.setItem('curriculo_ia_cv_data', JSON.stringify(cvData));
    } catch (err) {
      console.warn('Falha ao persistir no localStorage:', err);
    }
  }, [cvData]);

  // Salvar template do cargo no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('curriculo_ia_role_template', JSON.stringify(activeRoleTemplate));
    } catch (err) {
      console.warn('Falha ao salvar template no localStorage:', err);
    }
  }, [activeRoleTemplate]);

  // Verificar status do servidor
  useEffect(() => {
    fetch('/api/health')
      .then((r) => r.json())
      .then((data) => {
        setIsAiOnline(Boolean(data.aiOnline));
      })
      .catch(() => {
        setIsAiOnline(false);
      });
  }, []);

  const handleUpdateCV = (data: Partial<CVData>) => {
    setCvData((prev) => ({ ...prev, ...data }));
  };

  // Gerar template inteligente com IA para qualquer cargo digitado manualmente ou selecionado
  const handleGenerateRoleWithAI = async (roleName: string, areaName?: string) => {
    setIsGeneratingRoleAI(true);
    try {
      // 1. Imediatamente cria o modelo heurístico com regras de domínio (zero delay)
      const baseTemplate = createCustomRoleTemplate(roleName, areaName || 'Área Profissional');
      setActiveRoleTemplate(baseTemplate);

      // 2. Consulta a API Gemini em segundo plano para preencher dicas passo a passo e dados ricos
      const res = await fetch('/api/generate-role-template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetRole: roleName,
          targetArea: areaName || 'Área de Atuação Geral'
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.template) {
          setActiveRoleTemplate(data.template);
          setCvData((prev) => ({
            ...prev,
            targetRole: data.template.roleName,
            targetArea: data.template.area || prev.targetArea,
            roleHeadline: prev.roleHeadline && prev.roleHeadline.trim() !== ''
              ? prev.roleHeadline
              : (data.template.headlines[0] || `${data.template.roleName} | Profissional Qualificado`),
          }));
        }
      }
    } catch (err) {
      console.warn('Erro ao consultar IA para template de cargo:', err);
    } finally {
      setIsGeneratingRoleAI(false);
    }
  };

  const handleSelectRoleTemplate = (role: LinkedInRoleTemplate) => {
    setActiveRoleTemplate(role);
    setCvData((prev) => ({
      ...prev,
      targetRole: role.roleName,
      targetArea: role.area,
      roleHeadline: prev.roleHeadline ? prev.roleHeadline : role.headlines[0],
    }));

    // Se o cargo não tiver stepTips ou for novo, enriquecemos via IA
    if (!role.isAiGenerated && !role.stepTips) {
      handleGenerateRoleWithAI(role.roleName, role.area);
    }
  };

  // Aplicação de sugestões do Assistente de IA & LinkedIn
  const handleApplyAssistantText = (text: string, targetField: string) => {
    if (targetField === 'roleHeadline' || targetField === 'setHeadline') {
      handleUpdateCV({ roleHeadline: text });
    } else if (targetField === 'summary') {
      handleUpdateCV({ summary: text });
    } else if (targetField === 'appendExperienceBullet') {
      const exps = [...cvData.experiences];
      if (exps.length > 0) {
        const first = { ...exps[0] };
        first.description = first.description ? `${first.description}\n${text}` : text;
        exps[0] = first;
        handleUpdateCV({ experiences: exps });
      } else {
        handleUpdateCV({
          experiences: [
            {
              id: `exp-${Date.now()}`,
              company: 'Empresa / Instituição',
              role: cvData.roleHeadline || cvData.targetRole || 'Profissional',
              location: 'Brasil',
              startDate: '2022',
              endDate: 'Atual',
              current: true,
              description: text
            }
          ]
        });
      }
    } else if (targetField === 'insertVerb') {
      const exps = [...cvData.experiences];
      if (exps.length > 0) {
        const first = { ...exps[0] };
        first.description = first.description ? `${first.description}\n• ${text} ` : `• ${text} `;
        exps[0] = first;
        handleUpdateCV({ experiences: exps });
      }
    } else if (targetField === 'addCertification') {
      const existing = cvData.certifications || [];
      const newCert = {
        id: `cert-${Date.now()}`,
        name: text,
        issuer: text.includes('SENAI') ? 'SENAI' : 'Instituição de Formação',
        year: new Date().getFullYear().toString(),
      };
      handleUpdateCV({ certifications: [...existing, newCert] });
    } else if (targetField === 'addHardSkill') {
      const current = cvData.hardSkills || [];
      if (!current.includes(text)) {
        handleUpdateCV({ hardSkills: [...current, text] });
      }
    } else if (targetField === 'addSoftSkill') {
      const current = cvData.softSkills || [];
      if (!current.includes(text)) {
        handleUpdateCV({ softSkills: [...current, text] });
      }
    } else if (targetField === 'addLanguage') {
      const current = cvData.languages || [];
      handleUpdateCV({
        languages: [
          ...current,
          {
            id: `lang-${Date.now()}`,
            language: text,
            level: 'Básico / Iniciante (A1/A2)',
          }
        ]
      });
    }
  };

  const handleAddSkillsBatch = (skills: string[]) => {
    const unique = Array.from(new Set([...(cvData.hardSkills || []), ...skills]));
    handleUpdateCV({ hardSkills: unique });
  };

  // Download do PDF com jsPDF e html2canvas (100% garantido e independente de janelas do navegador)
  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await exportCVToPDF('cv-printable-area', cvData.fullName || 'Curriculo');
    } catch (e) {
      console.error('Erro ao gerar PDF:', e);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Impressão Direta no Navegador
  const [isPrinting, setIsPrinting] = useState<boolean>(false);

  const handlePrint = () => {
    setIsPrinting(true);
    try {
      if (!showMobilePreview) {
        setShowMobilePreview(true);
      }
      printCVSafely('cv-printable-area', cvData.fullName || 'Curriculo');
    } catch (e) {
      console.error('Erro ao acionar impressão:', e);
    } finally {
      setTimeout(() => {
        setIsPrinting(false);
      }, 500);
    }
  };

  // Rolagem automática para o topo da página
  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
    const editorTop = document.getElementById('editor-panel-top');
    if (editorTop) {
      editorTop.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  // Sempre que a etapa atual ou visualização mudar, rola imediatamente para o topo
  useEffect(() => {
    scrollToTop();
    const t1 = setTimeout(scrollToTop, 15);
    const t2 = setTimeout(scrollToTop, 60);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [currentStep, currentView]);

  const handleGoToStep = (step: number) => {
    setCurrentStep(step);
    scrollToTop();
    setTimeout(scrollToTop, 15);
    setTimeout(scrollToTop, 60);
  };

  // Download formato Word (.doc) com opção de Moderno, Coluna Lateral ou Clássico ATS (2,5 cm)
  const handleDownloadDoc = (format: 'sidebar' | 'classic' | 'modern' = 'modern') => {
    exportCVToWord(cvData, format);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cvData, null, 2));
    const a = document.createElement('a');
    a.href = dataStr;
    const safeName = (cvData.fullName || 'curriculo').trim().replace(/[^a-zA-Z0-9]/g, '_');
    a.download = `backup_${safeName}_${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => {
        try {
          const parsed = JSON.parse(evt.target?.result as string);
          setCvData(parsed);
          setCurrentView('editor');
          alert('Dados restaurados com sucesso!');
        } catch (err) {
          alert('Arquivo JSON inválido.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (window.confirm('Deseja restaurar os dados de exemplo padrão? Suas alterações atuais serão substituídas.')) {
      setCvData(INITIAL_CV_DATA);
    }
  };

  // Ações da Tela Home
  const handleStartNew = () => {
    setCvData(BLANK_CV_DATA);
    setCurrentStep(1);
    setCurrentView('editor');
  };

  const handleContinue = () => {
    setCurrentView('editor');
  };

  const handleLoadExample = () => {
    setCvData(INITIAL_CV_DATA);
    setCurrentStep(1);
    setCurrentView('editor');
  };

  const handleGoHome = () => {
    setCurrentView('home');
  };

  const atsScore = calculateATSScore(cvData);
  const hasSavedCV = Boolean(
    cvData.fullName?.trim() ||
    cvData.roleHeadline?.trim() ||
    (cvData.experiences && cvData.experiences.some((e) => e.role?.trim() || e.company?.trim()))
  );

  return (
    <>
      {/* 1. TELA DE CARREGAMENTO INICIAL COM A LOGO EXCLUSIVA */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* 2. TELA DE HOME COM POUCAS OPÇÕES DIRETAS */}
      {currentView === 'home' ? (
        <HomeScreen
          onStartNew={handleStartNew}
          onContinue={handleContinue}
          onLoadExample={handleLoadExample}
          onImportJSON={handleImportJSON}
          onGoToLinkedInGuide={() => {
            setCurrentStep(8);
            setCurrentView('editor');
          }}
          hasSavedCV={hasSavedCV}
          savedCandidateName={cvData.fullName}
          savedCandidateRole={cvData.roleHeadline || cvData.targetRole}
          atsScore={atsScore.score}
        />
      ) : (
        /* 3. TELA DO EDITOR COMPLETO DE CURRÍCULO & LINKEDIN */
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
          
          {/* CABEÇALHO GLOBAL */}
          <Header
            atsScore={atsScore}
            onDownloadPDF={handleDownloadPDF}
            onPrint={handlePrint}
            isPrinting={isPrinting}
            onDownloadDoc={handleDownloadDoc}
            onReset={handleReset}
            isAiOnline={isAiOnline}
            onToggleMobilePreview={() => setShowMobilePreview(!showMobilePreview)}
            showMobilePreview={showMobilePreview}
            onGoHome={handleGoHome}
          />

          {/* BARRA DE NAVEGAÇÃO DOS PASSOS (1 a 8) */}
          <StepTabs currentStep={currentStep} onSelectStep={handleGoToStep} />

          {/* ÁREA DE TRABALHO DIVIDIDA (EDITOR LATERAL + PRÉVIA EM TEMPO REAL) */}
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 flex flex-col lg:flex-row gap-6 items-start">
            
            {/* PAINEL DO EDITOR LATERAL (Esquerda) */}
            <div className={`w-full lg:w-[48%] flex flex-col space-y-5 no-print ${showMobilePreview ? 'hidden lg:flex' : 'flex'}`}>
              
              {/* Âncora invisível para rolagem imediata ao topo */}
              <div id="editor-panel-top" className="scroll-mt-6" />

              {/* Botão rápido para voltar à Home na lateral */}
              <div className="flex items-center justify-between px-1">
                <button
                  type="button"
                  onClick={handleGoHome}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Voltar para a Página Inicial</span>
                </button>
                <div className="flex items-center gap-2">
                  {isGeneratingRoleAI && (
                    <span className="text-[11px] text-blue-600 font-semibold animate-pulse flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      Otimizando com IA...
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400 font-medium">Salvamento automático</span>
                </div>
              </div>

              {/* Renderização do Passo Atual com Exemplos e Dicas dinâmicos por cargo */}
              <div className="flex-1 space-y-6">
                {currentStep === 1 && (
                  <Step1StyleAndRole
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    selectedTemplateRole={activeRoleTemplate}
                    onSelectRoleTemplate={handleSelectRoleTemplate}
                    onGenerateRoleAI={handleGenerateRoleWithAI}
                    isGeneratingRoleAI={isGeneratingRoleAI}
                  />
                )}
                {currentStep === 2 && (
                  <Step2PersonalInfo
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    currentRoleTemplate={activeRoleTemplate}
                  />
                )}
                {currentStep === 3 && (
                  <Step3Summary
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    currentRoleTemplate={activeRoleTemplate}
                  />
                )}
                {currentStep === 4 && (
                  <Step4Experience
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    currentRoleTemplate={activeRoleTemplate}
                  />
                )}
                {currentStep === 5 && (
                  <Step5Education
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    currentRoleTemplate={activeRoleTemplate}
                  />
                )}
                {currentStep === 6 && (
                  <Step6SkillsLanguages
                    cvData={cvData}
                    onChange={handleUpdateCV}
                    currentRoleTemplate={activeRoleTemplate}
                  />
                )}
                {currentStep === 7 && (
                  <Step7FinalizeDownload
                    cvData={cvData}
                    atsScore={atsScore}
                    onDownloadPDF={handleDownloadPDF}
                    onPrint={handlePrint}
                    isPrinting={isPrinting}
                    onDownloadDoc={handleDownloadDoc}
                    onExportJSON={handleExportJSON}
                    onImportJSON={handleImportJSON}
                    onGoToLinkedInGuide={() => handleGoToStep(8)}
                    isGeneratingPDF={isGeneratingPDF}
                  />
                )}
                {currentStep === 8 && (
                  <Step8LinkedInGuide
                    cvData={cvData}
                    currentRoleTemplate={activeRoleTemplate}
                    onBackToDownload={() => handleGoToStep(7)}
                  />
                )}

                {/* Centro de IA para o Candidato (abaixo de cada etapa, de 1 a 6) */}
                {/* A key força montagem limpa e recolhida em qualquer troca de etapa, esperando o clique do candidato */}
                {currentStep <= 6 && (
                  <AssistantCard
                    key={`assistant-card-step-${currentStep}`}
                    step={currentStep}
                    currentRoleTemplate={activeRoleTemplate}
                    onApplyText={handleApplyAssistantText}
                    onAddSkills={handleAddSkillsBatch}
                    onGenerateRoleAI={handleGenerateRoleWithAI}
                    isGeneratingRoleAI={isGeneratingRoleAI}
                    candidateContext={{
                      nome: cvData.fullName,
                      cargo: cvData.roleHeadline || cvData.targetRole,
                      resumo: cvData.summary,
                      experiencia: cvData.experiences.map((e) => `${e.role} em ${e.company}: ${e.description}`).join('; '),
                      habilidades: (cvData.hardSkills || []).join(', '),
                    }}
                  />
                )}
              </div>

              {/* Navegação Inferior (Anterior / Próximo) */}
              <div className="no-print pt-4 flex items-center justify-between border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => handleGoToStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:pointer-events-none cursor-pointer shadow-2xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Etapa Anterior</span>
                </button>

                <span className="text-xs font-semibold text-slate-500">
                  Passo {currentStep} de 8 {currentStep === 8 && '(Opcional)'}
                </span>

                {currentStep < 7 && (
                  <button
                    type="button"
                    onClick={() => handleGoToStep(currentStep + 1)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shadow-xs"
                  >
                    <span>Próxima Etapa</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}

                {currentStep === 7 && (
                  <button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 transition-colors cursor-pointer shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isGeneratingPDF ? 'Gerando PDF...' : 'Baixar Currículo em PDF'}</span>
                  </button>
                )}

                {currentStep === 8 && (
                  <button
                    type="button"
                    onClick={() => handleGoToStep(7)}
                    className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs"
                  >
                    <span>Voltar ao Download</span>
                  </button>
                )}
              </div>

            </div>

            {/* PAINEL DA PRÉVIA VISUAL EM TEMPO REAL (Direita) */}
            <div className={`w-full lg:w-[52%] sticky top-20 cv-preview-column ${!showMobilePreview ? 'hidden lg:block' : 'block'}`}>
              <div className="bg-slate-200/70 p-3 sm:p-5 rounded-3xl border border-slate-300/80 shadow-inner">
                <CVPreview cvData={cvData} />
              </div>
            </div>

          </div>

        </div>
      )}
    </>
  );
}
