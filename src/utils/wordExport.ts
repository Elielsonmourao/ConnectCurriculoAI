import { CVData } from '../types';

export type WordExportFormat = 'sidebar' | 'classic' | 'modern';

/**
 * Gera um documento Microsoft Word (.doc) com três opções de modelo:
 * 1. 'modern': Layout Moderno com cabeçalho colorido elegante em bloco, tipografia refinada e organização limpa.
 * 2. 'sidebar': Layout executivo com Coluna Lateral colorida, ajustado para 1 página.
 * 3. 'classic': Layout clássico linear de coluna única com margens estritas de 2,5 cm (superior, inferior, esquerda e direita), 100% compatível com ATS.
 */
export function exportCVToWord(
  cvData: CVData,
  format: WordExportFormat = 'classic'
): void {
  const primaryColor = cvData.primaryColor || '#005b82';
  const fullName = cvData.fullName || 'SEU NOME COMPLETO';
  const roleHeadline = cvData.roleHeadline || cvData.targetRole || 'Título Profissional';
  const summary = cvData.summary || '';
  const experiences = cvData.experiences || [];
  const education = cvData.education || [];
  const certifications = cvData.certifications || [];
  const hardSkills = cvData.hardSkills || [];
  const softSkills = cvData.softSkills || [];
  const languages = cvData.languages || [];

  let bodyContent = '';
  let pageMarginsCss = '';

  if (format === 'sidebar') {
    pageMarginsCss = `
      @page Section1 {
        size: 595.3pt 841.9pt; /* Folha A4 */
        margin: 12pt 12pt 12pt 12pt; /* Margem compacta para tabela em 1 página */
        mso-header-margin: 0pt;
        mso-footer-margin: 0pt;
        mso-paper-source: 0;
      }
      div.Section1 {
        page: Section1;
      }
    `;

    // =========================================================================
    // MODELO 1: COLUNA LATERAL (TABELA DE 2 COLUNAS COMPACTA EM PÁGINA ÚNICA)
    // =========================================================================
    bodyContent = `
      <div class="Section1">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; mso-table-layout-alt: fixed;">
          <tr style="page-break-inside: avoid; mso-height-rule: exactly;">
            
            <!-- COLUNA LATERAL ESQUERDA (30%) -->
            <td width="30%" valign="top" style="width: 30%; background-color: ${primaryColor}; color: #ffffff; padding: 10pt 8pt; mso-cell-special: none;">
              
              ${
                cvData.photoUrl
                  ? `<div style="text-align: center; margin-bottom: 8pt;">
                       <img src="${cvData.photoUrl}" width="70" height="70" style="width: 70px; height: 70px; border-radius: 35px; border: 2px solid #ffffff;" />
                     </div>`
                  : ''
              }

              <!-- CONTATO -->
              <div style="margin-bottom: 10pt;">
                <h4 style="font-size: 8.5pt; font-weight: bold; color: #ffffff; text-transform: uppercase; border-bottom: 1pt solid rgba(255,255,255,0.4); padding-bottom: 1.5pt; margin: 0 0 4pt 0;">
                  Contato
                </h4>
                ${cvData.email ? `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>E-mail:</strong><br>${cvData.email}</p>` : ''}
                ${cvData.phone ? `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>Telefone:</strong><br>${cvData.phone}</p>` : ''}
                ${cvData.location ? `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>Local:</strong><br>${cvData.location}</p>` : ''}
                ${cvData.linkedinUrl ? `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>LinkedIn:</strong><br>${cvData.linkedinUrl.replace('https://', '')}</p>` : ''}
                ${cvData.portfolioUrl ? `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>Portfólio:</strong><br>${cvData.portfolioUrl.replace('https://', '')}</p>` : ''}
              </div>

              <!-- HABILIDADES TÉCNICAS -->
              ${
                hardSkills.length > 0
                  ? `<div style="margin-bottom: 10pt;">
                       <h4 style="font-size: 8.5pt; font-weight: bold; color: #ffffff; text-transform: uppercase; border-bottom: 1pt solid rgba(255,255,255,0.4); padding-bottom: 1.5pt; margin: 0 0 4pt 0;">
                         Habilidades Técnicas
                       </h4>
                       <p style="font-size: 7.5pt; color: #f8fafc; margin: 0; line-height: 1.25;">
                         ${hardSkills.join(' • ')}
                       </p>
                     </div>`
                  : ''
              }

              <!-- SOFT SKILLS -->
              ${
                softSkills.length > 0
                  ? `<div style="margin-bottom: 10pt;">
                       <h4 style="font-size: 8.5pt; font-weight: bold; color: #ffffff; text-transform: uppercase; border-bottom: 1pt solid rgba(255,255,255,0.4); padding-bottom: 1.5pt; margin: 0 0 4pt 0;">
                         Soft Skills
                       </h4>
                       <p style="font-size: 7.5pt; color: #f8fafc; margin: 0; line-height: 1.25;">
                         ${softSkills.join(' • ')}
                       </p>
                     </div>`
                  : ''
              }

              <!-- IDIOMAS -->
              ${
                languages.length > 0
                  ? `<div style="margin-bottom: 10pt;">
                       <h4 style="font-size: 8.5pt; font-weight: bold; color: #ffffff; text-transform: uppercase; border-bottom: 1pt solid rgba(255,255,255,0.4); padding-bottom: 1.5pt; margin: 0 0 4pt 0;">
                         Idiomas
                       </h4>
                       ${languages
                         .map(
                           (l) =>
                             `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>${l.language}:</strong> ${l.level}</p>`
                         )
                         .join('')}
                     </div>`
                  : ''
              }

              <!-- CERTIFICAÇÕES NA LATERAL -->
              ${
                certifications.length > 0
                  ? `<div style="margin-bottom: 8pt;">
                       <h4 style="font-size: 8.5pt; font-weight: bold; color: #ffffff; text-transform: uppercase; border-bottom: 1pt solid rgba(255,255,255,0.4); padding-bottom: 1.5pt; margin: 0 0 4pt 0;">
                         Certificações
                       </h4>
                       ${certifications
                         .map(
                           (c) =>
                             `<p style="font-size: 7.5pt; color: #f8fafc; margin: 0 0 2pt 0; line-height: 1.2;"><strong>${c.name}</strong> (${c.issuer})</p>`
                         )
                         .join('')}
                     </div>`
                  : ''
              }

            </td>

            <!-- COLUNA PRINCIPAL DIREITA (70%) -->
            <td width="70%" valign="top" style="width: 70%; background-color: #ffffff; color: #1e293b; padding: 10pt 12pt; mso-cell-special: none;">
              
              <!-- NOME E CARGO -->
              <div style="border-bottom: 1.5pt solid #cbd5e1; padding-bottom: 4pt; margin-bottom: 6pt;">
                <h1 style="font-size: 16pt; font-weight: bold; color: #0f172a; text-transform: uppercase; margin: 0 0 2pt 0; letter-spacing: -0.3pt;">
                  ${fullName}
                </h1>
                <h2 style="font-size: 10pt; font-weight: bold; color: ${primaryColor}; margin: 0;">
                  ${roleHeadline}
                </h2>
              </div>

              <!-- RESUMO PROFISSIONAL -->
              ${
                summary
                  ? `
                <div style="margin-bottom: 8pt;">
                  <h3 style="font-size: 9pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 1.5pt; margin: 0 0 3pt 0;">
                    Resumo Profissional
                  </h3>
                  <p style="font-size: 8pt; line-height: 1.3; color: #334155; margin: 0; text-align: justify;">
                    ${summary}
                  </p>
                </div>
              `
                  : ''
              }

              <!-- EXPERIÊNCIA PROFISSIONAL -->
              ${
                experiences.length > 0
                  ? `
                <div style="margin-bottom: 8pt;">
                  <h3 style="font-size: 9pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 1.5pt; margin: 0 0 3pt 0;">
                    Experiência Profissional
                  </h3>
                  ${experiences
                    .map(
                      (e) => `
                    <div style="margin-bottom: 5pt;">
                      <p style="font-size: 8pt; font-weight: bold; color: #0f172a; margin: 0;">
                        ${e.role} — <span style="font-weight: normal; color: #475569;">${e.company}</span>
                        <span style="font-size: 7.5pt; color: #64748b; margin-left: 4pt;">(${e.startDate} - ${e.endDate || (e.current ? 'Atual' : '')})</span>
                      </p>
                      <div style="font-size: 7.5pt; color: #334155; line-height: 1.25; margin-top: 1pt;">
                        ${e.description}
                      </div>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              `
                  : ''
              }

              <!-- FORMAÇÃO ACADÊMICA -->
              ${
                education.length > 0
                  ? `
                <div>
                  <h3 style="font-size: 9pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 1.5pt; margin: 0 0 3pt 0;">
                    Formação Acadêmica
                  </h3>
                  ${education
                    .map(
                      (ed) => `
                    <p style="font-size: 8pt; margin: 0 0 2pt 0;">
                      <strong>${ed.degree}</strong> — ${ed.institution} (${ed.completionYear})
                    </p>
                  `
                    )
                    .join('')}
                </div>
              `
                  : ''
              }

            </td>

          </tr>
        </table>
      </div>
    `;
  } else if (format === 'modern') {
    // =========================================================================
    // MODELO 3: MODERNO (CABEÇALHO EM BLOCO COLORIDO + DESIGN CONTEMPORÂNEO)
    // =========================================================================
    pageMarginsCss = `
      @page Section1 {
        size: 595.3pt 841.9pt; /* A4 */
        margin: 2.0cm 2.0cm 2.0cm 2.0cm;
        mso-header-margin: 36pt;
        mso-footer-margin: 36pt;
        mso-paper-source: 0;
      }
      div.Section1 {
        page: Section1;
      }
    `;

    bodyContent = `
      <div class="Section1" style="font-family: 'Calibri', 'Arial', sans-serif;">
        
        <!-- BANNER / CABEÇALHO MODERNO COLORIDO -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: ${primaryColor}; margin-bottom: 14pt; border-radius: 6pt; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
          <tr>
            <td style="padding: 14pt 16pt; color: #ffffff;">
              <h1 style="font-size: 20pt; font-weight: bold; color: #ffffff; text-transform: uppercase; margin: 0 0 3pt 0; letter-spacing: -0.2pt;">
                ${fullName}
              </h1>
              <h2 style="font-size: 11.5pt; font-weight: 600; color: #f1f5f9; margin: 0 0 8pt 0;">
                ${roleHeadline}
              </h2>
              <p style="font-size: 8.5pt; color: #e2e8f0; margin: 0; line-height: 1.35;">
                ${cvData.email ? `✉ ${cvData.email} &nbsp;|&nbsp; ` : ''}
                ${cvData.phone ? `📞 ${cvData.phone} &nbsp;|&nbsp; ` : ''}
                ${cvData.location ? `📍 ${cvData.location} &nbsp;|&nbsp; ` : ''}
                ${cvData.linkedinUrl ? `🔗 ${cvData.linkedinUrl.replace('https://', '')}` : ''}
              </p>
            </td>
          </tr>
        </table>

        <!-- RESUMO PROFISSIONAL -->
        ${
          summary
            ? `
          <div style="margin-bottom: 12pt;">
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 5pt 0;">
              Resumo Profissional
            </h3>
            <p style="font-size: 9.5pt; line-height: 1.45; color: #334155; margin: 0; text-align: justify;">
              ${summary}
            </p>
          </div>
        `
            : ''
        }

        <!-- HISTÓRICO PROFISSIONAL -->
        ${
          experiences.length > 0
            ? `
          <div style="margin-bottom: 12pt;">
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 6pt 0;">
              Histórico Profissional
            </h3>
            ${experiences
              .map(
                (e) => `
              <div style="margin-bottom: 8pt;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                  <tr>
                    <td align="left" style="font-size: 10pt; font-weight: bold; color: #0f172a;">
                      ${e.role} — <span style="font-weight: 600; color: #475569;">${e.company}</span>
                    </td>
                    <td align="right" style="font-size: 8.5pt; color: #64748b; font-weight: 500;">
                      ${e.startDate} - ${e.endDate || (e.current ? 'Atual' : '')}
                    </td>
                  </tr>
                </table>
                <div style="font-size: 9pt; color: #334155; line-height: 1.4; margin-top: 2pt;">
                  ${e.description}
                </div>
              </div>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <!-- FORMAÇÃO ACADÊMICA & CURSOS TÉCNICOS -->
        ${
          education.length > 0
            ? `
          <div style="margin-bottom: 12pt;">
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 6pt 0;">
              Formação Acadêmica & Cursos Técnicos
            </h3>
            ${education
              .map(
                (ed) => `
              <p style="font-size: 9.5pt; margin: 0 0 4pt 0; color: #1e293b;">
                <strong>${ed.degree}</strong> — ${ed.institution} 
                <span style="color: #64748b; font-size: 8.5pt;">(${ed.completionYear}) ${ed.status ? `— <em>${ed.status}</em>` : ''}</span>
              </p>
            `
              )
              .join('')}
          </div>
        `
            : ''
        }

        <!-- CERTIFICAÇÕES E QUALIFICAÇÕES -->
        ${
          certifications.length > 0
            ? `
          <div style="margin-bottom: 12pt;">
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 5pt 0;">
              Certificações & Treinamentos
            </h3>
            <p style="font-size: 9pt; color: #334155; line-height: 1.4; margin: 0;">
              ${certifications.map((c) => `<strong>${c.name}</strong> (${c.issuer})`).join(' &nbsp;•&nbsp; ')}
            </p>
          </div>
        `
            : ''
        }

        <!-- COMPETÊNCIAS TÉCNICAS E COMPORTAMENTAIS -->
        ${
          hardSkills.length > 0 || softSkills.length > 0
            ? `
          <div style="margin-bottom: 12pt;">
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 5pt 0;">
              Competências & Habilidades
            </h3>
            ${hardSkills.length > 0 ? `<p style="font-size: 9pt; margin: 0 0 3pt 0; color: #334155;"><strong>Habilidades Técnicas:</strong> ${hardSkills.join(' • ')}</p>` : ''}
            ${softSkills.length > 0 ? `<p style="font-size: 9pt; margin: 0 0 3pt 0; color: #334155;"><strong>Soft Skills:</strong> ${softSkills.join(' • ')}</p>` : ''}
          </div>
        `
            : ''
        }

        <!-- IDIOMAS -->
        ${
          languages.length > 0
            ? `
          <div>
            <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 2pt solid ${primaryColor}; padding-bottom: 2pt; margin: 0 0 5pt 0;">
              Idiomas
            </h3>
            <p style="font-size: 9pt; margin: 0; color: #334155;">
              ${languages.map((l) => `${l.language} (${l.level})`).join(' &nbsp;|&nbsp; ')}
            </p>
          </div>
        `
            : ''
        }

      </div>
    `;
  } else {
    // =========================================================================
    // MODELO 2: CLÁSSICO ATS (MARGENS DE EXATAMENTE 2,5 CM EM TODAS AS BORDAS)
    // =========================================================================
    // 2.5cm = 70.87pt = 1417 twips
    pageMarginsCss = `
      @page Section1 {
        size: 595.3pt 841.9pt; /* Folha A4 padrão: 210mm x 297mm */
        margin-top: 2.5cm;
        margin-bottom: 2.5cm;
        margin-left: 2.5cm;
        margin-right: 2.5cm;
        mso-margin-top-alt: 2.5cm;
        mso-margin-bottom-alt: 2.5cm;
        mso-margin-left-alt: 2.5cm;
        mso-margin-right-alt: 2.5cm;
        mso-header-margin: 36pt;
        mso-footer-margin: 36pt;
        mso-page-orientation: portrait;
        mso-paper-source: 0;
      }
      div.Section1 {
        page: Section1;
      }
    `;

    bodyContent = `
      <div class="Section1" style="font-family: 'Calibri', 'Arial', sans-serif;">
        <!-- CABEÇALHO -->
        <div style="border-bottom: 2pt solid ${primaryColor}; padding-bottom: 6pt; margin-bottom: 12pt;">
          <h1 style="font-size: 19pt; font-weight: bold; color: #0f172a; text-transform: uppercase; margin: 0 0 3pt 0;">
            ${fullName}
          </h1>
          <h2 style="font-size: 11.5pt; font-weight: bold; color: ${primaryColor}; margin: 0 0 6pt 0;">
            ${roleHeadline}
          </h2>
          <p style="font-size: 9.5pt; color: #475569; margin: 0; line-height: 1.35;">
            ${cvData.email ? `<strong>E-mail:</strong> ${cvData.email} &nbsp;|&nbsp; ` : ''}
            ${cvData.phone ? `<strong>Telefone:</strong> ${cvData.phone} &nbsp;|&nbsp; ` : ''}
            ${cvData.location ? `<strong>Localidade:</strong> ${cvData.location} &nbsp;|&nbsp; ` : ''}
            ${cvData.linkedinUrl ? `<strong>LinkedIn:</strong> ${cvData.linkedinUrl}` : ''}
          </p>
        </div>

        <!-- RESUMO -->
        ${
          summary
            ? `
            <div style="margin-bottom: 12pt;">
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 5pt 0;">
                Resumo Profissional
              </h3>
              <p style="font-size: 9.5pt; line-height: 1.45; color: #334155; margin: 0; text-align: justify;">
                ${summary}
              </p>
            </div>
          `
            : ''
        }

        <!-- EXPERIÊNCIAS -->
        ${
          experiences.length > 0
            ? `
            <div style="margin-bottom: 12pt;">
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">
                Experiência Profissional
              </h3>
              ${experiences
                .map(
                  (e) => `
                <div style="margin-bottom: 8pt;">
                  <p style="font-size: 10pt; font-weight: bold; color: #0f172a; margin: 0;">
                    ${e.role} — <span style="font-weight: normal; color: #475569;">${e.company}</span>
                    <span style="font-size: 9pt; color: #64748b; margin-left: 6pt;">(${e.startDate} - ${e.endDate || (e.current ? 'Atual' : '')})</span>
                  </p>
                  <div style="font-size: 9pt; color: #334155; line-height: 1.4; margin-top: 2pt;">
                    ${e.description}
                  </div>
                </div>
              `
                )
                .join('')}
            </div>
          `
            : ''
        }

        <!-- FORMAÇÃO -->
        ${
          education.length > 0
            ? `
            <div style="margin-bottom: 12pt;">
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">
                Formação Acadêmica & Cursos Técnicos
              </h3>
              ${education
                .map(
                  (ed) => `
                <p style="font-size: 9.5pt; margin: 0 0 3pt 0; color: #1e293b;">
                  <strong>${ed.degree}</strong> — ${ed.institution} (${ed.completionYear}) ${ed.status ? `<em>(${ed.status})</em>` : ''}
                </p>
              `
                )
                .join('')}
            </div>
          `
            : ''
        }

        <!-- CERTIFICAÇÕES -->
        ${
          certifications.length > 0
            ? `
            <div style="margin-bottom: 12pt;">
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">
                Certificações & Cursos de Aperfeiçoamento
              </h3>
              <p style="font-size: 9.5pt; margin: 0 0 3pt 0; color: #334155;">
                ${certifications.map((c) => `<strong>${c.name}</strong> (${c.issuer})`).join(' &nbsp;•&nbsp; ')}
              </p>
            </div>
          `
            : ''
        }

        <!-- COMPETÊNCIAS -->
        ${
          hardSkills.length > 0 || softSkills.length > 0
            ? `
            <div style="margin-bottom: 12pt;">
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">
                Competências & Habilidades
              </h3>
              ${hardSkills.length > 0 ? `<p style="font-size: 9.5pt; margin: 0 0 3pt 0;"><strong>Habilidades Técnicas:</strong> ${hardSkills.join(', ')}</p>` : ''}
              ${softSkills.length > 0 ? `<p style="font-size: 9.5pt; margin: 0 0 3pt 0;"><strong>Soft Skills:</strong> ${softSkills.join(', ')}</p>` : ''}
            </div>
          `
            : ''
        }

        <!-- IDIOMAS -->
        ${
          languages.length > 0
            ? `
            <div>
              <h3 style="font-size: 11pt; font-weight: bold; color: ${primaryColor}; text-transform: uppercase; border-bottom: 1pt solid #cbd5e1; padding-bottom: 2pt; margin: 0 0 6pt 0;">
                Idiomas
              </h3>
              <p style="font-size: 9.5pt; margin: 0;">
                ${languages.map((l) => `${l.language} (${l.level})`).join(', ')}
              </p>
            </div>
          `
            : ''
        }
      </div>
    `;
  }

  const documentHtml = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset="utf-8">
      <title>${fullName}</title>
      <!--[if gte mso 9]>
      <xml>
        <w:WordDocument>
          <w:View>Print</w:View>
          <w:Zoom>100</w:Zoom>
          <w:DoNotOptimizeForBrowser/>
          <w:AllowPNG/>
        </w:WordDocument>
      </xml>
      <![endif]-->
      <style>
        ${pageMarginsCss}
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          color: #1e293b;
          background-color: #ffffff;
        }
        table {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        p, li {
          margin-top: 0;
        }
      </style>
    </head>
    <body>
      ${bodyContent}
    </body>
    </html>
  `;

  const blob = new Blob(['\ufeff' + documentHtml], { type: 'application/msword' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;

  const safeName = fullName
    .trim()
    .replace(/[^a-zA-Z0-9À-ÿ]/g, '_')
    .replace(/_+/g, '_');

  const suffix =
    format === 'sidebar'
      ? 'Coluna_Lateral'
      : format === 'modern'
      ? 'Moderno'
      : 'Classico_ATS_Margem2_5cm';

  a.download = `Curriculo_${safeName || 'Profissional'}_${suffix}.doc`;

  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
    URL.revokeObjectURL(url);
  }, 1000);
}

