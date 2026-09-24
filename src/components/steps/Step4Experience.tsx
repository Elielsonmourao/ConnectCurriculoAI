import React, { useState } from 'react';
import { CVData, ExperienceItem, LinkedInRoleTemplate } from '../../types';
import { ACTION_VERBS } from '../../data/linkedinDatabase';
import { Briefcase, Plus, Trash2, Calendar, MapPin, Building2, Info, HelpCircle, Zap, Sparkles } from 'lucide-react';

interface Step4Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  currentRoleTemplate?: LinkedInRoleTemplate;
}

export const Step4Experience: React.FC<Step4Props> = ({ cvData, onChange, currentRoleTemplate }) => {
  const experiences = cvData.experiences || [];
  const [selectedExpIdForVerbs, setSelectedExpIdForVerbs] = useState<string>(
    experiences[0]?.id || ''
  );

  const handleAddExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: currentRoleTemplate?.roleName || '',
      company: '',
      location: cvData.location || '',
      startDate: '2024',
      endDate: 'Atual',
      current: true,
      description: currentRoleTemplate?.experienceBullets?.[0]
        ? `• ${currentRoleTemplate.experienceBullets[0]}\n• ${currentRoleTemplate.experienceBullets[1] || 'Atuação com foco em pontualidade e trabalho em equipe.'}`
        : '• Atuei na execução das rotinas diárias com foco em qualidade e pontualidade.\n• Colaborei ativamente com a equipe para a melhoria dos processos.'
    };
    const updated = [newItem, ...experiences];
    onChange({ experiences: updated });
    setSelectedExpIdForVerbs(newItem.id);
  };

  const handleUpdateItem = (id: string, updates: Partial<ExperienceItem>) => {
    const updated = experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp));
    onChange({ experiences: updated });
  };

  const handleRemoveItem = (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    onChange({ experiences: updated });
    if (selectedExpIdForVerbs === id && updated.length > 0) {
      setSelectedExpIdForVerbs(updated[0].id);
    }
  };

  const handleInsertVerbIntoExperience = (verb: string, expId: string) => {
    const target = experiences.find((e) => e.id === expId);
    if (!target) return;
    const currentDesc = target.description || '';
    const newBullet = `• ${verb} `;
    const updatedDesc = currentDesc.trim().length > 0 ? `${currentDesc}\n${newBullet}` : newBullet;
    handleUpdateItem(expId, { description: updatedDesc });
  };

  const handleInsertBulletIntoExperience = (bullet: string, expId: string) => {
    const target = experiences.find((e) => e.id === expId);
    if (!target) return;
    const currentDesc = target.description || '';
    const cleanBullet = bullet.startsWith('•') ? bullet : `• ${bullet}`;
    const updatedDesc = currentDesc.trim().length > 0 ? `${currentDesc}\n${cleanBullet}` : cleanBullet;
    handleUpdateItem(expId, { description: updatedDesc });
  };

  return (
    <div className="space-y-5">
      
      {/* GUIA EXPLICATIVO PARA INICIANTES (Formal, compreensível e acolhedor) */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2.5">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Orientações para Preencher suas Experiências Profissionais
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Esta é uma das partes mais observadas pelos contratantes. Preencha com tranquilidade seguindo as dicas abaixo:
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>O que conta como experiência?</strong> Empregos anteriores com ou sem carteira assinada, estágios, projetos práticos de cursos (como oficinas e laboratórios do SENAI), trabalhos voluntários e serviços autônomos/freelance.
          </li>
          <li>
            <strong>Como descrever o que você fazia?</strong> Use pequenas frases com marcadores (•), começando com verbos que mostrem o que você realizou (ex: <em>"Organizei"</em>, <em>"Atendi"</em>, <em>"Desenvolvi"</em>, <em>"Operei"</em>).
          </li>
          <li>
            <strong>Se for seu primeiro currículo:</strong> Destaque os trabalhos em equipe e projetos práticos realizados no seu curso técnico ou ensino médio.
          </li>
        </ul>
      </div>

      {/* HISTÓRICO PROFISSIONAL */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Histórico Profissional
            </h3>
            <p className="text-xs text-slate-500">
              Liste suas experiências da mais recente para a mais antiga.
            </p>
          </div>

          <button
            type="button"
            onClick={handleAddExperience}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Experiência</span>
          </button>
        </div>

        {experiences.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-slate-200 rounded-xl space-y-2">
            <Briefcase className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">Nenhuma experiência adicionada ainda</p>
            <p className="text-[11px] text-slate-400">Clique no botão acima para adicionar seu histórico profissional ou projetos práticos.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {experiences.map((exp, idx) => (
              <div
                key={exp.id}
                className={`p-4 rounded-xl border transition-all ${
                  selectedExpIdForVerbs === exp.id
                    ? 'border-blue-300 bg-blue-50/30 ring-1 ring-blue-300'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                } space-y-3`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">
                    Experiência #{idx + 1} {exp.role ? `— ${exp.role}` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(exp.id)}
                    className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-50 transition-colors cursor-pointer text-xs flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Cargo */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Cargo / Função
                    </label>
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => handleUpdateItem(exp.id, { role: e.target.value })}
                      placeholder="Ex: Produtora Audiovisual, Eletromecânico..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white font-medium"
                    />
                  </div>

                  {/* Empresa */}
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-1">
                      <Building2 className="w-3 h-3 text-slate-400" />
                      Empresa / Local de Trabalho
                    </label>
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => handleUpdateItem(exp.id, { company: e.target.value })}
                      placeholder="Ex: Produtora SENAI, Empresa X..."
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white font-medium"
                    />
                  </div>

                  {/* Cidade */}
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      Cidade e Estado
                    </label>
                    <input
                      type="text"
                      value={exp.location}
                      onChange={(e) => handleUpdateItem(exp.id, { location: e.target.value })}
                      placeholder="Ex: Macapá, AP"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>

                  {/* Período */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        Período de Trabalho
                      </label>
                      <label className="text-[10px] text-slate-600 font-medium flex items-center gap-1 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) =>
                            handleUpdateItem(exp.id, {
                              current: e.target.checked,
                              endDate: e.target.checked ? 'Atual' : ''
                            })
                          }
                          className="rounded border-slate-300 text-blue-600"
                        />
                        Trabalho atual
                      </label>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdateItem(exp.id, { startDate: e.target.value })}
                        placeholder="Ano Início (ex: 2024)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
                      />
                      <input
                        type="text"
                        value={exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => handleUpdateItem(exp.id, { endDate: e.target.value })}
                        placeholder="Ano Fim (ex: Atual)"
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-[11px] font-bold text-slate-700">
                        Atividades e Resultados Realizados
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Use o marcador • no início de cada linha
                      </span>
                    </div>
                    <textarea
                      rows={4}
                      value={exp.description}
                      onChange={(e) => handleUpdateItem(exp.id, { description: e.target.value })}
                      placeholder="• Criação de apresentações visuais e relatórios técnicos...&#10;• Apoio na organização de cronogramas e logística de estúdio..."
                      className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white leading-relaxed font-sans"
                    />
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
