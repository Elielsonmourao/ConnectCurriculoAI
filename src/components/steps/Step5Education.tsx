import React from 'react';
import { CVData, EducationItem, CertificationItem, LinkedInRoleTemplate } from '../../types';
import { GraduationCap, Award, Plus, Trash2, Calendar, Building, Info, Sparkles } from 'lucide-react';

interface Step5Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  currentRoleTemplate?: LinkedInRoleTemplate;
}

export const Step5Education: React.FC<Step5Props> = ({ cvData, onChange, currentRoleTemplate }) => {
  const education = cvData.education || [];
  const certifications = cvData.certifications || [];

  // Formação
  const handleAddEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: '',
      institution: '',
      fieldOfStudy: '',
      completionYear: '2025',
      status: 'Concluído'
    };
    onChange({ education: [...education, newItem] });
  };

  const handleUpdateEdu = (id: string, updates: Partial<EducationItem>) => {
    const updated = education.map((item) => (item.id === id ? { ...item, ...updates } : item));
    onChange({ education: updated });
  };

  const handleRemoveEdu = (id: string) => {
    onChange({ education: education.filter((item) => item.id !== id) });
  };

  // Certificações
  const handleAddCert = () => {
    const newCert: CertificationItem = {
      id: `cert-${Date.now()}`,
      name: '',
      issuer: '',
      year: new Date().getFullYear().toString()
    };
    onChange({ certifications: [...certifications, newCert] });
  };

  const handleUpdateCert = (id: string, updates: Partial<CertificationItem>) => {
    const updated = certifications.map((c) => (c.id === id ? { ...c, ...updates } : c));
    onChange({ certifications: updated });
  };

  const handleRemoveCert = (id: string) => {
    onChange({ certifications: certifications.filter((c) => c.id !== id) });
  };

  return (
    <div className="space-y-5">
      
      {/* GUIA EXPLICATIVO PARA FORMAÇÃO & CURSOS */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Orientações para Formação Acadêmica e Certificados
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Os recrutadores querem entender sua base de estudo e quais certificados você já conquistou:
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside leading-relaxed">
          <li>
            <strong>Cursos Técnicos e Ensino Regular:</strong> Insira seus cursos técnicos (como SENAI), graduação, tecnólogo ou ensino médio.
          </li>
          <li>
            <strong>Curso ainda em andamento?</strong> Não tem problema! Selecione a opção <em>"Em andamento"</em> e informe o ano previsto de conclusão. As empresas valorizam muito candidatos que estão estudando.
          </li>
          <li>
            <strong>Certificações e Cursos Rápidos:</strong> Cursos de aperfeiçoamento (como informática, normas de segurança, ferramentas digitais) devem ser inseridos no quadro de <em>Certificações</em>.
          </li>
        </ul>
      </div>

      {/* 1. FORMAÇÃO ACADÊMICA & TÉCNICA */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Cursos Técnicos e Formação Acadêmica
            </h3>
            <p className="text-xs text-slate-500">
              Adicione os cursos e escolas onde você estudou.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddEducation}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Curso</span>
          </button>
        </div>

        {education.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-xl space-y-2">
            <GraduationCap className="w-7 h-7 text-slate-300 mx-auto" />
            <p className="text-xs text-slate-600">Nenhum curso cadastrado ainda. Clique em "Adicionar Curso" acima.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={edu.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Curso #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveEdu(edu.id)}
                    className="text-rose-500 hover:text-rose-700 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Excluir</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Nome do Curso / Habilitação</label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => handleUpdateEdu(edu.id, { degree: e.target.value })}
                      placeholder="Ex: Técnico em Eletromecânica ou Ensino Médio"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      Instituição / Escola
                    </label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => handleUpdateEdu(edu.id, { institution: e.target.value })}
                      placeholder="Ex: SENAI Macapá"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-slate-700 mb-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      Ano de Conclusão
                    </label>
                    <input
                      type="text"
                      value={edu.completionYear}
                      onChange={(e) => handleUpdateEdu(edu.id, { completionYear: e.target.value })}
                      placeholder="Ex: 2025"
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Situação do Curso</label>
                    <select
                      value={edu.status}
                      onChange={(e) => handleUpdateEdu(edu.id, { status: e.target.value as any })}
                      className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-blue-500 outline-none bg-white"
                    >
                      <option value="Concluído">Concluído</option>
                      <option value="Em andamento">Em andamento</option>
                      <option value="Trancado">Trancado</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. CERTIFICAÇÕES & CURSOS DE APERFEIÇOAMENTO */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-600" />
              Certificações & Cursos de Aperfeiçoamento
            </h3>
            <p className="text-xs text-slate-500">
              Cursos rápidos, oficinas práticas, normas regulamentadoras e certificados.
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddCert}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs cursor-pointer transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Adicionar Certificado</span>
          </button>
        </div>

        {certifications.length === 0 ? (
          <p className="text-xs text-slate-400 py-3 italic text-center border border-dashed border-slate-200 rounded-xl">
            Nenhuma certificação adicionada. Se tiver cursos de aperfeiçoamento, clique no botão acima para incluir.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {certifications.map((cert) => (
              <div key={cert.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 relative">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-700">Certificado</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveCert(cert.id)}
                    className="text-rose-500 hover:text-rose-700 p-0.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="text"
                  value={cert.name}
                  onChange={(e) => handleUpdateCert(cert.id, { name: e.target.value })}
                  placeholder="Nome do Certificado (ex: NR-10 ou Excel)"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 focus:border-purple-500 outline-none bg-white font-medium"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => handleUpdateCert(cert.id, { issuer: e.target.value })}
                    placeholder="Instituição Emissora (ex: SENAI)"
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 focus:border-purple-500 outline-none bg-white"
                  />
                  <input
                    type="text"
                    value={cert.year}
                    onChange={(e) => handleUpdateCert(cert.id, { year: e.target.value })}
                    placeholder="Ano (ex: 2024)"
                    className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-300 focus:border-purple-500 outline-none bg-white"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
