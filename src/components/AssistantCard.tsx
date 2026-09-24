import React, { useState, useMemo, useEffect } from 'react';
import {
  Sparkles,
  Check,
  Database,
  BookOpen,
  RefreshCw,
  HelpCircle,
  Bot,
  Zap,
  Lightbulb,
  Target,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';
import { LinkedInRoleTemplate } from '../types';
import { ACTION_VERBS } from '../data/linkedinDatabase';
import { getRoleStepTips, RoleTipItem } from '../data/tipsDatabase';

interface AssistantCardProps {
  step: number;
  currentRoleTemplate: LinkedInRoleTemplate;
  onApplyText: (text: string, targetField: string) => void;
  onAddSkills?: (skills: string[]) => void;
  candidateContext: any;
  onGenerateRoleAI?: (roleName: string, areaName?: string) => Promise<void> | void;
  isGeneratingRoleAI?: boolean;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({
  step,
  currentRoleTemplate,
  onApplyText,
  onAddSkills,
  candidateContext,
  onGenerateRoleAI,
  isGeneratingRoleAI,
}) => {
  // Controle retrátil: por padrão fechado para não ocupar espaço desnecessário (o usuário clica para visualizar)
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Apenas as duas abas solicitadas pelo usuário: Dicas & Geração IA e Exemplos
  const [activeTab, setActiveTab] = useState<'ai' | 'examples'>('ai');
  const [appliedField, setAppliedField] = useState<string | null>(null);

  // Estados para Dicas em Tempo Real com IA
  const [aiTipsHistory, setAiTipsHistory] = useState<RoleTipItem[]>([]);
  const [currentAiIndex, setCurrentAiIndex] = useState<number>(0);
  const [isFetchingAiTip, setIsFetchingAiTip] = useState<boolean>(false);
  const [angleCounter, setAngleCounter] = useState<number>(0);
  const [aiSource, setAiSource] = useState<string>('gemini_ai_realtime');
  const [showAiInfoModal, setShowAiInfoModal] = useState<boolean>(false);

  // Normaliza o item da dica para garantir compatibilidade entre propriedades
  const normalizeTipItem = (raw: any, defaultIndex = 0): RoleTipItem => {
    const content = raw?.content || raw?.tip || `Recomendação estratégica focada em valorizar suas competências como ${currentRoleTemplate?.roleName}.`;
    const snippet = raw?.actionableSnippet || raw?.actionableInsight || '';
    const defaultTarget = step === 2 ? 'roleHeadline' : step === 3 ? 'summary' : step === 4 ? 'appendExperienceBullet' : step === 5 ? 'addCertification' : step === 6 ? 'addHardSkill' : 'copyText';

    return {
      id: raw?.id || `tip-${Date.now()}-${defaultIndex}`,
      title: raw?.title || `Estratégia para ${currentRoleTemplate?.roleName || 'sua função'}`,
      content,
      tip: content,
      actionableSnippet: snippet,
      actionableInsight: snippet,
      targetField: raw?.targetField || defaultTarget,
      tag: raw?.tag || 'Orientação Estratégica'
    };
  };

  // Consulta à Inteligência Artificial para Dicas da Etapa
  const fetchRealAiTip = async (advanceAngle = false) => {
    setIsFetchingAiTip(true);
    const nextAngle = advanceAngle ? angleCounter + 1 : angleCounter;
    if (advanceAngle) {
      setAngleCounter((prev) => prev + 1);
    }

    try {
      const res = await fetch('/api/ai-tip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roleName: currentRoleTemplate?.roleName,
          area: currentRoleTemplate?.area,
          step,
          candidateContext,
          angle: nextAngle
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success && data.tip) {
        setAiSource(data.source || 'gemini_ai_realtime');
        const normalized = normalizeTipItem(data.tip, nextAngle);
        setAiTipsHistory((prev) => {
          const updated = [...prev, normalized];
          setCurrentAiIndex(updated.length - 1);
          return updated;
        });
        return;
      }
      throw new Error('Formato inesperado na resposta da IA');
    } catch (err) {
      console.warn('Usando acervo inteligente de sugestões sob medida:', err);
      const fallbackList = getRoleStepTips(currentRoleTemplate, step);
      const chosen = fallbackList[nextAngle % fallbackList.length];
      const normalized = normalizeTipItem(chosen, nextAngle);
      setAiSource('smart_dynamic_fallback');
      setAiTipsHistory((prev) => {
        const updated = [...prev, normalized];
        setCurrentAiIndex(updated.length - 1);
        return updated;
      });
    } finally {
      setIsFetchingAiTip(false);
    }
  };

  // Sempre que passar para uma nova etapa, garante que o Centro de IA fique recolhido esperando o clique do candidato
  useEffect(() => {
    setIsExpanded(false);
  }, [step]);

  // Carrega a primeira dica sob medida da IA sempre que a etapa ou cargo mudar
  useEffect(() => {
    setIsExpanded(false);
    const initialList = getRoleStepTips(currentRoleTemplate, step);
    const firstTip = normalizeTipItem(initialList[0], 0);

    setAiTipsHistory([firstTip]);
    setCurrentAiIndex(0);
    setAngleCounter(0);
    setAiSource('gemini_ai_realtime');

    // Dispara consulta em segundo plano para obter análise do motor inteligente
    fetchRealAiTip(false);
  }, [step, currentRoleTemplate?.roleName]);

  const activeTip = useMemo(() => {
    if (aiTipsHistory.length > 0 && aiTipsHistory[currentAiIndex]) {
      return aiTipsHistory[currentAiIndex];
    }
    const initialList = getRoleStepTips(currentRoleTemplate, step);
    return normalizeTipItem(initialList[0], 0);
  }, [aiTipsHistory, currentAiIndex, currentRoleTemplate, step]);

  const notifyApplied = (fieldKey: string) => {
    setAppliedField(fieldKey);
    setTimeout(() => {
      setAppliedField((prev) => (prev === fieldKey ? null : prev));
    }, 2500);
  };

  // Aplica a sugestão da IA diretamente no formulário
  const handleApplyAiSuggestion = () => {
    const textToApply = activeTip.actionableSnippet || activeTip.actionableInsight;
    if (!textToApply) return;

    let target = activeTip.targetField;
    if (!target) {
      if (step === 2) target = 'roleHeadline';
      else if (step === 3) target = 'summary';
      else if (step === 4) target = 'appendExperienceBullet';
      else if (step === 5) target = 'addCertification';
      else if (step === 6) target = 'addHardSkill';
      else target = 'copyText';
    }

    if (target === 'copyText') {
      navigator.clipboard?.writeText(textToApply);
      notifyApplied('ai-actionable');
    } else {
      onApplyText(textToApply, target);
      notifyApplied('ai-actionable');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-indigo-200/90 shadow-sm transition-all overflow-hidden">
      
      {/* ========================================================================= */}
      {/* BARRA SUPERIOR RETRÁTIL (CLIQUE PARA EXPANDIR OU RECOLHER) */}
      {/* ========================================================================= */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-3.5 sm:p-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white cursor-pointer select-none hover:opacity-95 transition-all flex items-center justify-between gap-3"
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-xs shrink-0">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-xs sm:text-sm font-black tracking-tight text-white flex items-center gap-1.5">
                <span>Centro de IA para o Candidato</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>IA Ativa</span>
              </span>
            </div>
            <p className="text-[11px] text-indigo-200/80 line-clamp-1 mt-0.5">
              Dicas estratégicas, modelos inéditos e geração com IA para <strong className="text-white font-bold">{currentRoleTemplate.roleName}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[11px] font-bold text-indigo-200 hidden sm:inline">
            {isExpanded ? 'Recolher' : 'Clique para visualizar'}
          </span>
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
            {isExpanded ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTEÚDO EXPANSÍVEL (SÓ EXIBIDO QUANDO O CANDIDATO CLICAR PARA VISUALIZAR) */}
      {/* ========================================================================= */}
      {isExpanded && (
        <div className="p-4 sm:p-5 space-y-4 border-t border-indigo-100 bg-white">
          
          {/* SUB-CABEÇALHO INTERNO COM NAVEGAÇÃO DAS DUAS ABAS */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>Função ativa: <strong className="text-indigo-950 font-bold">{currentRoleTemplate.roleName}</strong></span>
              {onGenerateRoleAI && (
                <button
                  type="button"
                  onClick={() => onGenerateRoleAI(currentRoleTemplate.roleName, currentRoleTemplate.area)}
                  disabled={isGeneratingRoleAI}
                  className="inline-flex items-center gap-1 text-[11px] text-blue-700 hover:text-blue-900 font-semibold underline cursor-pointer disabled:opacity-50"
                  title="Atualizar e regenerar exemplos sob medida para esta profissão com Inteligência Artificial"
                >
                  <RefreshCw className={`w-3 h-3 ${isGeneratingRoleAI ? 'animate-spin text-blue-600' : ''}`} />
                  <span>{isGeneratingRoleAI ? 'Otimizando...' : 'Regenerar com IA'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowAiInfoModal(true)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 hover:text-indigo-700 text-[10px] font-medium transition-colors cursor-pointer"
              >
                <span>Como funciona a IA</span>
                <HelpCircle className="w-3 h-3" />
              </button>
            </div>

            {/* NAVEGAÇÃO ENTRE AS DUAS ABAS (Dicas & Geração IA | Exemplos) */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs shrink-0 self-start sm:self-auto">
              
              {/* Aba 1: Dicas & Geração IA */}
              <button
                type="button"
                onClick={() => setActiveTab('ai')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'ai'
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-indigo-600'
                }`}
              >
                <Bot className={`w-3.5 h-3.5 ${activeTab === 'ai' ? 'text-amber-300' : 'text-indigo-500'}`} />
                <span>Dicas & Geração IA</span>
              </button>

              {/* Aba 2: Exemplos Prontos do Banco */}
              <button
                type="button"
                onClick={() => setActiveTab('examples')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'examples'
                    ? 'bg-white text-blue-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-blue-700'
                }`}
              >
                <Database className="w-3.5 h-3.5 text-blue-600" />
                <span>Exemplos</span>
              </button>

            </div>
          </div>

          {/* MODAL EXPLICATIVO: COMO A INTELIGÊNCIA ARTIFICIAL FUNCIONA NO APP */}
          {showAiInfoModal && (
            <div className="p-4 mb-4 rounded-2xl bg-gradient-to-br from-indigo-950 to-slate-900 text-white border border-indigo-500/40 shadow-xl space-y-3 relative text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-emerald-400" />
                  <span className="font-bold text-sm text-white">Como a Inteligência Artificial Funciona Aqui</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAiInfoModal(false)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2 text-slate-300 leading-relaxed text-[11px] sm:text-xs">
                <p>
                  1. <strong>Você precisa adicionar uma API? Não!</strong> Nosso sistema já possui o motor inteligente e seguro configurado no servidor (backend Node.js) que se comunica com o <strong>Google Gemini</strong> e algoritmos especializados de recrutamento do Brasil.
                </p>
                <p>
                  2. <strong>Ação 100% Real para sua Função:</strong> Todas as dicas estratégicas e sugestões são formuladas sob medida de acordo com o cargo informado (<strong className="text-sky-300">{currentRoleTemplate.roleName}</strong>).
                </p>
                <p>
                  3. <strong>Para desenvolvedores / deploy com chave própria:</strong> Caso você hospede o projeto em seu próprio servidor e queira plugar sua chave pessoal da Google AI, basta definir <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">GEMINI_API_KEY</code> no arquivo <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">.env</code>.
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setShowAiInfoModal(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs cursor-pointer shadow-xs"
                >
                  Entendido, continuar usando o Centro de IA
                </button>
              </div>
            </div>
          )}

          {/* DICA ESPECIALIZADA RÁPIDA PARA O CARGO NESTA ETAPA */}
          {currentRoleTemplate.stepTips && currentRoleTemplate.stepTips[step] && (
            <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl text-xs text-blue-950 flex items-start gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-blue-900">Orientação Rápida para {currentRoleTemplate.roleName}: </span>
                <span className="leading-relaxed text-slate-700">{currentRoleTemplate.stepTips[step]}</span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 1: DICAS & GERAÇÃO IA (Consultoria Dinâmica & Sugestão em Tempo Real) */}
          {/* ========================================================================= */}
          {activeTab === 'ai' && (
            <div className="relative bg-gradient-to-br from-indigo-50/90 via-slate-50/90 to-blue-50/90 border border-indigo-200/80 rounded-2xl p-4 text-xs space-y-4 shadow-2xs overflow-hidden">
              
              <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-400/10 rounded-full blur-2xl pointer-events-none -mr-12 -mt-12" />

              {/* Barra Superior da IA */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 pb-2.5 border-b border-indigo-100 relative z-10">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-bold text-[11px] shadow-xs">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                    <span>{aiSource === 'gemini_ai_realtime' ? 'Gemini AI em Tempo Real' : 'Centro de IA Ativo'}</span>
                  </span>

                  {activeTip?.tag && (
                    <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider bg-white/90 px-2.5 py-0.5 rounded-full border border-indigo-200/80 shadow-2xs">
                      {activeTip.tag}
                    </span>
                  )}
                </div>

                {/* Botão de Consultar Outra Dica na IA */}
                <button
                  type="button"
                  onClick={() => fetchRealAiTip(true)}
                  disabled={isFetchingAiTip}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 hover:text-indigo-900 border border-indigo-200 font-bold text-xs shadow-2xs transition-all cursor-pointer disabled:opacity-60"
                  title="Gerar e consultar outra sugestão inédita de IA para esta etapa"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-indigo-600 ${isFetchingAiTip ? 'animate-spin' : ''}`} />
                  <span>{isFetchingAiTip ? 'Consultando IA...' : 'Consultar Outra Dica da IA'}</span>
                </button>
              </div>

              {/* Card com a Análise Estratégica da IA para a Etapa */}
              <div className="bg-white/90 rounded-xl p-3.5 border border-indigo-100/90 shadow-2xs space-y-2 relative z-10">
                <div className="flex items-start gap-2.5">
                  <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700 shrink-0 mt-0.5">
                    <Target className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 w-full">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm tracking-tight">
                      {activeTip?.title || `Orientação para ${currentRoleTemplate.roleName}`}
                    </h4>
                    <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                      {activeTip?.content || activeTip?.tip}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sugestão de Texto Prático Formulada pela IA */}
              {(activeTip?.actionableSnippet || activeTip?.actionableInsight) && (
                <div className="bg-white/95 rounded-xl p-3.5 border border-indigo-200 shadow-2xs space-y-2.5 relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="font-bold text-[11px] text-indigo-950 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>Exemplo Inédito Recomendado pela IA:</span>
                    </span>
                    
                    <button
                      type="button"
                      onClick={handleApplyAiSuggestion}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold cursor-pointer transition-colors shadow-2xs flex items-center gap-1.5 self-start sm:self-auto"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>
                        {appliedField === 'ai-actionable'
                          ? (activeTip.targetField === 'copyText' ? 'Copiado!' : 'Inserido no Currículo!')
                          : (activeTip.targetField === 'copyText' ? 'Copiar Sugestão' : 'Usar no Currículo')}
                      </span>
                    </button>
                  </div>

                  <p className="text-slate-800 text-[11px] sm:text-xs leading-relaxed italic bg-indigo-50/70 p-3 rounded-lg border border-indigo-100">
                    "{activeTip.actionableSnippet || activeTip.actionableInsight}"
                  </p>
                </div>
              )}

              {/* Navegação Entre Dicas Anteriores / Próximas */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 relative z-10">
                <button
                  type="button"
                  disabled={currentAiIndex <= 0 || isFetchingAiTip}
                  onClick={() => setCurrentAiIndex((prev) => Math.max(0, prev - 1))}
                  className="text-indigo-700 hover:text-indigo-900 font-semibold cursor-pointer px-2.5 py-1 rounded-lg hover:bg-indigo-100/60 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  ← Orientação Anterior
                </button>
                <span className="font-medium text-indigo-950/70 hidden sm:inline text-center">
                  Sugestão {currentAiIndex + 1} de {aiTipsHistory.length} para <strong>{currentRoleTemplate.roleName}</strong>
                </span>
                <button
                  type="button"
                  disabled={isFetchingAiTip}
                  onClick={() => {
                    if (currentAiIndex < aiTipsHistory.length - 1) {
                      setCurrentAiIndex((prev) => prev + 1);
                    } else {
                      fetchRealAiTip(true);
                    }
                  }}
                  className="text-indigo-700 hover:text-indigo-900 font-bold cursor-pointer px-2.5 py-1 rounded-lg hover:bg-indigo-100/60 transition-colors disabled:opacity-40"
                >
                  Próxima Sugestão →
                </button>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ABA 2: EXEMPLOS PRONTOS DO BANCO DE DADOS (Tudo centralizado aqui) */}
          {/* ========================================================================= */}
          {activeTab === 'examples' && (
            <div className="space-y-4 pt-1">
              
              {/* ETAPA 1: PALAVRAS-CHAVE E TERMOS BUSCADOS */}
              {step === 1 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700 space-y-3">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Como escolher o cargo e o modelo visual:
                  </p>
                  <p className="leading-relaxed text-slate-600">
                    Selecione o cargo mais próximo da vaga que você deseja concorrer. Todas as recomendações se adaptam automaticamente ao seu objetivo.
                  </p>
                  <div className="pt-1 space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-700 block">Termos e palavras-chave mais buscadas para esta área:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentRoleTemplate.commonKeywords.map((kw, idx) => (
                        <span key={idx} className="bg-white text-slate-700 px-2.5 py-1 rounded-md text-[11px] font-medium border border-slate-200">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 2: MODELOS DE TÍTULO PROFISSIONAL (HEADLINE) */}
              {step === 2 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <div>
                    <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      Modelos de Título Profissional (Headline) Prontos para Usar:
                    </p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      O título fica logo abaixo do seu nome e resume o que você faz em poucas palavras. Clique em "Usar no Currículo" para preencher automaticamente.
                    </p>
                  </div>

                  <div className="space-y-2 pt-1">
                    {currentRoleTemplate.headlines.map((hl, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-2xs">
                        <span className="text-slate-800 leading-relaxed font-medium">{hl}</span>
                        <button
                          type="button"
                          onClick={() => {
                            onApplyText(hl, 'roleHeadline');
                            notifyApplied(`hl-${idx}`);
                          }}
                          className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shrink-0 text-[11px] cursor-pointer transition-colors"
                        >
                          {appliedField === `hl-${idx}` ? (
                            <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Inserido!</span>
                          ) : (
                            'Usar no Currículo'
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ETAPA 3: MODELOS DE RESUMO PROFISSIONAL */}
              {step === 3 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Modelos de Resumo Profissional Prontos:
                  </p>
                  <div className="space-y-2.5 pt-1">
                    {currentRoleTemplate.summaries.map((sm, idx) => (
                      <div key={idx} className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2 shadow-2xs">
                        <p className="text-slate-800 leading-relaxed italic">{sm}</p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              onApplyText(sm, 'summary');
                              notifyApplied(`sm-${idx}`);
                            }}
                            className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 text-[11px] cursor-pointer transition-colors"
                          >
                            {appliedField === `sm-${idx}` ? (
                              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Inserido no Resumo!</span>
                            ) : (
                              'Usar Este Resumo'
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ETAPA 4: EXPERIÊNCIAS (ATUALIZAÇÕES + BANCO DE VERBOS INTEGRADO) */}
              {step === 4 && (
                <div className="space-y-4">
                  
                  {/* Bullets de Conquistas Prontas */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                    <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      Atividades e Conquistas Prontas para a Descrição:
                    </p>
                    <div className="space-y-2 pt-1">
                      {currentRoleTemplate.experienceBullets.map((exp, idx) => (
                        <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-2xs">
                          <span className="text-slate-800 leading-relaxed">{exp}</span>
                          <button
                            type="button"
                            onClick={() => {
                              onApplyText(exp, 'appendExperienceBullet');
                              notifyApplied(`exp-${idx}`);
                            }}
                            className="px-2.5 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shrink-0 text-[11px] cursor-pointer transition-colors"
                          >
                            {appliedField === `exp-${idx}` ? (
                              <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Adicionado!</span>
                            ) : (
                              '+ Adicionar'
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Banco de Verbos de Ação Estratégicos (Centralizado no card Exemplos) */}
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs space-y-3 text-amber-950">
                    <div className="flex items-center gap-2 pb-2 border-b border-amber-200/60">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-amber-900">Banco de Verbos de Ação Estratégicos (Aprovados em ATS):</span>
                    </div>
                    <p className="text-[11px] text-amber-900/80 leading-relaxed">
                      Comece cada frase da sua experiência com um verbo forte no passado. Clique no verbo abaixo para inseri-lo diretamente na descrição:
                    </p>

                    <div className="space-y-3 pt-1">
                      {[
                        { label: 'Resultados & Métricas', list: ACTION_VERBS.resultados },
                        { label: 'Liderança & Coordenação', list: ACTION_VERBS.lideranca },
                        { label: 'Criação & Desenvolvimento', list: ACTION_VERBS.criacao },
                        { label: 'Organização & Processos', list: ACTION_VERBS.organizacao },
                      ].map((cat, catIdx) => (
                        <div key={catIdx} className="space-y-1">
                          <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">{cat.label}:</span>
                          <div className="flex flex-wrap gap-1.5">
                            {cat.list.map((verb, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => {
                                  onApplyText(verb, 'insertVerb');
                                  notifyApplied(`verb-${catIdx}-${idx}`);
                                }}
                                className="px-2.5 py-1 rounded-md bg-white border border-amber-300 hover:border-amber-500 hover:bg-amber-100 text-amber-950 text-[11px] font-medium transition-colors cursor-pointer"
                              >
                                + {verb}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    {appliedField?.startsWith('verb-') && (
                      <p className="text-emerald-700 font-semibold text-[11px] pt-1">
                        ✅ Verbo inserido no campo de descrição da experiência ativa!
                      </p>
                    )}
                  </div>

                </div>
              )}

              {/* ETAPA 5: FORMAÇÃO E CERTIFICAÇÕES */}
              {step === 5 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    Cursos e Certificações Recomendadas para esta área:
                  </p>
                  <div className="space-y-2 pt-1">
                    {currentRoleTemplate.certifications.map((cert, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                        <span className="text-slate-800 font-medium">{cert}</span>
                        <button
                          type="button"
                          onClick={() => {
                            onApplyText(cert, 'addCertification');
                            notifyApplied(`cert-${idx}`);
                          }}
                          className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 shrink-0 text-[11px] cursor-pointer transition-colors"
                        >
                          {appliedField === `cert-${idx}` ? (
                            <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Adicionado!</span>
                          ) : (
                            '+ Adicionar Curso'
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ETAPA 6: HABILIDADES TÉCNICAS E COMPORTAMENTAIS */}
              {step === 6 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-4">
                  <div>
                    <p className="font-semibold text-slate-900 mb-2">Competências Técnicas Mais Valorizadas (Hard Skills):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentRoleTemplate.hardSkills.map((hs, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            onApplyText(hs, 'addHardSkill');
                            notifyApplied(`hs-${idx}`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-blue-600 hover:text-blue-700 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>+ {hs}</span>
                          {appliedField === `hs-${idx}` && <Check className="w-3 h-3 text-emerald-600" />}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-200">
                    <p className="font-semibold text-slate-900 mb-2">Competências Comportamentais (Soft Skills):</p>
                    <div className="flex flex-wrap gap-1.5">
                      {currentRoleTemplate.softSkills.map((ss, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            onApplyText(ss, 'addSoftSkill');
                            notifyApplied(`ss-${idx}`);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:border-emerald-600 hover:text-emerald-700 text-[11px] font-medium transition-colors cursor-pointer flex items-center gap-1"
                        >
                          <span>+ {ss}</span>
                          {appliedField === `ss-${idx}` && <Check className="w-3 h-3 text-emerald-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ETAPA 7: APRESENTAÇÃO LINKEDIN */}
              {step === 7 && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-3">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    Texto para a Seção "Sobre" do LinkedIn:
                  </p>
                  <div className="p-3.5 rounded-lg bg-white border border-slate-200 space-y-2.5 shadow-2xs">
                    <p className="text-slate-800 leading-relaxed italic whitespace-pre-line">
                      {currentRoleTemplate.linkedinAbout}
                    </p>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(currentRoleTemplate.linkedinAbout);
                          notifyApplied('linkedinAbout');
                        }}
                        className="px-3 py-1 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 text-[11px] cursor-pointer transition-colors"
                      >
                        {appliedField === 'linkedinAbout' ? (
                          <span className="flex items-center gap-1"><Check className="w-3 h-3" /> Copiado para a Área de Transferência!</span>
                        ) : (
                          'Copiar Texto do LinkedIn'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};
