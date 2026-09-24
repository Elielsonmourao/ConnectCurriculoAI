import React, { useState } from 'react';
import { CVData, LinkedInRoleTemplate } from '../../types';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  Camera,
  UserCheck,
  Briefcase,
  Wrench,
  CheckCircle2,
  ArrowLeft,
  Info,
  HelpCircle
} from 'lucide-react';

interface Step8Props {
  cvData: CVData;
  currentRoleTemplate: LinkedInRoleTemplate;
  onBackToDownload: () => void;
}

export const Step8LinkedInGuide: React.FC<Step8Props> = ({
  cvData,
  currentRoleTemplate,
  onBackToDownload,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const headline = cvData.roleHeadline || `${cvData.targetRole} | Especialista em Resultados`;
  const aboutText = cvData.summary || currentRoleTemplate.linkedinAbout;

  return (
    <div className="space-y-6">
      
      {/* CABEÇALHO DA ETAPA OPCIONAL */}
      <div className="bg-sky-50 border border-sky-200 p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900">
                  Guia Prático: Como Criar seu Perfil no LinkedIn
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Etapa Opcional
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Transforme as informações do seu currículo em um perfil digital atraente para empresas.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onBackToDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para Baixar o Currículo</span>
          </button>
        </div>

        <div className="text-xs text-sky-950 bg-white/80 p-3 rounded-xl border border-sky-100 leading-relaxed">
          <strong>Aviso amigável:</strong> Você não precisa fazer isso agora se estiver com pressa para enviar seu currículo! Se desejar, guarde esta tela ou copie as informações abaixo quando for criar sua conta no LinkedIn.
        </div>
      </div>

      {/* PASSO 1: CRIAR CONTA NO LINKEDIN */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            1
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Crie sua Conta Gratuita no LinkedIn
          </h4>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          O LinkedIn funciona como um site seguro onde você coloca seus dados profissionais. Se você ainda não tem uma conta, basta clicar no botão abaixo para abrir a página oficial de cadastro:
        </p>

        <div className="pt-1">
          <a
            href="https://www.linkedin.com/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shadow-xs"
          >
            <span>Abrir o Cadastro do LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <p className="text-[11px] text-slate-400 mt-1">
            Dica: Cadastre-se usando o mesmo e-mail ({cvData.email || 'seu e-mail'}) que você colocou no currículo.
          </p>
        </div>
      </div>

      {/* PASSO 2: FOTO DE PERFIL E CAPA */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            2
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Foto de Perfil e Imagem de Fundo (Capa)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              Foto de Rosto (Perfil)
            </span>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Escolha uma foto onde seu rosto apareça com clareza, em um local bem iluminado (de preferência perto de uma janela), com expressão amigável.
            </p>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Imagem de Fundo (Capa)
            </span>
            <p className="text-[11px] leading-relaxed text-slate-600">
              Você pode deixar o fundo padrão ou colocar uma imagem simples relacionada à sua área (por exemplo: ferramentas, computadores, ambiente industrial ou de escritório).
            </p>
          </div>
        </div>
      </div>

      {/* PASSO 3: TÍTULO DO PERFIL (HEADLINE) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              3
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Título Profissional (O que colocar embaixo do seu nome)
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(headline, 'copy-headline')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedId === 'copy-headline' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Título</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-600">
          No LinkedIn, existe um campo chamado <strong>"Título"</strong>. É o texto que os recrutadores leem primeiro quando procuram candidatos. Copie o texto abaixo e cole lá:
        </p>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-blue-950">
          {headline}
        </div>
      </div>

      {/* PASSO 4: SEÇÃO "SOBRE" (ABOUT) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
              4
            </div>
            <h4 className="text-sm font-bold text-slate-900">
              Seção "Sobre" (O resumo da sua trajetória)
            </h4>
          </div>

          <button
            type="button"
            onClick={() => copyToClipboard(aboutText, 'copy-about')}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold transition-colors cursor-pointer"
          >
            {copiedId === 'copy-about' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar Texto "Sobre"</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-slate-600">
          No seu perfil, clique em <em>"Adicionar seção do perfil" &gt; "Sobre"</em> e cole o texto a seguir:
        </p>

        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 whitespace-pre-line leading-relaxed max-h-48 overflow-y-auto font-sans">
          {aboutText}
        </div>
      </div>

      {/* PASSO 5: EXPERIÊNCIAS NO LINKEDIN */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            5
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Adicionando suas Experiências no LinkedIn
          </h4>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Clique no botão <strong>"+"</strong> ao lado da seção "Experiência" no LinkedIn. Preencha o cargo, o nome da empresa e copie as atividades que preparamos:
        </p>

        {cvData.experiences && cvData.experiences.length > 0 ? (
          <div className="space-y-2">
            {cvData.experiences.map((exp, idx) => (
              <div key={exp.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">
                    {exp.role || 'Cargo'} — {exp.company || 'Empresa'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {exp.startDate} até {exp.endDate || (exp.current ? 'Atual' : '')}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copyToClipboard(exp.description, `copy-exp-${idx}`)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-medium cursor-pointer"
                >
                  {copiedId === `copy-exp-${idx}` ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700">Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copiar Descrição</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 italic">
            Nenhuma experiência cadastrada ainda no seu currículo.
          </p>
        )}
      </div>

      {/* PASSO 6: COMPETÊNCIAS (SKILLS) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
            6
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Adicione pelo menos 5 Competências no LinkedIn
          </h4>
        </div>

        <p className="text-xs text-slate-600">
          Quando recrutadores procuram candidatos no LinkedIn, eles usam palavras-chave de competências. Adicione na seção "Competências" do seu perfil as habilidades que você cadastrou no currículo:
        </p>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {(cvData.hardSkills || []).slice(0, 8).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-900 border border-blue-200 text-xs font-medium"
            >
              ✓ {skill}
            </span>
          ))}
          {(cvData.softSkills || []).slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-900 border border-purple-200 text-xs font-medium"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {/* PASSO 7: ATIVAR BUSCA DE EMPREGO (#OpenToWork) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
            7
          </div>
          <h4 className="text-sm font-bold text-slate-900">
            Ative o Recurso "Buscando Emprego" (#OpenToWork)
          </h4>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          No topo do seu perfil no LinkedIn, clique no botão <strong>"Tenho interesse em..." &gt; "Encontrar um novo emprego"</strong>.
        </p>

        <div className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1">
          <span className="font-bold block">💡 Dica de Privacidade:</span>
          <p className="text-[11px] leading-relaxed">
            Você pode escolher se quer mostrar a moldura verde <em>#OpenToWork</em> para todos na internet ou apenas para pessoas com perfil de recrutador (ideal caso esteja trabalhando e queira discrição).
          </p>
        </div>
      </div>

      {/* BOTÃO FINAL PARA VOLTAR AO DOWNLOAD */}
      <div className="pt-2 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToDownload}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Finalizar & Baixar o Currículo (Etapa 7)</span>
        </button>
      </div>

    </div>
  );
};
