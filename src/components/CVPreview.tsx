import React, { useState } from 'react';
import { CVData } from '../types';
import { Mail, Phone, MapPin, Linkedin, Globe, Sparkles, ZoomIn, ZoomOut, Maximize2, Minimize2 } from 'lucide-react';

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const [zoom, setZoom] = useState<number>(0.92);
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false);

  const {
    template,
    primaryColor,
    showAIBadge,
    fullName,
    roleHeadline,
    email,
    phone,
    location,
    linkedinUrl,
    portfolioUrl,
    photoUrl,
    summary,
    experiences = [],
    education = [],
    certifications = [],
    hardSkills = [],
    softSkills = [],
    languages = [],
  } = cvData;

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Controles de Visualização da Prévia */}
      <div className="no-print w-full max-w-[210mm] flex items-center justify-between py-2 px-3 mb-2 bg-white/90 dark:bg-slate-800/90 backdrop-blur-xs border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-300 shadow-2xs transition-colors">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-100">Visualização em Tempo Real (A4)</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium">
            {template === 'm-coluna' ? 'Coluna Lateral' : template === 'm-moderno' ? 'Moderno' : 'Clássico ATS'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.65, Number((z - 0.05).toFixed(2))))}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Reduzir zoom"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-mono text-[11px] font-semibold">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(1.15, Number((z + 0.05).toFixed(2))))}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
            title="Aumentar zoom"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
          <button
            onClick={() => setIsFullWidth(!isFullWidth)}
            className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer"
            title={isFullWidth ? "Visualização Padrão" : "Expandir Prévia"}
          >
            {isFullWidth ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Container da Folha A4 com escala e rolagem precisa */}
      <div className="w-full overflow-x-auto overflow-y-visible pb-8 pt-1 scrollbar-thin">
        <div className="w-max min-w-full px-4 flex justify-center">
          {/* Caixa delimitadora dimensionalmente proporcional ao zoom */}
          <div
            style={{
              width: `${210 * zoom}mm`,
              minWidth: `${210 * zoom}mm`,
              height: `${297 * zoom}mm`,
            }}
            className="relative shrink-0 m-auto"
          >
            <div
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top left',
                width: '210mm',
                minHeight: '297mm',
              }}
              className="transition-transform duration-150 ease-out origin-top-left"
            >
              <div
                id="cv-printable-area"
                className="cv-a4-sheet bg-white text-slate-800 shadow-xl border border-slate-200/80 rounded-xs overflow-hidden relative"
                style={{ width: '210mm', minHeight: '297mm' }}
              >
            
            {/* ======================================================== */}
            {/* MODELO 1: COLUNA LATERAL (EXECUTIVE / SIDEBAR)           */}
            {/* ======================================================== */}
            {template === 'm-coluna' && (
              <div className="flex flex-row min-h-[297mm]">
                
                {/* BARRA LATERAL ESQUERDA */}
                <aside
                  className="w-[34%] p-6 text-white flex flex-col justify-between"
                  style={{ backgroundColor: primaryColor }}
                >
                  <div className="space-y-5">
                    {/* Foto do Candidato */}
                    {photoUrl ? (
                      <div className="flex justify-center mb-2">
                        <img
                          src={photoUrl}
                          alt="Foto do perfil"
                          className="w-28 h-28 rounded-full object-cover border-3 border-white shadow-md"
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center mb-2">
                        <div className="w-24 h-24 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center text-white/70 font-extrabold text-2xl">
                          {fullName ? fullName.charAt(0).toUpperCase() : 'CV'}
                        </div>
                      </div>
                    )}

                    {/* Contatos */}
                    <div>
                      <h4 className="text-[11px] font-extrabold tracking-wider uppercase pb-1 border-b border-white/25 mb-2.5 text-white/95">
                        Contato
                      </h4>
                      <div className="space-y-2 text-[10px] text-white/90">
                        {email && (
                          <div className="flex items-start gap-1.5 break-all">
                            <Mail className="w-3 h-3 shrink-0 mt-0.5 text-white/80" />
                            <span>{email}</span>
                          </div>
                        )}
                        {phone && (
                          <div className="flex items-center gap-1.5">
                            <Phone className="w-3 h-3 shrink-0 text-white/80" />
                            <span>{phone}</span>
                          </div>
                        )}
                        {location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-3 h-3 shrink-0 text-white/80" />
                            <span>{location}</span>
                          </div>
                        )}
                        {linkedinUrl && (
                          <div className="flex items-start gap-1.5 break-all">
                            <Linkedin className="w-3 h-3 shrink-0 mt-0.5 text-white/80" />
                            <span>{linkedinUrl.replace('https://', '')}</span>
                          </div>
                        )}
                        {portfolioUrl && (
                          <div className="flex items-start gap-1.5 break-all">
                            <Globe className="w-3 h-3 shrink-0 mt-0.5 text-white/80" />
                            <span>{portfolioUrl.replace('https://', '')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Competências Técnicas */}
                    {hardSkills.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-extrabold tracking-wider uppercase pb-1 border-b border-white/25 mb-2.5 text-white/95">
                          Habilidades Técnicas
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {hardSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] bg-white/15 px-2 py-0.5 rounded text-white font-medium backdrop-blur-2xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Competências Comportamentais */}
                    {softSkills.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-extrabold tracking-wider uppercase pb-1 border-b border-white/25 mb-2 text-white/95">
                          Soft Skills
                        </h4>
                        <div className="flex flex-wrap gap-1 text-[10px] text-white/85">
                          {softSkills.map((skill, idx) => (
                            <span key={idx} className="after:content-[','] last:after:content-none mr-1">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Idiomas */}
                    {languages.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-extrabold tracking-wider uppercase pb-1 border-b border-white/25 mb-2 text-white/95">
                          Idiomas
                        </h4>
                        <div className="space-y-1.5 text-[10px] text-white/90">
                          {languages.map((lang, idx) => (
                            <div key={idx} className="flex justify-between items-center">
                              <span className="font-semibold">{lang.language}</span>
                              <span className="text-white/75 text-[9px]">{lang.level}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Certificações */}
                    {certifications.length > 0 && (
                      <div>
                        <h4 className="text-[11px] font-extrabold tracking-wider uppercase pb-1 border-b border-white/25 mb-2 text-white/95">
                          Certificações
                        </h4>
                        <div className="space-y-2 text-[10px] text-white/90">
                          {certifications.map((cert, idx) => (
                            <div key={idx}>
                              <p className="font-semibold leading-tight">{cert.name}</p>
                              <p className="text-white/70 text-[9px]">
                                {cert.issuer} {cert.year ? `• ${cert.year}` : ''}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 text-center">
                    <span className="text-[9px] text-white/40 tracking-wider uppercase">
                      Perfil Profissional LinkedIn
                    </span>
                  </div>
                </aside>

                {/* CONTEÚDO PRINCIPAL DIREITO */}
                <main className="w-[66%] p-7 flex flex-col justify-between space-y-5">
                  <div className="space-y-5">
                    
                    {/* Selo Otimizado por IA */}
                    {showAIBadge && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                        <Sparkles className="w-3 h-3 text-purple-600" />
                        <span>Currículo Otimizado por Inteligência Artificial & LinkedIn</span>
                      </div>
                    )}

                    {/* Cabeçalho */}
                    <div className="border-b border-slate-200 pb-3">
                      <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight uppercase leading-tight">
                        {fullName || 'SEU NOME COMPLETO'}
                      </h1>
                      <h2
                        className="text-xs font-bold mt-1 tracking-wide"
                        style={{ color: primaryColor }}
                      >
                        {roleHeadline || 'Cargo Pretendido | Especialidade Principal'}
                      </h2>
                    </div>

                    {/* Resumo Profissional */}
                    {summary && (
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b border-slate-100 flex items-center gap-1.5"
                          style={{ color: primaryColor }}
                        >
                          Resumo Profissional
                        </h3>
                        <p className="text-xs text-slate-700 leading-relaxed text-justify">
                          {summary}
                        </p>
                      </div>
                    )}

                    {/* Experiência Profissional */}
                    {experiences.length > 0 && (
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b border-slate-100 flex items-center gap-1.5"
                          style={{ color: primaryColor }}
                        >
                          Experiência Profissional
                        </h3>
                        <div className="space-y-4">
                          {experiences.map((exp) => (
                            <div key={exp.id} className="space-y-1">
                              <div className="flex flex-wrap items-baseline justify-between gap-1">
                                <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {exp.startDate} – {exp.endDate || (exp.current ? 'Atual' : '')}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-600">
                                <span>{exp.company}</span>
                                {exp.location && <span>• {exp.location}</span>}
                              </div>
                              <p className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed pt-0.5">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Formação Acadêmica */}
                    {education.length > 0 && (
                      <div>
                        <h3
                          className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b border-slate-100"
                          style={{ color: primaryColor }}
                        >
                          Formação Acadêmica & Cursos Técnicos
                        </h3>
                        <div className="space-y-2.5">
                          {education.map((edu) => (
                            <div key={edu.id} className="text-xs">
                              <div className="flex justify-between items-baseline">
                                <span className="font-bold text-slate-900">{edu.degree}</span>
                                <span className="text-[10px] text-slate-500">
                                  {edu.completionYear} {edu.status ? `(${edu.status})` : ''}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-600">{edu.institution}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[9px] text-slate-400">
                    <span>Otimizado para leitura ATS & Recrutamento</span>
                    <span>{location || 'Brasil'}</span>
                  </div>
                </main>

              </div>
            )}

            {/* ======================================================== */}
            {/* MODELO 2: MODERNO (TWO-TONE HEADER)                      */}
            {/* ======================================================== */}
            {template === 'm-moderno' && (
              <div className="p-8 min-h-[297mm] flex flex-col justify-between space-y-5">
                <div className="space-y-5">
                  
                  {/* Banner Superior */}
                  <div
                    className="p-6 rounded-xl text-white flex items-center gap-5 shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt="Foto"
                        className="w-20 h-20 rounded-full object-cover border-2 border-white shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-white/20 border border-white/40 flex items-center justify-center font-bold text-xl shrink-0">
                        {fullName ? fullName.charAt(0) : 'CV'}
                      </div>
                    )}

                    <div className="flex-1">
                      {showAIBadge && (
                        <span className="inline-block text-[9px] uppercase tracking-wider bg-white/20 text-white px-2 py-0.5 rounded font-bold mb-1">
                          ✨ Otimizado com IA & LinkedIn
                        </span>
                      )}
                      <h1 className="text-2xl font-extrabold tracking-tight uppercase">
                        {fullName || 'SEU NOME COMPLETO'}
                      </h1>
                      <p className="text-xs font-semibold text-white/90 mt-0.5">
                        {roleHeadline || 'Cargo Desejado | Especialidade'}
                      </p>
                      
                      {/* Contatos em Linha */}
                      <div className="flex flex-wrap items-center gap-3 text-[10px] text-white/80 mt-2">
                        {email && <span>✉ {email}</span>}
                        {phone && <span>📞 {phone}</span>}
                        {location && <span>📍 {location}</span>}
                        {linkedinUrl && <span>🔗 {linkedinUrl.replace('https://', '')}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Resumo */}
                  {summary && (
                    <div className="space-y-1">
                      <h3
                        className="text-xs font-extrabold uppercase tracking-wider border-b-2 pb-1"
                        style={{ borderColor: primaryColor, color: primaryColor }}
                      >
                        Resumo Profissional
                      </h3>
                      <p className="text-xs text-slate-700 leading-relaxed text-justify pt-1">
                        {summary}
                      </p>
                    </div>
                  )}

                  {/* Grid de Conteúdo */}
                  <div className="grid grid-cols-3 gap-6">
                    
                    {/* Coluna Esquerda Principal (2/3): Experiência */}
                    <div className="col-span-2 space-y-4">
                      <div>
                        <h3
                          className="text-xs font-extrabold uppercase tracking-wider border-b-2 pb-1 mb-3"
                          style={{ borderColor: primaryColor, color: primaryColor }}
                        >
                          Histórico Profissional
                        </h3>
                        <div className="space-y-4">
                          {experiences.map((exp) => (
                            <div key={exp.id} className="space-y-1">
                              <div className="flex justify-between items-baseline">
                                <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {exp.startDate} - {exp.endDate}
                                </span>
                              </div>
                              <p className="text-[11px] font-semibold text-slate-600">
                                {exp.company} {exp.location ? `• ${exp.location}` : ''}
                              </p>
                              <p className="text-[11px] text-slate-700 whitespace-pre-line leading-relaxed">
                                {exp.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Formação */}
                      {education.length > 0 && (
                        <div>
                          <h3
                            className="text-xs font-extrabold uppercase tracking-wider border-b-2 pb-1 mb-2"
                            style={{ borderColor: primaryColor, color: primaryColor }}
                          >
                            Formação Acadêmica
                          </h3>
                          <div className="space-y-2">
                            {education.map((edu) => (
                              <div key={edu.id} className="text-xs">
                                <div className="flex justify-between">
                                  <span className="font-bold text-slate-900">{edu.degree}</span>
                                  <span className="text-[10px] text-slate-500">{edu.completionYear}</span>
                                </div>
                                <p className="text-[11px] text-slate-600">{edu.institution}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Coluna Direita (1/3): Skills, Idiomas, Certificados */}
                    <div className="col-span-1 space-y-4">
                      
                      {hardSkills.length > 0 && (
                        <div>
                          <h4
                            className="text-xs font-extrabold uppercase tracking-wider border-b pb-1 mb-2"
                            style={{ color: primaryColor }}
                          >
                            Hard Skills
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {hardSkills.map((s, idx) => (
                              <span key={idx} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded font-medium">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {softSkills.length > 0 && (
                        <div>
                          <h4
                            className="text-xs font-extrabold uppercase tracking-wider border-b pb-1 mb-1.5"
                            style={{ color: primaryColor }}
                          >
                            Soft Skills
                          </h4>
                          <p className="text-[10px] text-slate-600 leading-relaxed">
                            {softSkills.join(', ')}
                          </p>
                        </div>
                      )}

                      {languages.length > 0 && (
                        <div>
                          <h4
                            className="text-xs font-extrabold uppercase tracking-wider border-b pb-1 mb-1.5"
                            style={{ color: primaryColor }}
                          >
                            Idiomas
                          </h4>
                          <div className="space-y-1 text-[10px]">
                            {languages.map((l, idx) => (
                              <div key={idx} className="flex justify-between text-slate-700">
                                <span className="font-semibold">{l.language}</span>
                                <span className="text-slate-500">{l.level}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {certifications.length > 0 && (
                        <div>
                          <h4
                            className="text-xs font-extrabold uppercase tracking-wider border-b pb-1 mb-1.5"
                            style={{ color: primaryColor }}
                          >
                            Certificações
                          </h4>
                          <div className="space-y-1.5 text-[10px]">
                            {certifications.map((c, idx) => (
                              <div key={idx} className="text-slate-700">
                                <p className="font-semibold leading-tight">{c.name}</p>
                                <p className="text-slate-500 text-[9px]">{c.issuer}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>

                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 text-center text-[9px] text-slate-400">
                  Perfil profissional formatado com padrões de recrutamento
                </div>
              </div>
            )}

            {/* ======================================================== */}
            {/* MODELO 3: CLÁSSICO ATS (HARVARD STANDARD)                */}
            {/* ======================================================== */}
            {template === 'm-ats' && (
              <div className="p-10 min-h-[297mm] flex flex-col justify-between space-y-5 font-serif">
                <div className="space-y-5">
                  
                  {/* Cabeçalho Minimalista Centralizado */}
                  <div className="text-center border-b border-slate-800 pb-3">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-wide uppercase">
                      {fullName || 'SEU NOME COMPLETO'}
                    </h1>
                    <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest mt-1">
                      {roleHeadline || 'Cargo Pretendido'}
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-2 text-[10px] text-slate-600 font-sans mt-2">
                      {email && <span>{email}</span>}
                      {phone && <span>• {phone}</span>}
                      {location && <span>• {location}</span>}
                      {linkedinUrl && <span>• {linkedinUrl.replace('https://', '')}</span>}
                    </div>
                  </div>

                  {/* Resumo */}
                  {summary && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-1.5 font-sans">
                        Resumo Profissional
                      </h3>
                      <p className="text-xs text-slate-800 leading-relaxed text-justify font-sans">
                        {summary}
                      </p>
                    </div>
                  )}

                  {/* Experiências */}
                  {experiences.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2.5 font-sans">
                        Experiência Profissional
                      </h3>
                      <div className="space-y-3.5 font-sans">
                        {experiences.map((exp) => (
                          <div key={exp.id} className="space-y-1">
                            <div className="flex justify-between items-baseline text-xs">
                              <span className="font-bold text-slate-900">{exp.role}</span>
                              <span className="text-[10px] text-slate-600">
                                {exp.startDate} - {exp.endDate}
                              </span>
                            </div>
                            <div className="text-[11px] font-semibold text-slate-700 italic">
                              {exp.company} {exp.location ? `— ${exp.location}` : ''}
                            </div>
                            <p className="text-[11px] text-slate-800 whitespace-pre-line leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Formação */}
                  {education.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-sans">
                        Educação & Formação Técnica
                      </h3>
                      <div className="space-y-2 font-sans text-xs">
                        {education.map((edu) => (
                          <div key={edu.id}>
                            <div className="flex justify-between font-bold text-slate-900">
                              <span>{edu.degree}</span>
                              <span className="text-[10px] text-slate-600 font-normal">{edu.completionYear}</span>
                            </div>
                            <p className="text-[11px] text-slate-700 italic">{edu.institution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Competências & Idiomas em Bloco Linear ATS */}
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-300 pb-0.5 mb-2 font-sans">
                      Competências & Idiomas
                    </h3>
                    <div className="text-xs text-slate-800 space-y-1.5 font-sans">
                      {hardSkills.length > 0 && (
                        <p>
                          <strong className="text-slate-900">Habilidades Técnicas:</strong> {hardSkills.join(', ')}
                        </p>
                      )}
                      {softSkills.length > 0 && (
                        <p>
                          <strong className="text-slate-900">Competências Interpessoais:</strong> {softSkills.join(', ')}
                        </p>
                      )}
                      {languages.length > 0 && (
                        <p>
                          <strong className="text-slate-900">Idiomas:</strong>{' '}
                          {languages.map((l) => `${l.language} (${l.level})`).join('; ')}
                        </p>
                      )}
                      {certifications.length > 0 && (
                        <p>
                          <strong className="text-slate-900">Certificações:</strong>{' '}
                          {certifications.map((c) => `${c.name} - ${c.issuer}`).join('; ')}
                        </p>
                      )}
                    </div>
                  </div>

                </div>

                <div className="pt-4 text-center text-[9px] text-slate-400 font-sans">
                  Layout homologado para sistemas ATS (Applicant Tracking Systems)
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  </div>

</div>
  );
};
