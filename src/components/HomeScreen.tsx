import React, { useRef, useState } from 'react';
import { AppLogo } from './AppLogo';
import {
  FilePlus,
  Edit3,
  FileCheck,
  Upload,
  Sparkles,
  ShieldCheck,
  Download,
  Share2,
  ArrowRight,
  User,
  ExternalLink,
  Code2,
  Heart,
  Layers,
  Award,
  ChevronRight,
  FileText,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Clock,
  Target,
  AlertTriangle,
  Lightbulb,
  ArrowLeft,
  X,
  Eye,
  Sun,
  Moon,
} from 'lucide-react';
import { INTERVIEW_CHECKLIST, INTERVIEW_QUESTIONS } from '../data/interviewTips';

interface HomeScreenProps {
  onStartNew: () => void;
  onContinue: () => void;
  onViewCV?: () => void;
  onLoadExample: () => void;
  onImportJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGoToLinkedInGuide: () => void;
  hasSavedCV: boolean;
  savedCandidateName?: string;
  savedCandidateRole?: string;
  atsScore: number;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartNew,
  onContinue,
  onViewCV,
  onLoadExample,
  onImportJSON,
  onGoToLinkedInGuide,
  hasSavedCV,
  savedCandidateName,
  savedCandidateRole,
  atsScore,
  theme = 'dark',
  onToggleTheme,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estados para o Centro de Dicas de Entrevista na Home
  const [showInterviewModal, setShowInterviewModal] = useState<boolean>(false);
  const [activeInterviewTab, setActiveInterviewTab] = useState<'questions' | 'checklist' | 'star'>('questions');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>('fale-sobre-voce');
  const [interviewCategory, setInterviewCategory] = useState<'todas' | 'classicas' | 'comportamentais' | 'perguntas_fazer'>('todas');

  const filteredQuestions = interviewCategory === 'todas'
    ? INTERVIEW_QUESTIONS
    : INTERVIEW_QUESTIONS.filter(q => q.category === interviewCategory);

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between selection:bg-blue-500 selection:text-white relative overflow-hidden font-sans transition-colors duration-300 ${
        isDark ? 'text-slate-100' : 'text-slate-900'
      }`}
      style={{
        background: isDark
          ? 'radial-gradient(circle at 50% 35%, #0f172a 0%, #020617 100%)'
          : 'radial-gradient(circle at 50% 20%, #ffffff 0%, #f1f5f9 100%)',
      }}
    >
      
      {/* Luz ambiente de fundo (Glows inspirados na tela de carregamento) */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 ${isDark ? 'bg-blue-600/15' : 'bg-blue-400/15'} rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-20 -left-20 w-80 h-80 ${isDark ? 'bg-indigo-600/15' : 'bg-sky-300/20'} rounded-full blur-3xl pointer-events-none`} />
      <div className={`absolute -bottom-20 -right-20 w-80 h-80 ${isDark ? 'bg-blue-500/15' : 'bg-indigo-400/15'} rounded-full blur-3xl pointer-events-none`} />

      {/* 1. BARRA SUPERIOR DE APLICATIVO (App Bar com Glassmorphism) */}
      <header className={`relative z-20 border-b backdrop-blur-xl sticky top-0 transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-900/85 text-white' : 'border-slate-200/80 bg-white/90 text-slate-900 shadow-2xs'
      }`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Logo da Aplicação */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <AppLogo size="md" showText={true} isLight={isDark} />
          </div>

          {/* Tag de Desenvolvedor e Status do App */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Badge de Desenvolvedor */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1 rounded-full text-xs shadow-inner ${
              isDark ? 'bg-slate-800/80 border border-slate-700/60 text-slate-300' : 'bg-slate-100 border border-slate-200 text-slate-700'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Desenvolvido por <strong className="font-semibold text-blue-400">Elielson Mourão</strong></span>
            </div>

            {/* Alternador de Modo Claro e Escuro */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95 ${
                  isDark
                    ? 'bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-700/80'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                title={isDark ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
                <span className="hidden sm:inline">{isDark ? 'Modo Claro' : 'Modo Escuro'}</span>
              </button>
            )}

            {/* Botão direto de Modo Visualização no Topo (quando houver rascunho) */}
            {hasSavedCV && onViewCV && (
              <button
                type="button"
                onClick={onViewCV}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
                  isDark
                    ? 'text-sky-300 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-400/30'
                    : 'text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200'
                }`}
                title="Acessar o editor no Modo Visualização direta"
              >
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span className="hidden sm:inline">Modo Visualização</span>
                <span className="sm:hidden">Ver</span>
              </button>
            )}

            {hasSavedCV && (
              <button
                type="button"
                onClick={onContinue}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400 transition-all shadow-md shadow-blue-500/25 border border-sky-300/30 cursor-pointer active:scale-95"
              >
                <span>Acessar Editor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </header>

      {/* 2. ÁREA DE TRABALHO PRINCIPAL */}
      <main className="relative z-10 max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10 md:py-12 flex-1 w-full flex flex-col justify-center">
        
        {/* Banner Hero */}
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 px-1">
          
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 sm:mb-4 shadow-sm backdrop-blur-md ${
            isDark
              ? 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
              : 'bg-blue-50 border border-blue-200 text-blue-900 shadow-sm'
          }`}>
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-[11px] sm:text-xs">Sistema Inteligente de Carreira · Conexão com Padrões ATS 2026</span>
          </div>

          <h1 className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight mb-3 sm:mb-4 ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}>
            Connect <span className="text-blue-400">Currículo</span> <span className="text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 align-middle inline-block ml-1">AI</span>
          </h1>

          <p className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl mx-auto ${
            isDark ? 'text-slate-300' : 'text-slate-600 font-medium'
          }`}>
            Crie, aperfeiçoe e exporte currículos profissionais de alto impacto, 100% aprovados em robôs de RH (ATS) e sincronizados com as melhores práticas do LinkedIn.
          </p>

          {/* Badge de Crédito em Destaque no Mobile */}
          <div className={`mt-3 sm:hidden text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Criado & desenvolvido por <span className={`font-bold ${isDark ? 'text-blue-400' : 'text-slate-900'}`}>Elielson Mourão</span>
          </div>
        </div>

        {/* 3. AS OPÇÕES PRINCIPAIS (Cards com Botões Harmonizados com o LoadingScreen) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 max-w-4xl mx-auto w-full mb-8 sm:mb-10">
          
          {/* CARD 1: CONTINUAR MEU CURRÍCULO (Se houver rascunho salvo) */}
          {hasSavedCV ? (
            <div
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between group relative overflow-hidden backdrop-blur-md ${
                isDark
                  ? 'bg-slate-800/80 border-blue-500/60 hover:border-blue-400 shadow-2xl shadow-blue-950/40'
                  : 'bg-white/95 border-blue-500 hover:border-blue-600 shadow-xl shadow-blue-950/10'
              }`}
            >
              <div className="absolute top-0 right-0 bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 text-white text-[10px] font-extrabold px-3.5 py-1 rounded-bl-xl uppercase tracking-wider shadow-md">
                Rascunho Ativo
              </div>

              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-inner ${
                  isDark ? 'bg-blue-500/20 border border-blue-500/30 text-sky-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  <Edit3 className="w-6 h-6" />
                </div>

                <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-sky-300 transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Continuar Edição</span>
                  <ArrowRight className="w-4 h-4 text-sky-400 transition-transform group-hover:translate-x-1" />
                </h2>

                <p className={`text-xs leading-relaxed mb-4 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Retome seu documento salvo localmente no computador exatamente de onde você parou.
                </p>

                {/* Perfil do Candidato Ativo */}
                <div className={`rounded-2xl p-3 border flex items-center justify-between ${
                  isDark ? 'bg-slate-900/80 border-slate-700/80' : 'bg-blue-50/70 border-blue-200'
                }`}>
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold text-xs ${
                      isDark ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' : 'bg-blue-100 border border-blue-200 text-blue-800'
                    }`}>
                      {savedCandidateName ? savedCandidateName.charAt(0).toUpperCase() : <User className="w-4 h-4" />}
                    </div>
                    <div className="truncate">
                      <span className={`font-bold text-xs block truncate ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {savedCandidateName || 'Candidato em Andamento'}
                      </span>
                      <span className={`text-[11px] block truncate ${
                        isDark ? 'text-blue-300' : 'text-blue-700 font-medium'
                      }`}>
                        {savedCandidateRole || 'Cargo Pretendido'}
                      </span>
                    </div>
                  </div>

                  <div className={`shrink-0 text-right pl-2 border-l ${
                    isDark ? 'border-slate-700/80' : 'border-blue-200'
                  }`}>
                    <span className={`text-[10px] block font-medium ${
                      isDark ? 'text-slate-400' : 'text-slate-500'
                    }`}>Score ATS</span>
                    <span className={`text-xs font-black ${atsScore >= 70 ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-amber-400' : 'text-amber-600')}`}>
                      {atsScore}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Botões de Ação do Rascunho */}
              <div className={`mt-5 pt-3 border-t flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={onContinue}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400 text-white text-xs font-bold shadow-md shadow-blue-500/25 border border-sky-300/30 transition-all cursor-pointer active:scale-95"
                >
                  <span>Continuar Edição</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onViewCV && (
                  <button
                    type="button"
                    onClick={onViewCV}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 ${
                      isDark
                        ? 'bg-slate-800 hover:bg-slate-700/90 border border-slate-700/80 text-slate-200 hover:text-white'
                        : 'bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700'
                    }`}
                    title="Abrir diretamente no Modo Visualização"
                  >
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Modo Visualização</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            // Card 1 Alternativo (Se não houver rascunho anterior)
            <div
              onClick={onStartNew}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
                isDark
                  ? 'bg-slate-800/80 border-blue-500/60 hover:border-blue-400 shadow-2xl shadow-blue-950/40'
                  : 'bg-white/95 border-blue-500 hover:border-blue-600 shadow-xl shadow-blue-950/10'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-inner ${
                  isDark ? 'bg-blue-500/20 border border-blue-500/30 text-sky-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  <FilePlus className="w-6 h-6" />
                </div>

                <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-sky-300 transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Criar Novo Currículo</span>
                  <ArrowRight className="w-4 h-4 text-sky-400 transition-transform group-hover:translate-x-1" />
                </h2>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Inicie um documento limpo do zero com auxílio passo a passo, recomendações de termos técnicos e checagem de qualidade em tempo real.
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={onStartNew}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-blue-500/25 border border-sky-300/30 transition-all cursor-pointer active:scale-95"
                >
                  <span>Começar Agora</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className={`text-[11px] font-medium ${isDark ? 'text-sky-300' : 'text-blue-700'}`}>100% Guiado</span>
              </div>
            </div>
          )}

          {/* CARD 2: CRIAR NOVO DO ZERO (Caso já exista rascunho) OU CARREGAR EXEMPLO */}
          {hasSavedCV ? (
            <div
              onClick={onStartNew}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
                isDark
                  ? 'bg-slate-800/70 hover:bg-slate-800/90 border-slate-700/70 hover:border-blue-500/40 shadow-xl shadow-slate-950/40'
                  : 'bg-white/95 hover:bg-white border-slate-200 hover:border-blue-400/60 shadow-lg shadow-blue-900/5'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${
                  isDark ? 'bg-slate-700/60 border border-slate-600/60 text-blue-300' : 'bg-slate-100 border border-slate-200 text-slate-700'
                }`}>
                  <FilePlus className="w-6 h-6" />
                </div>

                <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-sky-300 transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Iniciar Novo do Zero</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDark ? 'text-slate-400 group-hover:text-sky-300' : 'text-slate-400 group-hover:text-blue-600'
                  }`} />
                </h2>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Limpa os campos e inicia um novo currículo em branco para outro objetivo, área de atuação ou vaga específica.
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={onStartNew}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Iniciar em Branco</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Em Branco</span>
              </div>
            </div>
          ) : (
            <div
              onClick={onLoadExample}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
                isDark
                  ? 'bg-slate-800/70 hover:bg-slate-800/90 border-slate-700/70 hover:border-emerald-500/40 shadow-xl shadow-slate-950/40'
                  : 'bg-white/95 hover:bg-white border-slate-200 hover:border-emerald-400/60 shadow-lg shadow-blue-900/5'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${
                  isDark ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                }`}>
                  <FileCheck className="w-6 h-6" />
                </div>

                <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-emerald-300 transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Carregar Exemplo Pronto</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDark ? 'text-slate-400 group-hover:text-emerald-300' : 'text-slate-400 group-hover:text-emerald-600'
                  }`} />
                </h2>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Explore um modelo 100% preenchido com pontuação máxima no ATS para se inspirar e apenas trocar seus dados pessoais.
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={onLoadExample}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Ver Modelo Pronto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className={`text-[11px] font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Score 100% ATS</span>
              </div>
            </div>
          )}

          {/* CARD 3: CARREGAR MODELO PRONTO (quando hasSavedCV) */}
          {hasSavedCV && (
            <div
              onClick={onLoadExample}
              className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
                isDark
                  ? 'bg-slate-800/70 hover:bg-slate-800/90 border-slate-700/70 hover:border-emerald-500/40 shadow-xl shadow-slate-950/40'
                  : 'bg-white/95 hover:bg-white border-slate-200 hover:border-emerald-400/60 shadow-lg shadow-blue-900/5'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${
                  isDark ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                }`}>
                  <FileCheck className="w-6 h-6" />
                </div>

                <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-emerald-300 transition-colors flex items-center gap-2 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Carregar Exemplo Pronto</span>
                  <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                    isDark ? 'text-slate-400 group-hover:text-emerald-300' : 'text-slate-400 group-hover:text-emerald-600'
                  }`} />
                </h2>

                <p className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Carrega um currículo completo de referência com nota máxima em ATS para analisar a estrutura e os textos sugeridos.
                </p>
              </div>

              <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
                isDark ? 'border-slate-700/60' : 'border-slate-200'
              }`}>
                <button
                  type="button"
                  onClick={onLoadExample}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 ${
                    isDark
                      ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  <span>Modelo de Referência</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <span className={`text-[11px] font-medium ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>Pronto para Edição</span>
              </div>
            </div>
          )}

          {/* CARD 4: IMPORTAR ARQUIVO DE BACKUP (.JSON) */}
          <div
            onClick={handleTriggerUpload}
            className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex flex-col justify-between group backdrop-blur-md ${
              isDark
                ? 'bg-slate-800/70 hover:bg-slate-800/90 border-slate-700/70 hover:border-indigo-500/40 shadow-xl shadow-slate-950/40'
                : 'bg-white/95 hover:bg-white border-slate-200 hover:border-indigo-400/60 shadow-lg shadow-blue-900/5'
            }`}
          >
            <div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform ${
                isDark ? 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300' : 'bg-indigo-50 border border-indigo-200 text-indigo-600'
              }`}>
                <Upload className="w-6 h-6" />
              </div>

              <h2 className={`text-base sm:text-lg font-bold mb-1 group-hover:text-indigo-300 transition-colors flex items-center gap-2 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                <span>Importar Arquivo (.JSON)</span>
                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${
                  isDark ? 'text-slate-400 group-hover:text-indigo-300' : 'text-slate-400 group-hover:text-indigo-600'
                }`} />
              </h2>

              <p className={`text-xs leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Já exportou seu backup anteriormente? Carregue seu arquivo JSON para restaurar todos os dados com um clique.
              </p>
            </div>

            <div className={`mt-6 pt-3 border-t flex items-center justify-between ${
              isDark ? 'border-slate-700/60' : 'border-slate-200'
            }`}>
              <button
                type="button"
                onClick={handleTriggerUpload}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer active:scale-95 ${
                  isDark
                    ? 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Restaurar Backup</span>
              </button>
              <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Arquivo Local</span>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={onImportJSON}
              className="hidden"
            />
          </div>

        </div>

        {/* 4. DOCK DE RECURSOS INTEGRADOS (App Mini-Modules) */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-3.5 pt-1 sm:pt-2">
          
          <div className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-colors backdrop-blur-md ${
            isDark
              ? 'bg-slate-800/70 border border-slate-700/70 hover:bg-slate-800/90 hover:border-emerald-500/40'
              : 'bg-white/90 border border-slate-200 hover:bg-white shadow-sm'
          }`}>
            <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 border ${
              isDark ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-emerald-50 text-emerald-600 border-emerald-200'
            }`}>
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-xs font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Aprovado em ATS</h3>
              <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Estrutura calibrada para nunca ser descartada por robôs de triagem de RH.
              </p>
            </div>
          </div>

          <div className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-colors backdrop-blur-md ${
            isDark
              ? 'bg-slate-800/70 border border-slate-700/70 hover:bg-slate-800/90 hover:border-sky-500/40'
              : 'bg-white/90 border border-slate-200 hover:bg-white shadow-sm'
          }`}>
            <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 border ${
              isDark ? 'bg-sky-500/20 text-sky-300 border-sky-500/30' : 'bg-sky-50 text-sky-600 border-sky-200'
            }`}>
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-xs font-bold mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>PDF & Word (.DOC)</h3>
              <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Gere PDF em alta resolução A4 e Word com coluna lateral ou clássico ATS.
              </p>
            </div>
          </div>

          <div
            onClick={onGoToLinkedInGuide}
            className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-colors cursor-pointer group backdrop-blur-md ${
              isDark
                ? 'bg-slate-800/70 border border-slate-700/70 hover:border-indigo-400/60 hover:bg-slate-800/90'
                : 'bg-white/90 border border-slate-200 hover:border-indigo-400/60 hover:bg-white shadow-sm'
            }`}
          >
            <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 border group-hover:scale-105 transition-transform ${
              isDark ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' : 'bg-indigo-50 text-indigo-600 border-indigo-200'
            }`}>
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-xs font-bold mb-0.5 flex items-center gap-1 ${
                isDark ? 'text-white group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'
              }`}>
                <span>Guia LinkedIn</span>
                <ChevronRight className="w-3 h-3 text-indigo-400" />
              </h3>
              <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Títulos estratégicos e campo 'Sobre' otimizados para recrutadores.
              </p>
            </div>
          </div>

          <div
            onClick={() => setShowInterviewModal(true)}
            className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl transition-colors cursor-pointer group backdrop-blur-md shadow-lg ${
              isDark
                ? 'bg-slate-800/70 border border-blue-500/40 hover:border-sky-400 hover:bg-slate-800/90 shadow-blue-950/20'
                : 'bg-white/90 border border-blue-200 hover:border-blue-400 hover:bg-white shadow-blue-950/5'
            }`}
          >
            <div className={`p-2 sm:p-2.5 rounded-xl shrink-0 border group-hover:scale-105 transition-transform ${
              isDark ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' : 'bg-blue-50 text-blue-600 border-blue-200'
            }`}>
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h3 className={`text-xs font-bold mb-0.5 flex items-center gap-1 ${
                isDark ? 'text-white group-hover:text-sky-300' : 'text-slate-900 group-hover:text-blue-700'
              }`}>
                <span>Dicas de Entrevista</span>
                <ChevronRight className="w-3 h-3 text-sky-400" />
              </h3>
              <p className={`text-[11px] leading-tight ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Perguntas clássicas, respostas STAR e checklist para a vaga.
              </p>
            </div>
          </div>

        </div>

        {/* Botão de Destaque para Acessar Dicas de Entrevista */}
        <div className="flex justify-center pt-4 sm:pt-5 w-full">
          <button
            type="button"
            onClick={() => setShowInterviewModal(true)}
            className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl sm:rounded-2xl bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400 text-white font-black text-xs sm:text-sm shadow-xl shadow-blue-500/25 border border-sky-300/30 transition-all cursor-pointer group active:scale-95 w-full sm:w-auto text-center"
          >
            <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform shrink-0" />
            <span>Acessar Guia & Dicas de Entrevista de Emprego</span>
            <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform shrink-0" />
          </button>
        </div>

      </main>

      {/* MODAL EXCLUSIVO: DICAS ESTRATÉGICAS PARA ENTREVISTAS DE EMPREGO */}
      {showInterviewModal && (
        <div className={`fixed inset-0 z-50 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto ${
          isDark ? 'bg-slate-950/80' : 'bg-slate-900/60'
        }`}>
          <div className={`border rounded-2xl sm:rounded-3xl w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto ${
            isDark ? 'bg-slate-900 border-slate-700/80 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Cabeçalho do Modal */}
            <div className={`p-4 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 shrink-0 ${
              isDark ? 'border-slate-800 bg-slate-900/95' : 'border-slate-200 bg-slate-50/95'
            }`}>
              <div className="space-y-1">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold ${
                  isDark ? 'bg-blue-500/20 border border-blue-500/30 text-blue-300' : 'bg-blue-50 border border-blue-200 text-blue-700'
                }`}>
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Preparação para Processos Seletivos</span>
                </div>
                <h2 className={`text-lg sm:text-2xl font-black tracking-tight flex items-center gap-2.5 ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  <span>Dicas Estratégicas para Entrevistas de Emprego</span>
                </h2>
                <p className={`text-xs max-w-xl leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  Aprenda a estruturar respostas de alto impacto, contornar as perguntas mais difíceis e demonstrar segurança perante o recrutador.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowInterviewModal(false);
                    if (hasSavedCV) onContinue();
                    else onStartNew();
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-linear-to-r from-sky-400 via-blue-500 to-indigo-500 hover:from-sky-300 hover:via-blue-400 hover:to-indigo-400 text-white font-bold text-xs shadow-md shadow-blue-500/25 border border-sky-300/30 transition-all cursor-pointer active:scale-95"
                >
                  <span>{hasSavedCV ? 'Editar Meu Currículo' : 'Criar Currículo Agora'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowInterviewModal(false)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white border-slate-700' : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                  title="Fechar"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Conteúdo com Scroll Interno */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 sm:space-y-6">
              
              {/* Seletor de Abas da Seção de Entrevista */}
              <div className={`flex items-center gap-2 border-b pb-3 overflow-x-auto no-scrollbar ${
                isDark ? 'border-slate-800' : 'border-slate-200'
              }`}>
            <button
              type="button"
              onClick={() => setActiveInterviewTab('questions')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeInterviewTab === 'questions'
                  ? isDark ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40 shadow-xs' : 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Perguntas & Respostas Modelo</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveInterviewTab('checklist')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeInterviewTab === 'checklist'
                  ? isDark ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-xs' : 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Checklist (Antes, Durante e Depois)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveInterviewTab('star')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeInterviewTab === 'star'
                  ? isDark ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 shadow-xs' : 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs'
                  : isDark ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Target className="w-3.5 h-3.5" />
              <span>O Método STAR para Respostas</span>
            </button>
          </div>

          {/* CONTEÚDO DA ABA 1: PERGUNTAS E RESPOSTAS MODELO */}
          {activeInterviewTab === 'questions' && (
            <div className="space-y-4">
              
              {/* Filtros rápidos de categoria de perguntas */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">Filtrar:</span>
                {[
                  { id: 'todas', label: 'Todas as Perguntas' },
                  { id: 'classicas', label: 'Perguntas Obrigatórias' },
                  { id: 'comportamentais', label: 'Desafios & Pressão' },
                  { id: 'perguntas_fazer', label: 'O Que Perguntar ao Recrutador' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setInterviewCategory(cat.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer ${
                      interviewCategory === cat.id
                        ? 'bg-slate-700 text-white font-bold'
                        : 'bg-slate-800/60 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Lista de Cards Sanfonados de Perguntas */}
              <div className="space-y-2.5">
                {filteredQuestions.map((item) => {
                  const isExpanded = expandedQuestionId === item.id;
                  return (
                    <div
                      key={item.id}
                      className={`border rounded-2xl transition-all duration-200 overflow-hidden ${
                        isExpanded
                          ? 'bg-slate-800/90 border-sky-500/50 shadow-lg shadow-sky-950/20'
                          : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600 hover:bg-slate-800/60'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedQuestionId(isExpanded ? null : item.id)}
                        className="w-full text-left p-4 flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs">
                            <HelpCircle className="w-4 h-4" />
                          </span>
                          <div>
                            <span className="text-xs font-bold text-white block">
                              "{item.question}"
                            </span>
                            <span className="text-[10px] text-sky-400 font-medium">
                              {item.tag}
                            </span>
                          </div>
                        </div>

                        <div className="p-1 rounded-lg bg-slate-700/60 text-slate-300">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="px-4 pb-4 pt-1 border-t border-slate-700/60 text-xs space-y-3">
                          
                          {/* Objetivo do Recrutador */}
                          <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50 flex items-start gap-2.5">
                            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-amber-300 block text-[11px] mb-0.5">O que o entrevistador quer avaliar:</strong>
                              <span className="text-slate-300 text-[11px] leading-relaxed">{item.recruiterGoal}</span>
                            </div>
                          </div>

                          {/* Resposta Sugerida na Prática */}
                          <div className="p-3.5 rounded-xl bg-sky-950/40 border border-sky-800/60 space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-300 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-sky-400" />
                                Exemplo Prático de Resposta Ideal:
                              </span>
                              <span className="text-[10px] text-sky-400 bg-sky-900/60 px-2 py-0.5 rounded">
                                {item.recommendedStructure}
                              </span>
                            </div>
                            <p className="text-slate-200 text-xs leading-relaxed italic bg-slate-950/60 p-3 rounded-lg border border-sky-900/50 font-sans">
                              "{item.exampleAnswer}"
                            </p>
                          </div>

                          {/* O Que Evitar Dizer */}
                          <div className="p-2.5 rounded-xl bg-rose-950/30 border border-rose-900/50 flex items-start gap-2.5 text-[11px]">
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-rose-300 block mb-0.5">O que NUNCA dizer ou fazer:</strong>
                              <span className="text-slate-300 leading-relaxed">{item.whatToAvoid}</span>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* CONTEÚDO DA ABA 2: CHECKLIST COMPLETO */}
          {activeInterviewTab === 'checklist' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {INTERVIEW_CHECKLIST.map((phase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 flex flex-col justify-between space-y-3 backdrop-blur-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-slate-700/70 pb-2.5 mb-3">
                      <span className="text-xs font-black text-emerald-400">{phase.phase}</span>
                      <span className="text-[10px] text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-full">{phase.timeframe}</span>
                    </div>

                    <div className="space-y-3">
                      {phase.items.map((it, itemIdx) => (
                        <div key={itemIdx} className="space-y-1">
                          <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>{it.title}</span>
                          </h4>
                          <p className="text-[11px] text-slate-400 leading-relaxed pl-3">
                            {it.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/50 text-[10px] text-slate-400 text-center font-medium">
                    Etapa {idx + 1} de 3
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CONTEÚDO DA ABA 3: O MÉTODO STAR */}
          {activeInterviewTab === 'star' && (
            <div className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-5 space-y-4 backdrop-blur-xs">
              
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Target className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">O que é a Metodologia STAR e por que os recrutadores a amam?</h3>
                  <p className="text-xs text-slate-300 leading-relaxed mt-1">
                    STAR é o padrão internacional usado pelos melhores recrutadores para avaliar competências comportamentais. Ele evita respostas vagas e prova que você tem experiência prática comprovada.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="w-6 h-6 rounded-lg bg-blue-500/20 text-sky-400 font-black text-xs flex items-center justify-center">S</span>
                  <h4 className="text-xs font-bold text-white">Situação</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Contextualize o cenário, o local onde trabalhava e qual era o problema ou urgência em no máximo 2 frases.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 font-black text-xs flex items-center justify-center">T</span>
                  <h4 className="text-xs font-bold text-white">Tarefa</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Qual era a sua responsabilidade direta diante daquele desafio e qual meta precisava ser atingida.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center">A</span>
                  <h4 className="text-xs font-bold text-white">Ação</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    O que <strong>você</strong> fez na prática: passos tomados, ferramentas usadas e como colaborou com os demais.
                  </p>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 font-black text-xs flex items-center justify-center">R</span>
                  <h4 className="text-xs font-bold text-white">Resultado</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    O impacto final positivo: prazo cumprido, custo evitado, elogio da liderança ou processo aprimorado.
                  </p>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Rodapé do Modal */}
        <div className={`p-4 px-6 border-t flex items-center justify-between text-xs shrink-0 ${
          isDark ? 'border-slate-800 bg-slate-900/95 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
        }`}>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Guia de Entrevistas atualizado para processos seletivos</span>
          </span>
          <button
            type="button"
            onClick={() => setShowInterviewModal(false)}
            className={`px-3.5 py-1.5 rounded-xl border font-medium transition-colors cursor-pointer ${
              isDark ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200 hover:text-white' : 'bg-white hover:bg-slate-200 border-slate-300 text-slate-700'
            }`}
          >
            Voltar à Página Inicial
          </button>
        </div>

      </div>
    </div>
  )}

      {/* 5. RODAPÉ INSTITUCIONAL COM ASSINATURA DO DESENVOLVEDOR */}
      <footer className={`relative z-20 border-t py-4 sm:py-5 text-xs transition-colors ${
        isDark ? 'border-slate-800/80 bg-slate-950/90 text-slate-400' : 'border-slate-200/80 bg-white/95 text-slate-600 shadow-xs'
      }`}>
        <div className="max-w-6xl mx-auto px-3 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          
          <div className="flex items-center gap-2.5">
            <AppLogo size="sm" showText={false} isLight={isDark} />
            <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-white' : 'text-slate-800'}`}>
              <span className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Connect Currículo AI</span>
              <span className={isDark ? "text-slate-600" : "text-slate-400"}>·</span>
              <span>Desenvolvido por <strong className="text-blue-400 font-semibold">Elielson Mourão</strong></span>
            </div>
          </div>

          <div className={`flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            <span>Privacidade Local (100% no seu navegador)</span>
            <span className={isDark ? "text-slate-700" : "text-slate-300"}>·</span>
            <button
              type="button"
              onClick={onGoToLinkedInGuide}
              className="text-sky-400 hover:text-sky-300 transition-colors font-semibold cursor-pointer"
            >
              Otimizador LinkedIn
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
};
