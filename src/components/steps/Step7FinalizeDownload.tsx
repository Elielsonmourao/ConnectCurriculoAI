import React, { useState } from 'react';
import { CVData, ATSCheckResult } from '../../types';
import {
  Download,
  Printer,
  FileText,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  UploadCloud,
  Share2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';

interface Step7Props {
  cvData: CVData;
  atsScore: ATSCheckResult;
  onDownloadPDF: () => Promise<void> | void;
  onPrint: () => void;
  isPrinting?: boolean;
  onDownloadDoc: (format?: 'sidebar' | 'classic' | 'modern') => void;
  onExportJSON: () => void;
  onImportJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGoToLinkedInGuide: () => void;
  isGeneratingPDF?: boolean;
}

export const Step7FinalizeDownload: React.FC<Step7Props> = ({
  cvData,
  atsScore,
  onDownloadPDF,
  onPrint,
  isPrinting = false,
  onDownloadDoc,
  onExportJSON,
  onImportJSON,
  onGoToLinkedInGuide,
  isGeneratingPDF = false,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handlePDFClick = async () => {
    try {
      await onDownloadPDF();
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* MENSAGEM DE PARABÉNS & ORIENTAÇÃO FINAL */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50 p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Parabéns! Seu Currículo está Pronto
            </h3>
            <p className="text-xs text-slate-600">
              Você completou o preenchimento de todas as informações. Agora escolha a melhor forma de salvar e enviar seu documento.
            </p>
          </div>
        </div>

        {downloadSuccess && (
          <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-4 h-4" />
            <span>Download do PDF concluído com sucesso! Verifique sua pasta de Downloads.</span>
          </div>
        )}
      </div>

      {/* PAINEL PRINCIPAL DE DOWNLOAD & IMPRESSÃO */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Download className="w-4 h-4 text-blue-600" />
            Opções de Baixar e Imprimir
          </h3>
          <p className="text-xs text-slate-500">
            Recomendamos baixar o PDF para enviar às empresas por e-mail ou WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* BOTÃO PRINCIPAL: BAIXAR PDF */}
          <button
            type="button"
            onClick={handlePDFClick}
            disabled={isGeneratingPDF}
            className="p-4 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span>{isGeneratingPDF ? 'Gerando PDF de Alta Qualidade...' : 'Baixar Currículo em PDF'}</span>
            </div>
            <span className="text-[10px] text-blue-100 font-normal">
              Formato padrão de mercado (A4 limpo e legível)
            </span>
          </button>

          {/* BOTÃO SECUNDÁRIO: IMPRIMIR */}
          <button
            type="button"
            onClick={onPrint}
            disabled={isPrinting}
            className="p-4 rounded-xl bg-slate-800 hover:bg-slate-900 disabled:bg-slate-700 text-white font-bold text-xs flex flex-col items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Printer className={`w-4 h-4 ${isPrinting ? 'animate-spin text-amber-300' : ''}`} />
              <span>{isPrinting ? 'Preparando Impressão...' : 'Imprimir Currículo'}</span>
            </div>
            <span className="text-[10px] text-slate-300 font-normal">
              {isPrinting ? 'Ajustando folha para sua impressora...' : 'Enviar para sua impressora de papel'}
            </span>
          </button>

          {/* SEÇÃO DOWNLOAD WORD COM AS TRÊS OPÇÕES */}
          <div className="sm:col-span-2 bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" />
                Baixar em Formato Word (.DOC) Editável:
              </span>
              <span className="text-[10px] text-slate-500 font-medium">3 modelos profissionais para você escolher:</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Opção 1: Word Moderno */}
              <button
                type="button"
                onClick={() => onDownloadDoc('modern')}
                className="p-3 rounded-xl border border-indigo-200 bg-white hover:bg-indigo-50/70 text-slate-800 text-left transition-all cursor-pointer shadow-2xs hover:border-indigo-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-indigo-950 group-hover:text-indigo-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-indigo-600" />
                    Word Moderno
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-700">Destaque</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Cabeçalho em bloco colorido contemporâneo, tipografia elegante e leitura balanceada.
                </p>
              </button>

              {/* Opção 2: Word com Coluna Lateral */}
              <button
                type="button"
                onClick={() => onDownloadDoc('sidebar')}
                className="p-3 rounded-xl border border-blue-200 bg-white hover:bg-blue-50/70 text-slate-800 text-left transition-all cursor-pointer shadow-2xs hover:border-blue-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-blue-900 group-hover:text-blue-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    Word Coluna Lateral
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">Página Única</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Design executivo com barra lateral colorida idêntica à visualização, ajustado para 1 página.
                </p>
              </button>

              {/* Opção 3: Word Clássico / Simples ATS */}
              <button
                type="button"
                onClick={() => onDownloadDoc('classic')}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50/40 text-slate-800 text-left transition-all cursor-pointer shadow-2xs hover:border-emerald-300 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-600" />
                    Word Clássico ATS
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700">Margem 2,5 cm</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Coluna única com margens estritas de 2,5 cm (superior, inferior e laterais) para 100% ATS.
                </p>
              </button>
            </div>
          </div>

          {/* SALVAR BACKUP JSON */}
          <button
            type="button"
            onClick={onExportJSON}
            className="sm:col-span-2 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-slate-500" />
            <span>Salvar Backup dos Dados (JSON)</span>
          </button>

          {/* RESTAURAR BACKUP JSON */}
          <label className="sm:col-span-2 p-2.5 rounded-xl border border-dashed border-slate-300 hover:bg-slate-50 text-slate-600 text-[11px] font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer">
            <UploadCloud className="w-3.5 h-3.5 text-blue-600" />
            <span>Já tem um arquivo de backup salvo anteriormente? Clique aqui para restaurar seus dados</span>
            <input type="file" accept=".json" onChange={onImportJSON} className="hidden" />
          </label>

        </div>
      </div>

      {/* DIAGNÓSTICO ATS (COMPATIBILIDADE COM SELEÇÃO DE VAGAS) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Avaliação de Qualidade do Currículo
            </h3>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
            {atsScore.score}% Completo
          </span>
        </div>

        <p className="text-xs text-slate-500">
          Veja se alguma informação importante ainda ficou em branco:
        </p>

        <div className="space-y-2 pt-1">
          {atsScore.checks.map((check) => (
            <div
              key={check.id}
              className={`p-2.5 rounded-xl border flex items-start gap-2.5 text-xs ${
                check.passed
                  ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/50 border-amber-200 text-amber-950'
              }`}
            >
              {check.passed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <span className="font-semibold block">{check.label}</span>
                {!check.passed && (
                  <span className="text-[11px] text-amber-800/90 block mt-0.5">
                    💡 Recomendação: {check.recommendation}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CONVITE PARA A ETAPA OPCIONAL DO LINKEDIN */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 p-5 rounded-2xl border border-blue-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          <h4 className="text-sm font-bold text-blue-950">
            Quer também criar ou melhorar seu perfil no LinkedIn?
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          O LinkedIn é a maior rede profissional do mundo e onde muitas empresas encontram candidatos. 
          Criamos uma <strong>etapa opcional</strong> com orientações passo a passo para você levar os mesmos dados do seu currículo para a internet.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={onGoToLinkedInGuide}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
          >
            <span>Ver Passo a Passo do LinkedIn (Opcional)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <span className="text-[11px] text-slate-500">
            Você não é obrigado a fazer isso agora. Pode voltar quando quiser!
          </span>
        </div>
      </div>

    </div>
  );
};
