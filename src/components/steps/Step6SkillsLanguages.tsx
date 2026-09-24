import React, { useState } from 'react';
import { CVData, LanguageItem, LinkedInRoleTemplate } from '../../types';
import { Wrench, Languages, Plus, X, Globe, HeartHandshake, Info, Sparkles } from 'lucide-react';

interface Step6Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  currentRoleTemplate?: LinkedInRoleTemplate;
}

const CEFR_LEVELS = [
  'Nativo / Língua Materna',
  'Fluente (C2)',
  'Avançado (C1)',
  'Intermediário (B1/B2)',
  'Básico / Iniciante (A1/A2)'
];

export const Step6SkillsLanguages: React.FC<Step6Props> = ({ cvData, onChange, currentRoleTemplate }) => {
  const [newHardSkill, setNewHardSkill] = useState('');
  const [newSoftSkill, setNewSoftSkill] = useState('');

  const hardSkills = cvData.hardSkills || [];
  const softSkills = cvData.softSkills || [];
  const languages = cvData.languages || [];

  // Hard skills
  const handleAddHardSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !hardSkills.includes(trimmed)) {
      onChange({ hardSkills: [...hardSkills, trimmed] });
      setNewHardSkill('');
    }
  };

  const handleRemoveHardSkill = (skill: string) => {
    onChange({ hardSkills: hardSkills.filter((s) => s !== skill) });
  };

  // Soft skills
  const handleAddSoftSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !softSkills.includes(trimmed)) {
      onChange({ softSkills: [...softSkills, trimmed] });
      setNewSoftSkill('');
    }
  };

  const handleRemoveSoftSkill = (skill: string) => {
    onChange({ softSkills: softSkills.filter((s) => s !== skill) });
  };

  // Idiomas
  const handleAddLanguage = () => {
    const newLang: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      level: 'Básico / Iniciante (A1/A2)'
    };
    onChange({ languages: [...languages, newLang] });
  };

  const handleUpdateLanguage = (id: string, updates: Partial<LanguageItem>) => {
    const updated = languages.map((l) => (l.id === id ? { ...l, ...updates } : l));
    onChange({ languages: updated });
  };

  const handleRemoveLanguage = (id: string) => {
    onChange({ languages: languages.filter((l) => l.id !== id) });
  };

  return (
    <div className="space-y-5">
      
      {/* GUIA EXPLICATIVO PARA HABILIDADES & IDIOMAS */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Entenda a Diferença entre Habilidades Técnicas e Comportamentais
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Os recrutadores analisam tanto o que você sabe fazer na prática quanto o seu jeito de trabalhar:
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>Habilidades Técnicas (Hard Skills):</strong> São ferramentas, programas ou procedimentos práticos que você aprendeu a operar (ex: <em>Word</em>, <em>Excel</em>, <em>Soldagem</em>, <em>Montagem de Computadores</em>, <em>Edição de Vídeo</em>, <em>Atendimento ao Cliente</em>).
          </li>
          <li>
            <strong>Habilidades Comportamentais (Soft Skills):</strong> São qualidades pessoais de como você lida com pessoas e tarefas (ex: <em>Pontualidade</em>, <em>Trabalho em Equipe</em>, <em>Vontade de Aprender</em>, <em>Organização</em>).
          </li>
          <li>
            <strong>Idiomas:</strong> Se você sabe o básico de outro idioma (como inglês ou espanhol), vale a pena colocar! Seja sempre honesto quanto ao nível.
          </li>
        </ul>
      </div>

      {/* 1. COMPETÊNCIAS TÉCNICAS (HARD SKILLS) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-blue-600" />
            Habilidades Técnicas e Ferramentas Práticas
          </h3>
          <p className="text-xs text-slate-500">
            Softwares, equipamentos, máquinas ou técnicas operacionais que você domina.
          </p>
        </div>

        {/* Input para adicionar nova skill */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newHardSkill}
            onChange={(e) => setNewHardSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddHardSkill(newHardSkill);
              }
            }}
            placeholder="Digite uma competência (ex: Excel, Manutenção de Equipamentos, Photoshop)..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none bg-white"
          />
          <button
            type="button"
            onClick={() => handleAddHardSkill(newHardSkill)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            Adicionar
          </button>
        </div>

        {/* Tags de Hard Skills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {hardSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-900 border border-blue-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveHardSkill(skill)}
                className="text-blue-500 hover:text-rose-600 p-0.5 cursor-pointer rounded-full"
                title="Remover"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {hardSkills.length === 0 && (
            <p className="text-xs text-slate-400 italic">Nenhuma habilidade técnica adicionada ainda.</p>
          )}
        </div>
      </div>

      {/* 2. COMPETÊNCIAS COMPORTAMENTAIS (SOFT SKILLS) */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-purple-600" />
            Habilidades Comportamentais (Atitudes e Postura)
          </h3>
          <p className="text-xs text-slate-500">
            Qualidades pessoais muito valorizadas em qualquer ambiente de trabalho.
          </p>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={newSoftSkill}
            onChange={(e) => setNewSoftSkill(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddSoftSkill(newSoftSkill);
              }
            }}
            placeholder="Digite uma qualidade (ex: Pontualidade, Trabalho em Equipe, Comunicação Clara)..."
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-purple-500 outline-none bg-white"
          />
          <button
            type="button"
            onClick={() => handleAddSoftSkill(newSoftSkill)}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            Adicionar
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {softSkills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-900 border border-purple-200"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSoftSkill(skill)}
                className="text-purple-500 hover:text-rose-600 p-0.5 cursor-pointer rounded-full"
                title="Remover"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {softSkills.length === 0 && (
            <p className="text-xs text-slate-400 italic">Nenhuma habilidade comportamental adicionada ainda.</p>
          )}
        </div>
      </div>

      {/* 3. IDIOMAS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-emerald-600" />
              Idiomas
            </h3>
            <p className="text-xs text-slate-500">
              Informe outros idiomas que você compreende ou fala.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Idioma</span>
          </button>
        </div>

        <div className="space-y-3">
          {languages.map((lang) => (
            <div key={lang.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-wrap items-center gap-3">
              <input
                type="text"
                value={lang.language}
                onChange={(e) => handleUpdateLanguage(lang.id, { language: e.target.value })}
                placeholder="Idioma (ex: Inglês, Espanhol)"
                className="flex-1 min-w-[140px] px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 outline-none bg-white font-medium"
              />

              <select
                value={lang.level}
                onChange={(e) => handleUpdateLanguage(lang.id, { level: e.target.value })}
                className="flex-1 min-w-[160px] px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-emerald-500 outline-none bg-white font-medium"
              >
                {CEFR_LEVELS.map((lvl, idx) => (
                  <option key={idx} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => handleRemoveLanguage(lang.id)}
                className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"
                title="Excluir idioma"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {languages.length === 0 && (
            <p className="text-xs text-slate-400 italic">Nenhum idioma estrangeiro cadastrado (o português já é o seu idioma nativo).</p>
          )}
        </div>
      </div>

    </div>
  );
};
