import React, { useRef } from 'react';
import { CVData, LinkedInRoleTemplate } from '../../types';
import { User, Mail, Phone, MapPin, Linkedin, Globe, Camera, Trash2, CheckCircle2, Info, Sparkles } from 'lucide-react';

interface Step2Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  currentRoleTemplate?: LinkedInRoleTemplate;
}

export const Step2PersonalInfo: React.FC<Step2Props> = ({ cvData, onChange, currentRoleTemplate }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        onChange({ photoUrl: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    onChange({ photoUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isLinkedInValid = cvData.linkedinUrl && cvData.linkedinUrl.includes('linkedin.com');

  return (
    <div className="space-y-5">
      
      {/* GUIA EXPLICATIVO PARA INICIANTES */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Orientações para seus Dados de Contato
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Esta seção é a porta de entrada para os recrutadores entrarem em contato com você. Observe as seguintes recomendações:
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>Telefone e WhatsApp:</strong> Coloque o número com o DDD da sua região. É por aí que a maioria das empresas agenda as entrevistas.
          </li>
          <li>
            <strong>E-mail Profissional:</strong> Utilize um e-mail simples, de preferência contendo seu nome e sobrenome (evite apelidos).
          </li>
          <li>
            <strong>Cidade e Estado:</strong> Essencial para que os contratantes saibam que você mora perto da empresa ou tem fácil deslocamento.
          </li>
          <li>
            <strong>Foto:</strong> A inclusão de foto é opcional. Se desejar colocar, escolha uma foto recente, com boa iluminação e semblante profissional.
          </li>
        </ul>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <User className="w-4 h-4 text-blue-600" />
            Dados Pessoais e Informações de Contato
          </h3>
          <p className="text-xs text-slate-500">
            Preencha seus dados com exatidão para não perder oportunidades de entrevista.
          </p>
        </div>

        {/* Upload de Foto Profissional */}
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="relative">
            {cvData.photoUrl ? (
              <img
                src={cvData.photoUrl}
                alt="Foto do perfil"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-blue-500/30"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-slate-200 border-2 border-white shadow-xs flex items-center justify-center text-slate-400">
                <User className="w-8 h-8" />
              </div>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1.5">
            <span className="text-xs font-bold text-slate-800 block">Foto de Perfil Profissional (Opcional)</span>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Dica: Uma foto com iluminação natural e fundo neutro transmite credibilidade.
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-blue-600" />
                <span>{cvData.photoUrl ? 'Trocar Foto' : 'Adicionar Foto'}</span>
              </button>
              {cvData.photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remover Foto</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Campos Principais */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Nome Completo */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700 mb-1">Seu Nome Completo</label>
            <input
              type="text"
              value={cvData.fullName}
              onChange={(e) => onChange({ fullName: e.target.value })}
              placeholder="Ex: ALESSANDRA MORAES"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all font-semibold uppercase"
            />
          </div>

          {/* Cargo / Headline */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-slate-700">Título Profissional (O que você faz)</label>
              <span className="text-[11px] text-slate-400">Ex: Cargo Principal | Especialidades</span>
            </div>
            <input
              type="text"
              value={cvData.roleHeadline}
              onChange={(e) => onChange({ roleHeadline: e.target.value })}
              placeholder="Ex: Auxiliar de Serviços Gerais | Higienização & Organização"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-blue-900 font-medium"
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              E-mail de Contato
            </label>
            <input
              type="email"
              value={cvData.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="seu.nome@email.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              Telefone com WhatsApp
            </label>
            <input
              type="tel"
              value={cvData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="(00) 90000-0000"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          {/* Localização */}
          <div>
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              Cidade e Estado
            </label>
            <input
              type="text"
              value={cvData.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="Ex: Macapá, AP"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

          {/* LinkedIn */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="flex items-center gap-1 text-xs font-bold text-slate-700">
                <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                Endereço do Perfil no LinkedIn (Opcional)
              </label>
              {isLinkedInValid && (
                <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                  <CheckCircle2 className="w-3 h-3" /> Válido
                </span>
              )}
            </div>
            <input
              type="text"
              value={cvData.linkedinUrl}
              onChange={(e) => onChange({ linkedinUrl: e.target.value })}
              placeholder="linkedin.com/in/seunome"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-blue-800"
            />
          </div>

          {/* Portfólio / Site */}
          <div className="sm:col-span-2">
            <label className="flex items-center gap-1 text-xs font-bold text-slate-700 mb-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              Link de Portfólio, Behance, GitHub ou Trabalhos Realizados (Opcional)
            </label>
            <input
              type="text"
              value={cvData.portfolioUrl}
              onChange={(e) => onChange({ portfolioUrl: e.target.value })}
              placeholder="Ex: behance.net/seunome ou meutrabalho.com"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>

        </div>
      </div>

    </div>
  );
};
