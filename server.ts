import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy initialization for Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  const hasKey = Boolean(process.env.GEMINI_API_KEY);
  res.json({
    status: 'ok',
    aiOnline: hasKey,
    mode: hasKey ? 'Gemini AI + Banco LinkedIn Híbrido' : 'Assistente Base LinkedIn (Offline Ready)'
  });
});

// Helper de Fallback Especializado para funções operacionais ou gerais quando a IA externa não estiver disponível
function buildLocalRoleTemplate(roleName: string, areaName?: string) {
  const cleanRole = roleName.trim() || 'Serviços Gerais';
  const lower = cleanRole.toLowerCase();

  // Detecção de nicho para fallback rico
  let detectedArea = areaName || 'Operações, Serviços & Manutenção';
  let headlines = [
    `${cleanRole} | Organização, Pontualidade & Eficiência Operacional | Foco em Qualidade`,
    `${cleanRole} | Experiência Prática, Trabalho em Equipe & Melhoria Contínua`,
    `Profissional de ${cleanRole} | Responsabilidade, Agilidade & Excelência no Atendimento`
  ];
  let summaries = [
    `Profissional dedicado(a) atuando como ${cleanRole}, com sólida experiência na execução de rotinas práticas, organização e cumprimento rigoroso de padrões de qualidade e segurança. Comprometido(a) com a pontualidade, trabalho em equipe e entrega de resultados de alto impacto.`,
    `${cleanRole} responsável e dinâmico(a), com facilidade para aprender novos métodos e ferramentas de trabalho. Reconhecido(a) pela postura colaborativa, atenção aos detalhes e foco constante na satisfação de gestores e clientes.`
  ];
  let experienceBullets = [
    `Executei com pontualidade e rigor as atividades rotineiras de ${cleanRole}, garantindo ambientes e processos 100% organizados.`,
    `Controlei a utilização de insumos e ferramentas de trabalho, reduzindo desperdícios em 20% e otimizando o fluxo diário.`,
    `Atuei em equipe colaborando ativamente na resolução ágil de demandas operacionais e atendimento às solicitações da gestão.`,
    `Segui rigorosamente as normas de segurança do trabalho e conservação preventiva dos equipamentos utilizados.`
  ];
  let hardSkills = [
    'Rotinas Operacionais e Procedimentos Padrão',
    'Organização e Controle de Materiais',
    'Normas de Segurança e Uso de EPIs',
    'Conservação Preventiva de Ferramentas',
    'Atendimento e Suporte a Demandas Rápidas',
    'Registro de Atividades e Checklist Diário'
  ];
  let softSkills = [
    'Pontualidade e Assiduidade',
    'Trabalho em Equipe e Cooperação',
    'Atenção Concentrada aos Detalhes',
    'Proatividade e Disposição',
    'Comunicação Clara e Respeitosa'
  ];
  let certifications = [
    `Curso Prático de Qualificação Profissional em ${cleanRole} — SENAI`,
    'Treinamento de Normas de Segurança e Uso de EPIs (NR-06)',
    'Atendimento ao Cliente e Relações Humanas no Trabalho',
    'Boas Práticas de Organização 5S'
  ];

  if (lower.includes('serviço') || lower.includes('limpeza') || lower.includes('conserva') || lower.includes('zelador') || lower.includes('gerais')) {
    detectedArea = 'Conservação, Limpeza & Zeladoria';
    headlines = [
      `${cleanRole} | Higienização de Ambientes, Organização & Manutenção Básica | Pontualidade & Agilidade`,
      `${cleanRole} | Cuidados Sanitários, Controle de Insumos & Boas Práticas | Foco em Segurança`,
      `Auxiliar de ${cleanRole} | Dedicação, Agilidade Operacional & Rigor com Normas de Higiene`
    ];
    summaries = [
      `Profissional atuante como ${cleanRole}, com ampla experiência em higienização, conservação predial e organização de ambientes comerciais e residenciais. Habilidade no manuseio de produtos e equipamentos de limpeza, seguindo rigorosamente os padrões de segurança e normas sanitárias.`,
      `${cleanRole} com histórico de assiduidade, responsabilidade e postura ética. Foco na manutenção de espaços limpos, organizados e acolhedores, além de suporte proativo às necessidades cotidianas da empresa.`
    ];
    experienceBullets = [
      'Realizei higienização e desinfecção completa de salas, corredores, sanitários e áreas comuns com 100% de conformidade às normas sanitárias.',
      'Controlei o estoque diário de materiais de limpeza e higiene, evitando desabastecimentos e reduzindo o consumo de produtos químicos.',
      'Auxiliei na organização e pequenos reparos preventivos das instalações prediais, garantindo a conservação do patrimônio.',
      'Utilizei corretamente todos os Equipamentos de Proteção Individual (EPIs), mantendo índice zero de acidentes de trabalho.'
    ];
    hardSkills = [
      'Higienização e Desinfecção Profissional',
      'Uso Correto de EPIs (NR-06)',
      'Manuseio Seguro de Produtos Químicos',
      'Conservação e Limpeza Predial',
      'Coleta Seletiva e Descarte Sustentável',
      'Controle de Estoque de Materiais de Limpeza',
      'Organização de Ambientes (Método 5S)'
    ];
    softSkills = [
      'Atenção às Normas de Higiene',
      'Pontualidade e Responsabilidade',
      'Agilidade e Disposição Física',
      'Trabalho em Equipe e Cooperação',
      'Discrição e Confiabilidade'
    ];
    certifications = [
      'Boas Práticas de Limpeza e Higienização Predial — SENAI',
      'NR-06 — Treinamento de Equipamentos de Proteção Individual',
      'Descarte Consciente de Resíduos e Coleta Seletiva',
      'Primeiros Socorros no Ambiente de Trabalho'
    ];
  }

  const linkedinAbout = `Olá! Sou profissional na área de ${cleanRole} com paixão por manter a excelência operacional, disciplina e colaboração diária.

Tenho sólida experiência no cumprimento de rotinas práticas, cuidado com o ambiente e respeito às normas de segurança do trabalho. Me destaco pela pontualidade, disposição para aprender e facilidade para me integrar a qualquer equipe.

Principais competências:
🎯 Execução ágil de rotinas operacionais
🛠️ Uso consciente de materiais e ferramentas
🤝 Trabalho em equipe, respeito e cordialidade
🛡️ Segurança no trabalho e prevenção de riscos

Estou disponível para novas oportunidades de trabalho. Vamos conversar?`;

  return {
    id: `role-local-${Date.now()}`,
    roleName: cleanRole,
    area: detectedArea,
    description: `Atuação profissional voltada para ${cleanRole}, com foco em disciplina, qualidade técnica e suporte operacional constante.`,
    headlines,
    summaries,
    experienceBullets,
    hardSkills,
    softSkills,
    certifications,
    linkedinAbout,
    commonKeywords: [cleanRole, 'Operações', 'Segurança', 'Pontualidade', 'Eficiência', 'Qualidade', 'SENAI'],
    stepTips: {
      1: `Para ${cleanRole}, o modelo visual mais recomendado é o "Clássico ATS" ou "Coluna Lateral", com paletas neutras como Azul Corporativo ou Cinza Grafite.`,
      2: `No título profissional, combine "${cleanRole}" com suas especialidades (ex: ${headlines[0]}).`,
      3: `No resumo, mostre sua dedicação, pontualidade e os tipos de tarefas práticas que você realiza com maior agilidade.`,
      4: `Na experiência, use verbos de ação para descrever suas atividades (ex: "Executei", "Organizei", "Higienizei", "Controlei").`,
      5: `Cursos do SENAI e certificados como NR-06 trazem enorme destaque para quem atua como ${cleanRole}.`,
      6: `Liste tanto suas habilidades manuais/técnicas quanto suas qualidades de pontualidade e trabalho em equipe.`,
      7: `O texto de apresentação do LinkedIn deve ser amigável e destacar sua disposição para trabalhar.`
    },
    isAiGenerated: false
  };
}

// NOVO ENDPOINT: Gera dinamicamente um template completo para QUALQUER cargo adicionado manualmente
app.post('/api/generate-role-template', async (req: Request, res: Response) => {
  const { roleName, area } = req.body;

  if (!roleName || typeof roleName !== 'string' || !roleName.trim()) {
    return res.status(400).json({ error: 'Nome do cargo é obrigatório' });
  }

  const cleanRole = roleName.trim();

  try {
    const ai = getGeminiClient();

    if (!ai) {
      const localTemplate = buildLocalRoleTemplate(cleanRole, area);
      return res.json({
        success: true,
        source: 'local_database',
        template: localTemplate
      });
    }

    const systemInstruction = `Você é um Consultor Sênior de Carreira, Recrutador e Especialista em Perfis LinkedIn e sistemas ATS do mercado brasileiro.
Sua missão é gerar um conjunto completo, rico, prático e 100% sob medida de exemplos prontos e dicas de currículo para o cargo especificado pelo usuário (seja ele um cargo operacional como "Serviços Gerais", "Porteiro", "Auxiliar de Cozinha", técnico como "Mecânico Industrial" ou corporativo).
Diretrizes:
- Escreva em Português do Brasil de forma clara, motivadora e profissional.
- Títulos (headlines): gere 3 opções de títulos de alto impacto.
- Resumos (summaries): gere 3 opções de resumos profissionais de 3 a 5 linhas em primeira pessoa.
- Experiências (experienceBullets): gere 4 tópicos com verbos de ação e métricas realistas.
- Habilidades técnicas (hardSkills): 6 a 8 ferramentas, normas ou tarefas práticas reais desta profissão.
- Habilidades comportamentais (softSkills): 5 qualidades interpessoais valorizadas na área.
- Cursos/Certificados (certifications): 4 cursos práticos do SENAI ou certificações do mercado brasileiro.
- linkedinAbout: texto completo em primeira pessoa para a seção "Sobre" do LinkedIn.
- stepTips: dicas curtas e práticas personalizadas para cada etapa (step1 a step7) para esse cargo.`;

    const userPrompt = `Gere o template completo de currículo e LinkedIn para o cargo: "${cleanRole}" ${area ? `na área de "${area}"` : ''}.
Seja extremamente fiel à realidade prática dessa profissão no Brasil.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roleName: { type: Type.STRING },
            area: { type: Type.STRING },
            description: { type: Type.STRING },
            headlines: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 opções de títulos profissionais para o cabeçalho'
            },
            summaries: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3 modelos de resumos profissionais prontos'
            },
            experienceBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '4 marcadores de atividades e conquistas na experiência'
            },
            hardSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '6 a 8 competências práticas e ferramentas'
            },
            softSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '5 qualidades de relacionamento e atitude'
            },
            certifications: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '4 cursos do SENAI ou certificações recomendadas'
            },
            linkedinAbout: { type: Type.STRING, description: 'Texto de apresentação para o LinkedIn' },
            commonKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '6 a 10 termos mais pesquisados pelos recrutadores para este cargo'
            },
            stepTips: {
              type: Type.OBJECT,
              properties: {
                step1: { type: Type.STRING },
                step2: { type: Type.STRING },
                step3: { type: Type.STRING },
                step4: { type: Type.STRING },
                step5: { type: Type.STRING },
                step6: { type: Type.STRING },
                step7: { type: Type.STRING },
              }
            }
          },
          required: [
            'roleName',
            'area',
            'description',
            'headlines',
            'summaries',
            'experienceBullets',
            'hardSkills',
            'softSkills',
            'certifications',
            'linkedinAbout',
            'commonKeywords'
          ]
        }
      }
    });

    const text = response.text?.trim() || '';
    if (text) {
      const parsed = JSON.parse(text);
      const stepTipsNumeric: Record<number, string> = {};
      if (parsed.stepTips) {
        if (parsed.stepTips.step1) stepTipsNumeric[1] = parsed.stepTips.step1;
        if (parsed.stepTips.step2) stepTipsNumeric[2] = parsed.stepTips.step2;
        if (parsed.stepTips.step3) stepTipsNumeric[3] = parsed.stepTips.step3;
        if (parsed.stepTips.step4) stepTipsNumeric[4] = parsed.stepTips.step4;
        if (parsed.stepTips.step5) stepTipsNumeric[5] = parsed.stepTips.step5;
        if (parsed.stepTips.step6) stepTipsNumeric[6] = parsed.stepTips.step6;
        if (parsed.stepTips.step7) stepTipsNumeric[7] = parsed.stepTips.step7;
      }

      const generatedTemplate = {
        id: `role-ai-${Date.now()}`,
        roleName: parsed.roleName || cleanRole,
        area: parsed.area || area || 'Área Profissional',
        description: parsed.description || `Atuação focada em ${cleanRole}.`,
        headlines: parsed.headlines && parsed.headlines.length > 0 ? parsed.headlines : [`${cleanRole} | Profissional Qualificado`],
        summaries: parsed.summaries && parsed.summaries.length > 0 ? parsed.summaries : [`Profissional atuante como ${cleanRole}.`],
        experienceBullets: parsed.experienceBullets && parsed.experienceBullets.length > 0 ? parsed.experienceBullets : ['• Atividades práticas da área.'],
        hardSkills: parsed.hardSkills && parsed.hardSkills.length > 0 ? parsed.hardSkills : ['Organização', 'Comunicação'],
        softSkills: parsed.softSkills && parsed.softSkills.length > 0 ? parsed.softSkills : ['Trabalho em Equipe'],
        certifications: parsed.certifications && parsed.certifications.length > 0 ? parsed.certifications : ['Formação Técnica'],
        linkedinAbout: parsed.linkedinAbout || '',
        commonKeywords: parsed.commonKeywords && parsed.commonKeywords.length > 0 ? parsed.commonKeywords : [cleanRole],
        stepTips: stepTipsNumeric,
        isAiGenerated: true
      };

      return res.json({
        success: true,
        source: 'gemini_ai',
        template: generatedTemplate
      });
    }

    throw new Error('Resposta vazia da IA');

  } catch (error: any) {
    console.warn('Erro ao gerar template com Gemini (ativando fallback local):', error?.message || error);
    const localTemplate = buildLocalRoleTemplate(cleanRole, area);
    return res.json({
      success: true,
      source: 'local_database_fallback',
      template: localTemplate,
      note: 'Template sob medida gerado pelo banco integrado.'
    });
  }
});

// NOVO ENDPOINT: Chatbot Multi-Turn Gemini para Mentoria de Carreira e Dúvidas
app.post('/api/chat', async (req: Request, res: Response) => {
  const { messages, targetRole, step, candidateContext } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Nenhuma mensagem enviada.' });
  }

  const roleText = targetRole || 'Profissional';
  const stepText = step ? `Etapa atual do preenchimento: Passo ${step}.` : '';

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Fallback amigável
      return res.json({
        success: true,
        reply: `Como mentor de carreira, recomendo que para a vaga de **${roleText}**, você destaque suas experiências práticas, pontualidade e facilidade de aprender. No passo atual, verifique se todos os campos estão objetivos e sem gírias. Como posso te orientar especificamente com seus textos?`
      });
    }

    const systemInstruction = `Você é o Mentor Virtual de Carreira, Recrutador Sênior e Especialista em Currículos e LinkedIn do Connect Currículo AI.
Você ajuda o candidato brasileiro em tempo real, respondendo a dúvidas, sugerindo textos prontos de impacto, simulações de entrevistas e melhorias no currículo.
Informações do Candidato:
- Cargo Alvo Pretendido: ${roleText}
- ${stepText}
- Dados atuais: ${candidateContext ? JSON.stringify(candidateContext) : 'Em preenchimento'}

Diretrizes:
- Responda em Português do Brasil com tom acolhedor, profissional, motivador e muito prático.
- Para qualquer cargo, seja ele Serviços Gerais, Portaria, Mecânica, Enfermagem, Administrativo ou TI, adapte totalmente suas dicas à realidade dessa profissão.
- Se o usuário pedir para escrever um resumo, headline ou experiência, entregue o texto formatado e pronto para copiar, sem enrolação.
- Mantenha respostas concisas, escaneáveis (use tópicos e negrito) e fáceis de ler no celular.`;

    // Converte histórico multi-turn para a estrutura contents do @google/genai
    const contents = messages.map((m: any) => ({
      role: m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || m.text || '' }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    const reply = response.text?.trim() || 'Estou aqui para ajudar. Pode refazer sua pergunta com detalhes do que precisa para o seu currículo?';

    return res.json({
      success: true,
      reply
    });

  } catch (error: any) {
    console.warn('Erro no Chatbot Gemini:', error?.message || error);
    return res.json({
      success: true,
      reply: `Para a função de **${roleText}**, o segredo é demonstrar comprometimento, atenção às normas da empresa e colaboração com a equipe. Na sua etapa atual, procure escrever frases curtas e diretas. Se precisar de uma sugestão de frase específica, me diga qual atividade você gostaria de descrever!`
    });
  }
});

// NOVO ENDPOINT: Geração de Dica da IA Dinâmica e Exclusiva para o Cargo e Etapa
app.post('/api/ai-tip', async (req: Request, res: Response) => {
  const { roleName, area, step = 1, candidateContext, angle = 0 } = req.body;
  const cleanRole = (roleName && typeof roleName === 'string' && roleName.trim()) ? roleName.trim() : 'Profissional';
  const cleanArea = area || 'Mercado Geral';
  const stepNum = Number(step) || 1;

  // Temas / Ângulos para garantir que cada clique em "Consultar Outra Dica" gere uma perspectiva totalmente nova
  const anglesDescription = [
    'Perspectiva 1: Diferencial Competitivo & Conquistas que impressionam recrutadores em 6 segundos',
    'Perspectiva 2: Otimização para Robôs ATS (Gupy, Kenoby, LinkedIn) e Palavras-Chave Técnicas cruciais',
    'Perspectiva 3: Métricas Quantificáveis, Verbos de Alta Autoridade e Redução de Custos/Erros',
    'Perspectiva 4: Tendências do Mercado Brasileiro em 2026, Inovações Tecnológicas e Normas Técnicas/Segurança',
    'Perspectiva 5: Postura Comportamental (Soft Skills), Storytelling Profissional e Trabalho em Equipe'
  ];
  const selectedAngle = anglesDescription[Math.abs(Number(angle)) % anglesDescription.length];

  // Instruções específicas por etapa do currículo
  const stepDirectives: Record<number, { focus: string; targetField: string; exampleHelp: string }> = {
    1: {
      focus: 'Escolha do Modelo Visual (Clássico ATS vs Coluna Lateral vs Moderno), paleta de cores corporativas sóbrias, uso estratégico de foto profissional e regras de escaneabilidade em 1 página.',
      targetField: 'copyText',
      exampleHelp: 'Uma recomendação objetiva e pronta sobre como configurar o design para esta profissão.'
    },
    2: {
      focus: 'Título Profissional (Headline) e posicionamento imediato. Como destacar o cargo exato no topo combinado com especialidades técnicas e valor agregado, sem termos genéricos.',
      targetField: 'roleHeadline',
      exampleHelp: 'Um título profissional (headline) completo e inédito para o topo do currículo no padrão LinkedIn/ATS.'
    },
    3: {
      focus: 'Resumo Profissional / Perfil executivo. Como abrir com um gancho forte, resumir anos de dedicação ou experiência prática, ferramentas dominadas e compromisso com resultados.',
      targetField: 'summary',
      exampleHelp: 'Um resumo profissional completo de 3 a 5 linhas em primeira pessoa pronto para aplicar no currículo.'
    },
    4: {
      focus: 'Experiência Profissional e fórmula Ação + Contexto + Resultado Mensurável. Como transformar tarefas corriqueiras em realizações impactantes com números e verbos no passado.',
      targetField: 'appendExperienceBullet',
      exampleHelp: 'Um marcador (bullet point) de experiência inédito, com números/métricas realistas e verbo de ação forte para esta função.'
    },
    5: {
      focus: 'Formação Acadêmica, Cursos Profissionalizantes (SENAI), Treinamentos Técnicos e Normas Regulamentadoras (NRs) mais exigidas por contratantes brasileiros.',
      targetField: 'addCertification',
      exampleHelp: 'O nome de 1 curso técnico ou certificado de alto impacto e relevância real para esta profissão.'
    },
    6: {
      focus: 'Competências Técnicas (Hard Skills) e Palavras-Chave de triagem automatizada (filtros ATS) mais procuradas por recrutadores nesta área.',
      targetField: 'addHardSkill',
      exampleHelp: 'Uma competência técnica estratégica ou ferramenta essencial para adicionar à lista de habilidades.'
    },
    7: {
      focus: 'Finalização, Revisão de Pontuação ATS e Otimização do Perfil LinkedIn ou Carta de Apresentação para atrair abordagens de recrutadores.',
      targetField: 'copyText',
      exampleHelp: 'Um parágrafo de apresentação de impacto para a seção "Sobre" do LinkedIn ou mensagem de abordagem para o recrutador.'
    }
  };

  const currentDirective = stepDirectives[stepNum] || stepDirectives[1];

  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = `Você é um Consultor Sênior de Carreira, Recrutador Especialista em ATS e Inteligência Artificial de Talentos no Brasil.
Sua missão é fornecer uma recomendação EXCLUSIVA, INÉDITA e PROFUNDAMENTE PERSONALIZADA para o candidato que está preenchendo seu currículo para o cargo: "${cleanRole}" (${cleanArea}).
IMPORTANTE:
- Não repita exemplos genéricos ou estáticos. Crie algo original para este cargo sob o ângulo: ${selectedAngle}.
- A dica e o snippet sugerido DEVEM se adequar estritamente ao comando da Etapa ${stepNum}: ${currentDirective.focus}.
- O campo 'actionableSnippet' DEVE conter: ${currentDirective.exampleHelp}. Deve estar pronto para o candidato inserir no currículo com 1 clique.
- Responda em Português do Brasil com tom encorajador, técnico e de altíssimo nível profissional.`;

      const promptText = `Gere uma nova orientação estratégica de IA para o cargo "${cleanRole}" na Etapa ${stepNum} do currículo.
Ângulo de abordagem: ${selectedAngle}.
${candidateContext?.nome ? `Nome do candidato: ${candidateContext.nome}` : ''}
${candidateContext?.resumo ? `Resumo atual do candidato: ${candidateContext.resumo}` : ''}
${candidateContext?.experiencia ? `Experiências atuais: ${candidateContext.experiencia}` : ''}

Apresente a resposta estritamente no formato JSON solicitado.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.8,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: 'Título curto e de alto impacto da recomendação da IA'
              },
              content: {
                type: Type.STRING,
                description: 'Orientação consultiva detalhada, prática e inspiradora (2 a 4 frases)'
              },
              tag: {
                type: Type.STRING,
                description: 'Tag de categoria (ex: Filtros ATS, Verbos de Ação, Destaque Técnico, Estratégia de Mercado)'
              },
              actionableSnippet: {
                type: Type.STRING,
                description: currentDirective.exampleHelp
              },
              targetField: {
                type: Type.STRING,
                description: `Deve ser '${currentDirective.targetField}'`
              }
            },
            required: ['title', 'content', 'tag', 'actionableSnippet', 'targetField']
          }
        }
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({
          success: true,
          source: 'gemini_ai_realtime',
          tip: {
            id: `ai-live-${Date.now()}`,
            title: parsed.title || `Estratégia de IA para ${cleanRole}`,
            content: parsed.content || `Recomendação estratégica focada em valorizar suas competências como ${cleanRole}.`,
            tag: parsed.tag || 'Inteligência Artificial',
            actionableSnippet: parsed.actionableSnippet || null,
            targetField: parsed.targetField || currentDirective.targetField
          }
        });
      }
    }
  } catch (error: any) {
    console.warn('Falha ou cota no Gemini para /api/ai-tip (ativando gerador dinâmico sob medida):', error?.message || error);
  }

  // Fallback Dinâmico Rico Especializado por Cargo e Ângulo (garante que NUNCA falhe e seja sob medida com variedade real)
  const fallbackTipsByStep: Record<number, any[]> = {
    1: [
      {
        title: `Design e Legibilidade Estratégica para ${cleanRole}`,
        content: `Para funções em ${cleanArea}, recrutadores buscam objetividade e clareza visual imediata. O modelo "Coluna Lateral" destaca suas informações de contato e competências práticas ao lado do histórico, enquanto o modelo "Clássico ATS" é a escolha perfeita se a vaga for em portais com leitura automatizada (Gupy/Kenoby).`,
        tag: 'Design & ATS',
        actionableSnippet: `Modelo Recomendado para ${cleanRole}: Coluna Lateral ou Clássico ATS em tons de Azul Corporativo ou Cinza Grafite, estruturado estritamente em 1 página.`,
        targetField: 'copyText'
      },
      {
        title: `Paleta Corporativa de Alta Credibilidade para ${cleanRole}`,
        content: `Cores frias e sóbrias como Azul Marinho, Cinza Escuro ou Verde Floresta comunicam confiabilidade, disciplina e maturidade profissional. Evite excesso de elementos visuais coloridos que possam prejudicar a legibilidade em impressões preto e branco.`,
        tag: 'Identidade Visual',
        actionableSnippet: `Dica de Cor: Escolha a paleta "Azul Corporativo" ou "Verde Floresta" para transmitir solidez e equilíbrio visual.`,
        targetField: 'copyText'
      },
      {
        title: `Economia de Espaço e Currículo em 1 Página para ${cleanRole}`,
        content: `Mantenha seu currículo em 1 página única. Recrutadores levam menos de 10 segundos na primeira triagem e currículos enxutos com espaçamento equilibrado têm o dobro de taxa de resposta.`,
        tag: 'Escaneabilidade',
        actionableSnippet: `Estrutura de 1 página: 3 experiências mais recentes, resumo de 3 linhas e até 8 competências principais.`,
        targetField: 'copyText'
      },
      {
        title: `Critérios para Foto Profissional de ${cleanRole}`,
        content: `Se optar por foto, utilize enquadramento do busto para cima, camisa de cor sólida, iluminação frontal e fundo claro e limpo. Transmita postura acolhedora e confiável.`,
        tag: 'Apresentação Pessoal',
        actionableSnippet: `Foto Recomendada: Fundo neutro, iluminação suave, postura ereta e sorriso profissional receptivo.`,
        targetField: 'copyText'
      },
      {
        title: `Hierarquia Visual Sem Ruídos Técnicos`,
        content: `O uso de negritos estratégicos nos nomes dos cargos e datas facilita a leitura dinâmica pelos selecionadores de Recursos Humanos.`,
        tag: 'Tipografia & Leitura',
        actionableSnippet: `Hierarquia: Nomes de cargos e empresas em destaque com marcadores de tópicos bem definidos.`,
        targetField: 'copyText'
      },
      {
        title: `Contraste Perfeito para Impressão em Papel A4`,
        content: `Como agências e empresas costumam imprimir em impressoras laser monocromáticas, alto contraste entre textos e fundo branco é indispensável.`,
        tag: 'Qualidade de Impressão',
        actionableSnippet: `Contraste máximo: texto grafite escuro sobre fundo 100% branco para legibilidade impecável.`,
        targetField: 'copyText'
      }
    ],
    2: [
      {
        title: `Headline Focado em Produtividade e Agilidade para ${cleanRole}`,
        content: `O título no topo do currículo é a primeira informação lida pelo recrutador. Combine seu cargo com atitudes práticas de produtividade para destacar sua proatividade.`,
        tag: 'Produtividade & Foco',
        actionableSnippet: `${cleanRole} | Produtividade Operacional, Cumprimento de Metas & Alta Eficiência`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline com Ênfase em Segurança, Qualidade e Procedimentos (POP)`,
        content: `Recrutadores de grandes empresas buscam profissionais que conheçam Procedimentos Operacionais Padrão e zelem pela integridade física e normas da empresa.`,
        tag: 'Qualidade & Normas',
        actionableSnippet: `Profissional de ${cleanRole} | Padrões de Qualidade, Procedimentos Operacionais (POP) & Segurança`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline Focado em Organização, Método e Pontualidade`,
        content: `Ideal para posições onde a assiduidade e o zelo com materiais e instalações fazem a diferença imediata na operação diária.`,
        tag: 'Disciplina & Rotina',
        actionableSnippet: `${cleanRole} | Organização de Ambientes, Assiduidade Rigorosa & Disciplina no Trabalho`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline Voltado para Início de Carreira ou Transição`,
        content: `Se está iniciando ou migrando para ${cleanRole}, evidencie sua rápida capacidade de aprender e dedicação integral.`,
        tag: 'Transição / Início',
        actionableSnippet: `Candidato a ${cleanRole} | Aprendizado Rápido, Dedicação Integral & Facilidade com Rotinas Práticas`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline com Foco em Atendimento, Cordialidade e Relações Humanas`,
        content: `Se sua função lida com público ou colegas de outros setores, destaque espírito cooperativo e empatia.`,
        tag: 'Atendimento & Empatia',
        actionableSnippet: `${cleanRole} | Cordialidade no Atendimento, Cooperação em Equipe & Comunicação Clara`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline Focado em Resolução Prática de Problemas e Autonomia`,
        content: `Valorize sua prontidão para lidar com imprevistos operacionais sem paralisar as atividades da empresa.`,
        tag: 'Agilidade & Autonomia',
        actionableSnippet: `${cleanRole} | Resolução Prática de Problemas, Agilidade em Demandas Rápidas & Proatividade`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline Especialista em Ferramentas e Controle de Insumos`,
        content: `Chame a atenção dos recrutadores mostrando intimidade com os instrumentos e checklists do setor.`,
        tag: 'Habilidade Prática',
        actionableSnippet: `${cleanRole} Especializado | Controle de Materiais, Manuseio de Ferramentas & Rotinas Técnicas`,
        targetField: 'roleHeadline'
      },
      {
        title: `Headline Focado em Redução de Desperdícios e Cuidado Patrimonial`,
        content: `Demonstra maturidade profissional ao sinalizar consciência de economia e zelo com o patrimônio do empregador.`,
        tag: 'Economia & Sustentabilidade',
        actionableSnippet: `Profissional de ${cleanRole} | Otimização de Insumos, Redução de Desperdícios & Cuidado Patrimonial`,
        targetField: 'roleHeadline'
      }
    ],
    3: [
      {
        title: `Resumo com Foco em Agilidade Operacional e Produtividade Contínua`,
        content: `Este modelo demonstra rapidez na execução de ordens de serviço, pontualidade britânica e capacidade de manter alto rendimento mesmo em horários de pico.`,
        tag: 'Alta Produtividade',
        actionableSnippet: `Profissional com sólida dedicação na função de ${cleanRole}, destacando-se pela rapidez na execução de atividades, disciplina e atenção aos detalhes operacionais. Comprometido(a) com a entrega de serviços com excelência, respeito aos horários e colaboração diária para o alcance dos objetivos da equipe.`,
        targetField: 'summary'
      },
      {
        title: `Resumo Focado em Disciplina, Assiduidade e Cumprimento de Normas`,
        content: `Focado em transmitir máxima segurança ao contratante: histórico de frequência impecável, seriedade e respeito absoluto às normas internas da organização.`,
        tag: 'Disciplina & Confiabilidade',
        actionableSnippet: `${cleanRole} responsável, assíduo(a) e com forte ética de trabalho. Possuo facilidade para seguir manuais de procedimentos, zelo com o patrimônio da empresa e postura cooperativa. Disponibilidade para horários flexíveis e comprometimento permanente com a harmonia no ambiente de trabalho.`,
        targetField: 'summary'
      },
      {
        title: `Resumo com Ênfase em Cuidado com Recursos e Segurança`,
        content: `Destaca o uso correto de equipamentos, preservação de materiais de trabalho e rigoroso cumprimento de normas de segurança e prevenção de acidentes.`,
        tag: 'Segurança & Cuidado',
        actionableSnippet: `Atuação prática como ${cleanRole} com foco permanente em conservação de materiais, controle de insumos e aplicação rigorosa das normas de higiene e segurança do trabalho. Perfil atento, organizado e com postura preventiva para evitar retrabalhos e desperdícios no setor.`,
        targetField: 'summary'
      },
      {
        title: `Resumo para Início de Carreira, Jovem Aprendiz ou Transição`,
        content: `Ideal para quem está começando na área: valoriza disposição física, facilidade para assimilar novos métodos operacionais e vontade genuína de crescer.`,
        tag: 'Primeiro Emprego / Transição',
        actionableSnippet: `Profissional em busca de oportunidade como ${cleanRole}, com forte motivação, energia e facilidade para aprender procedimentos operacionais e rotinas práticas. Comprometido(a) em cumprir ordens de serviço com pontualidade, respeitar a liderança e evoluir continuamente na empresa.`,
        targetField: 'summary'
      },
      {
        title: `Resumo Focado em Atendimento ao Cliente e Boa Comunicação`,
        content: `Perfeito se a vaga de ${cleanRole} envolver contato direto com o público, clientes internos ou recepção de pessoas.`,
        tag: 'Atendimento & Relações Humanas',
        actionableSnippet: `${cleanRole} com facilidade de comunicação, postura gentil e foco total na satisfação de clientes e usuários. Experiência em acolher demandas com agilidade, solucionar dúvidas com cordialidade e manter um relacionamento saudável e cooperativo com colegas de todos os setores.`,
        targetField: 'summary'
      },
      {
        title: `Resumo Focado em Resolução Prática de Imprevistos e Autonomia`,
        content: `Demonstra que você é um(a) profissional resolutivo(a), que toma iniciativas conscientes para que o fluxo de trabalho nunca pare.`,
        tag: 'Autonomia & Prontidão',
        actionableSnippet: `Profissional de ${cleanRole} proativo(a) e dinâmico(a), com facilidade para identificar prioridades e solucionar imprevistos cotidianos com agilidade. Histórico de autonomia na execução de tarefas, relacionamento transparente com a supervisão e foco constante em melhoria contínua.`,
        targetField: 'summary'
      },
      {
        title: `Resumo com Ênfase em Metodologia 5S e Padronização`,
        content: `Chama a atenção de gerentes de operações ao demonstrar conhecimento de organização sistemática de ferramentas e ambientes.`,
        tag: 'Método 5S & Padronização',
        actionableSnippet: `Atuação profissional como ${cleanRole} orientada pela metodologia 5S e boas práticas de padronização. Habilidade em manter ferramentas organizadas, áreas limpas e estoques controlados, garantindo um ambiente produtivo, seguro e agradável para toda a equipe.`,
        targetField: 'summary'
      },
      {
        title: `Resumo Sênior para Histórico Prático Consolidado no Setor`,
        content: `Para quem já possui ampla bagagem prática na função e deseja destacar segurança, estabilidade e capacidade de treinar novos colegas.`,
        tag: 'Experiência Consolidada',
        actionableSnippet: `Profissional com trajetória consolidada na área de ${cleanRole}, dominando rotinas técnicas, procedimentos de manutenção e gestão de prioridades operacionais. Reconhecido(a) pela liderança pelo exemplo, maturidade no trato diário e capacidade de apoiar a integração de novos colaboradores.`,
        targetField: 'summary'
      }
    ],
    4: [
      {
        title: `Conquista com Redução de Desperdício e Otimização de Insumos`,
        content: `Demonstra responsabilidade com o orçamento da empresa e capacidade de gerenciar ferramentas e materiais sem desperdícios.`,
        tag: 'Economia & Eficiência',
        actionableSnippet: `• Otimizei a utilização de insumos e materiais de trabalho nas rotinas de ${cleanRole}, reduzindo perdas e retrabalhos em aproximadamente 15% ao longo do período.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Cumprimento Rigoroso de Prazos e Metas Diárias`,
        content: `Destaca assiduidade e capacidade de entregar 100% das demandas atribuídas pela liderança no tempo correto.`,
        tag: 'Cumprimento de Prazos',
        actionableSnippet: `• Cumpri com 100% de pontualidade os cronogramas e ordens de serviço diárias, garantindo a continuidade ininterrupta das operações do setor.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Implementação de Rotinas de Organização e Método 5S`,
        content: `Mostra que você transformou o espaço de trabalho em um local mais ágil, seguro e ordenado.`,
        tag: 'Organização 5S',
        actionableSnippet: `• Apliquei conceitos de organização 5S na conservação de ferramentas e armários de suprimentos, agilizando o acesso aos materiais necessários para a rotina diária.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Atendimento com Excelência e Agilidade nos Chamados`,
        content: `Valoriza a velocidade de resposta e a cordialidade no relacionamento com clientes e outros departamentos.`,
        tag: 'Atendimento & Rapidez',
        actionableSnippet: `• Atendi solicitações operacionais emergenciais com tempo médio de resposta reduzido, recebendo avaliações positivas de gestores e clientes internos.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Zero Acidentes e Conformidade com Normas de Segurança`,
        content: `Fundamental para funções práticas: atesta cuidado rigoroso com a integridade própria e dos companheiros de equipe.`,
        tag: 'Segurança & Zero Acidentes',
        actionableSnippet: `• Utilizei com rigor todos os Equipamentos de Proteção Individual (EPIs), mantendo índice zero de acidentes e conformidade estrita com normas regulamentadoras.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Apoio na Integração e Treinamento de Novos Colegas`,
        content: `Demonstra espírito de liderança pelo exemplo e disposição para transmitir procedimentos corretos da empresa.`,
        tag: 'Cooperação & Treinamento',
        actionableSnippet: `• Auxiliei a coordenação no acolhimento e repasse prático de rotinas básicas para novos colaboradores admitidos no setor de ${cleanRole}.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Controle Minucioso de Checklists e Relatórios Diários`,
        content: `Evidencia organização documental e garantia de que nenhum detalhe operacional passe despercebido.`,
        tag: 'Checklist & Controle',
        actionableSnippet: `• Realizei preenchimento diário de checklists operacionais e livros de ocorrência, assegurando transparência total na passagem de turno e controle de demandas.`,
        targetField: 'appendExperienceBullet'
      },
      {
        title: `Atuação sob Pressão em Períodos de Alto Volume`,
        content: `Mostra estabilidade emocional e foco para manter a qualidade mesmo durante picos de movimento.`,
        tag: 'Resiliência Operacional',
        actionableSnippet: `• Mantive alto padrão de qualidade e atenção concentrada durante períodos de pico e alta demanda, assegurando a entrega das tarefas sem ocorrência de falhas.`,
        targetField: 'appendExperienceBullet'
      }
    ],
    5: [
      {
        title: `Curso Profissionalizante Prático — SENAI`,
        content: `Cursos do SENAI são amplamente reconhecidos no mercado brasileiro como selo de qualidade operacional e disciplina técnica para ${cleanRole}.`,
        tag: 'Qualificação SENAI',
        actionableSnippet: `Curso Profissionalizante de Capacitação Prática em ${cleanRole} — SENAI`,
        targetField: 'addCertification'
      },
      {
        title: `Treinamento de Normas de Segurança e EPIs (NR-06)`,
        content: `Comprova que você tem conhecimento formal sobre o uso consciente de Equipamentos de Proteção Individual e preservação da saúde no trabalho.`,
        tag: 'Segurança do Trabalho',
        actionableSnippet: `Treinamento de Uso Correto e Conservação de EPIs (NR-06) — 8h`,
        targetField: 'addCertification'
      },
      {
        title: `Metodologia 5S e Boas Práticas Operacionais`,
        content: `Certificação valorizada em empresas que prezam por padronização, limpeza sistemática e eliminação de desperdícios.`,
        tag: 'Método 5S',
        actionableSnippet: `Capacitação em Metodologia 5S e Boas Práticas de Organização no Trabalho`,
        targetField: 'addCertification'
      },
      {
        title: `Atendimento ao Cliente e Relações Humanas no Trabalho`,
        content: `Destaque para profissionais que lidam com pessoas, colegas de outros setores ou público externo no dia a dia de ${cleanRole}.`,
        tag: 'Comunicação & Atendimento',
        actionableSnippet: `Atendimento ao Cliente, Cordialidade e Relações Interpessoais — SEBRAE/SENAC`,
        targetField: 'addCertification'
      },
      {
        title: `Noções de Primeiros Socorros e Prevenção de Sinistros`,
        content: `Agrega enorme valor ao currículo demonstrando que você está preparado para agir com calma diante de imprevistos ou emergências.`,
        tag: 'Prevenção & Emergência',
        actionableSnippet: `Noções Básicas de Primeiros Socorros e Prevenção de Acidentes de Trabalho`,
        targetField: 'addCertification'
      },
      {
        title: `Informática Básica e Ferramentas de Registro Digital`,
        content: `Indispensável mesmo para cargos operacionais, já que sistemas de ponto eletrônico, ordens de serviço e mensagens são digitais.`,
        tag: 'Tecnologia Básica',
        actionableSnippet: `Informática Básica (Windows, Navegação na Web e Preenchimento de Planilhas)`,
        targetField: 'addCertification'
      },
      {
        title: `Gestão de Rotinas e Procedimentos Operacionais Padrão (POP)`,
        content: `Demonstra familiaridade com a leitura e execução estrita de roteiros técnicos padronizados estabelecidos pela gerência.`,
        tag: 'Padronização Técnica',
        actionableSnippet: `Treinamento em Procedimentos Operacionais Padrão (POP) e Controle de Qualidade`,
        targetField: 'addCertification'
      },
      {
        title: `Comunicação Assertiva e Trabalho Colaborativo`,
        content: `Mostra inteligência emocional para evitar desentendimentos e fortalecer o trabalho conjunto na empresa.`,
        tag: 'Desenvolvimento Pessoal',
        actionableSnippet: `Comunicação Assertiva, Resolução de Conflitos e Trabalho em Equipe`,
        targetField: 'addCertification'
      }
    ],
    6: [
      {
        title: `Competência Técnica: Procedimentos Operacionais Padrão`,
        content: `Capacidade comprovada de seguir manuais de instruções e rotinas sem desvios de processo.`,
        tag: 'Hard Skill Estratégica',
        actionableSnippet: `Execução de Rotinas Técnicas e Procedimentos Operacionais Padrão (POP)`,
        targetField: 'addHardSkill'
      },
      {
        title: `Competência Técnica: Controle e Conservação de Insumos`,
        content: `Rastreamento de materiais, conferência de itens e manutenção preventiva de ferramentas.`,
        tag: 'Hard Skill Prática',
        actionableSnippet: `Controle de Insumos, Ferramentas e Conservação de Equipamentos`,
        targetField: 'addHardSkill'
      },
      {
        title: `Competência Técnica: Normas de Higiene e Segurança (EPIs)`,
        content: `Conhecimento prático das medidas de proteção e normas de segurança estabelecidas por lei.`,
        tag: 'Hard Skill Regulamentar',
        actionableSnippet: `Normas de Segurança do Trabalho e Utilização de EPIs (NR-06)`,
        targetField: 'addHardSkill'
      },
      {
        title: `Competência Técnica: Organização e Metodologia 5S`,
        content: `Habilidade em manter postos de trabalho ordenados e livres de materiais desnecessários.`,
        tag: 'Hard Skill Organizacional',
        actionableSnippet: `Organização de Ambientes de Trabalho e Aplicação do Método 5S`,
        targetField: 'addHardSkill'
      },
      {
        title: `Competência Técnica: Registro e Preenchimento de Checklists`,
        content: `Atenção no apontamento de ocorrências diárias e conferência detalhada de tarefas.`,
        tag: 'Hard Skill de Controle',
        actionableSnippet: `Preenchimento de Checklists Diários e Relatórios de Acompanhamento`,
        targetField: 'addHardSkill'
      },
      {
        title: `Competência Comportamental: Assiduidade e Pontualidade`,
        content: `A qualidade número 1 mais valorizada por gerentes operacionais em todo o Brasil.`,
        tag: 'Soft Skill Essencial',
        actionableSnippet: `Pontualidade Rigorosa, Assiduidade e Compromisso com Horários`,
        targetField: 'addSoftSkill'
      },
      {
        title: `Competência Comportamental: Cooperação e Trabalho em Equipe`,
        content: `Facilidade para manter um ambiente sadio e ajudar colegas em momentos de sobrecarga.`,
        tag: 'Soft Skill Interpessoal',
        actionableSnippet: `Trabalho em Equipe, Respeito e Postura Colaborativa`,
        targetField: 'addSoftSkill'
      },
      {
        title: `Competência Comportamental: Proatividade e Resolução Rápida`,
        content: `Iniciativa para resolver pendências sem esperar que pequenos problemas se agravem.`,
        tag: 'Soft Skill de Atitude',
        actionableSnippet: `Proatividade, Agilidade e Resolução Prática de Problemas`,
        targetField: 'addSoftSkill'
      }
    ],
    7: [
      {
        title: `Apresentação Estratégica para a Seção "Sobre" do LinkedIn`,
        content: `Texto completo e caloroso em primeira pessoa para seu perfil na rede profissional mais importante do mundo.`,
        tag: 'Perfil LinkedIn',
        actionableSnippet: `Olá! Sou profissional com atuação na área de ${cleanRole}, focado(a) em exercer minhas atividades com total disciplina, pontualidade e excelência prática.\n\nPossuo sólida vivência em rotinas operacionais, organização de materiais e cumprimento de normas de segurança. Me destaco pelo relacionamento colaborativo com a equipe e constante vontade de aprimorar meus conhecimentos.\n\nEstou disponível para novas oportunidades de trabalho. Vamos conversar?`,
        targetField: 'copyText'
      },
      {
        title: `Mensagem de Apresentação Educada para Envio do Currículo`,
        content: `Texto pronto para você colar no corpo do e-mail ou no WhatsApp ao se candidatar à vaga.`,
        tag: 'Abordagem de Recrutador',
        actionableSnippet: `Prezado(a) recrutador(a), encaminho em anexo meu currículo profissional para a vaga de ${cleanRole}. Possuo total disponibilidade de início e flexibilidade de horários. Agradeço desde já pela consideração e coloco-me à inteira disposição para entrevista. Atenciosamente.`,
        targetField: 'copyText'
      },
      {
        title: `Padronização de Nome do Arquivo PDF`,
        content: `Facilite a vida do selecionador renomeando o arquivo com seu nome e a função pretendida antes do envio.`,
        tag: 'Organização de Envio',
        actionableSnippet: `Curriculo_${cleanRole.replace(/\s+/g, '_')}.pdf`,
        targetField: 'copyText'
      },
      {
        title: `Verificação Final dos Dados de Contato`,
        content: `Revise com atenção se o número do celular com DDD possui WhatsApp ativo e se o e-mail não contém letras trocadas.`,
        tag: 'Revisão Crítica',
        actionableSnippet: `Confirme se o DDD e os 9 dígitos do WhatsApp estão atualizados e se o e-mail não possui caracteres invertidos.`,
        targetField: 'copyText'
      }
    ]
  };

  const pool = fallbackTipsByStep[stepNum] || fallbackTipsByStep[1];
  const selectedIndex = Math.abs(Number(angle)) % pool.length;
  const chosenFallback = pool[selectedIndex];

  return res.json({
    success: true,
    source: 'smart_dynamic_fallback',
    tip: {
      id: `ai-fallback-${Date.now()}-${selectedIndex}`,
      title: chosenFallback.title,
      content: chosenFallback.content,
      tip: chosenFallback.content,
      tag: chosenFallback.tag,
      actionableSnippet: chosenFallback.actionableSnippet,
      actionableInsight: chosenFallback.actionableSnippet,
      targetField: chosenFallback.targetField
    }
  });
});

// Endpoint principal do Assistente de IA & LinkedIn
app.post('/api/ai-assist', async (req: Request, res: Response) => {
  const { prompt, context, step, targetRole } = req.body;
  const currentRole = targetRole || context?.cargo || 'sua área de atuação';

  // Fallback inteligente para quando a API atinge limites de taxa (Rate Limit) ou chave ausente
  const fallbackByStep: Record<number, string> = {
    1: `Recomendação de Design para ${currentRole}: O modelo "Coluna Lateral" destaca foto, contato e competências técnicas em primeiro plano. Se for candidatar-se via plataformas de triagem automática (como Gupy), utilize o modelo "Clássico ATS".`,
    2: `${currentRole} | Especialista em Operações & Qualidade | Foco em Pontualidade e Resultados`,
    3: `Profissional dedicado e orientado a resultados na função de ${currentRole}, com sólida experiência em processos operacionais, atenção a normas de segurança e colaboração ativa em equipe. Reconhecido pelo comprometimento, assiduidade e constante vontade de aprender.`,
    4: `• Realizei com excelência as atividades diárias de ${currentRole}, cumprindo 100% dos prazos e padrões de qualidade.\n• Otimizei o uso de materiais e recursos de trabalho, evitando desperdícios e retrabalhos.\n• Colaborei proativamente com a equipe na resolução de desafios operacionais do setor.`,
    5: `Cursos recomendados para ${currentRole}: Formação Profissionalizante no SENAI, Treinamento de Normas de Segurança (NRs aplicáveis), Boas Práticas Operacionais e Comunicação Interpessoal.`,
    6: 'Organização e Método de Trabalho, Pontualidade e Assiduidade, Comunicação Respeitosa, Trabalho em Equipe, Resolução Prática de Problemas, Foco em Metas e Segurança',
    7: `Olá! Sou profissional com atuação como ${currentRole}, focado em desempenhar minhas atividades com máxima eficiência, disciplina e espírito de equipe.\n\nMinha trajetória é pautada pela honestidade, respeito aos colegas e busca contínua por aprimorar meus conhecimentos práticos.\n\nEstou disponível para novas oportunidades de trabalho. Vamos conversar?`
  };

  try {
    const ai = getGeminiClient();

    if (!ai) {
      // Sem chave: retorna diretamente o assistente do banco LinkedIn
      return res.json({
        success: true,
        source: 'linkedin_database',
        response: fallbackByStep[step] || 'Sugestão otimizada pronta para aplicação no currículo.',
        note: 'Gerado a partir do Banco de Dados Estratégico LinkedIn.'
      });
    }

    const systemInstruction = `Você é um Consultor Especialista de Carreira, Recrutador Sênior e Otimizador de Perfis no LinkedIn e ATS (Applicant Tracking Systems) brasileiro.
Seu objetivo é ajudar o candidato que está preenchendo o currículo na função de "${currentRole}" em cada etapa para que ele não sinta nenhuma dificuldade.
Diretrizes:
- Responda em Português do Brasil com tom encorajador, profissional, direto e conciso.
- Para títulos: gere no formato de headline de alto impacto do LinkedIn: "[Cargo] | [Especialidades/Tecnologias] | [Impacto/Resultados]".
- Para resumos: 3 a 5 linhas em primeira pessoa com gancho inicial, competências-chave e encerramento seguro.
- Para experiências: use a fórmula XYZ do LinkedIn/Google: "Ação realizada [Verbo de impacto] + Contexto/Ferramenta + Resultado alcançado ou métrica".
- Não adicione introduções vazias como "Com certeza, aqui está". Entregue diretamente o conteúdo pronto para o currículo.`;

    const userContent = `Etapa atual do currículo: Passo ${step}.
Contexto do candidato:
Nome: ${context?.nome || 'Candidato'}
Cargo Pretendido: ${currentRole}
Resumo Atual: ${context?.resumo || 'Vazio'}
Experiências Atuais: ${context?.experiencia || 'Vazio'}
Habilidades Atuais: ${context?.habilidades || 'Vazio'}

Solicitação do candidato:
${prompt}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userContent,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    const outputText = response.text?.trim() || fallbackByStep[step] || '';

    return res.json({
      success: true,
      source: 'gemini_ai',
      response: outputText,
    });

  } catch (error: any) {
    console.warn('Gemini API call throttled or failed (falling back to LinkedIn DB):', error?.message || error);
    // Em caso de limite de cota (429) ou qualquer erro, o assistente do banco LinkedIn entra em ação!
    return res.json({
      success: true,
      source: 'linkedin_database_fallback',
      response: fallbackByStep[step] || 'Sugestão otimizada pelo Banco Estratégico LinkedIn.',
      note: 'A API externa atingiu o limite temporário; o assistente ativou o Banco Estratégico LinkedIn sem interrupção.'
    });
  }
});

// NOVO ENDPOINT: Simulação e Perguntas de Entrevista da IA Personalizadas por Cargo
app.post('/api/ai-interview-prep', async (req: Request, res: Response) => {
  const { roleName, area } = req.body;
  const cleanRole = (roleName && typeof roleName === 'string' && roleName.trim()) ? roleName.trim() : 'Profissional';
  const cleanArea = area || 'Mercado Geral';

  try {
    const ai = getGeminiClient();

    if (ai) {
      const systemInstruction = `Você é um Recrutador Sênior e Especialista em Seleção e Entrevistas de Emprego no Brasil.
Sua missão é gerar 4 perguntas de entrevista extremamente realistas e específicas para a vaga de "${cleanRole}" (${cleanArea}), acompanhadas de respostas ideais no método STAR (Situação, Tarefa, Ação, Resultado) e dicas de como impressionar o entrevistador.`;

      const promptText = `Gere 4 perguntas de entrevista reais e estratégicas para o cargo de "${cleanRole}".
Inclua:
1. Uma pergunta técnica sobre rotinas diárias e ferramentas de "${cleanRole}".
2. Uma pergunta comportamental sobre resolução de conflitos, pressão ou prazos.
3. Uma pergunta sobre pontualidade, segurança no trabalho e normas da área.
4. Uma pergunta sobre por que o candidato quer atuar especificamente como "${cleanRole}".

Para cada pergunta, forneça a pergunta, o objetivo real do entrevistador, a resposta ideal no padrão STAR e uma dica de ouro de postura.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: promptText,
        config: {
          systemInstruction,
          temperature: 0.7,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              role: { type: Type.STRING },
              questions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    category: { type: Type.STRING },
                    recruiterGoal: { type: Type.STRING },
                    starAnswer: { type: Type.STRING },
                    proTip: { type: Type.STRING },
                    whatToAvoid: { type: Type.STRING }
                  },
                  required: ['id', 'question', 'category', 'recruiterGoal', 'starAnswer', 'proTip', 'whatToAvoid']
                }
              }
            },
            required: ['role', 'questions']
          }
        }
      });

      const text = response.text?.trim() || '';
      if (text) {
        const parsed = JSON.parse(text);
        return res.json({
          success: true,
          source: 'gemini_ai_interview',
          role: parsed.role || cleanRole,
          questions: parsed.questions || []
        });
      }
    }
  } catch (err: any) {
    console.warn('Fallback ativado para entrevista:', err?.message || err);
  }

  // Fallback Inteligente Especializado para qualquer cargo
  const questionsFallback = [
    {
      id: `int-1-${Date.now()}`,
      category: 'Rotina & Técnica',
      question: `Como você organiza e prioriza suas atividades diárias na função de ${cleanRole}?`,
      recruiterGoal: 'Verificar senso de urgência, método de organização, pontualidade e autonomia prática.',
      starAnswer: `Na minha rotina como ${cleanRole}, começo alinhando as prioridades com a liderança e verificando todos os equipamentos ou materiais necessários. Caso ocorra um imprevisto, mantenho a calma, reorganizo o fluxo por criticidade e concluo as tarefas mantendo 100% do padrão de qualidade exigido.`,
      proTip: 'Demonstre serenidade e fale com entusiasmo sobre suas rotinas de trabalho.',
      whatToAvoid: 'Dizer que faz tudo de qualquer jeito ou que precisa que o chefe mande em cada minuto do dia.'
    },
    {
      id: `int-2-${Date.now()}`,
      category: 'Desafios & Resiliência',
      question: `Conte uma situação em que você enfrentou um problema ou prazo apertado atuando como ${cleanRole}.`,
      recruiterGoal: 'Avaliar inteligência emocional, foco em soluções e capacidade de trabalhar sob pressão.',
      starAnswer: `Em uma entrega urgente, nossa equipe teve um desfalque inesperado. Assumi a responsabilidade de concentrar esforços nos pontos críticos, colaborei de perto com os colegas e garantimos que a demanda fosse entregue no prazo, com zero reclamações de clientes ou gestores.`,
      proTip: 'Use o método STAR: Contexto rápido, sua atitude prática e o resultado positivo obtido.',
      whatToAvoid: 'Culpar colegas antigos ou ex-chefes pelo problema ocorrido.'
    },
    {
      id: `int-3-${Date.now()}`,
      category: 'Segurança & Normas',
      question: `Qual é o seu cuidado com normas de segurança, uso de equipamentos e conservação de materiais na área de ${cleanRole}?`,
      recruiterGoal: 'Testar responsabilidade com a integridade física, respeito a normas (NRs) e zelo com o patrimônio da empresa.',
      starAnswer: `Considero a segurança e a disciplina inegociáveis. Sigo à risca todos os procedimentos operacionais padrão e normas de segurança, utilizo os equipamentos de proteção necessários e sempre realizo a conferência preventiva das ferramentas antes e depois do expediente.`,
      proTip: 'Mencione que a prevenção de acidentes e a economia de insumos são prioridades suas.',
      whatToAvoid: 'Dizer que normas atrasam o serviço ou que EPIs incomodam.'
    },
    {
      id: `int-4-${Date.now()}`,
      category: 'Motivação & Crescimento',
      question: `Por que você deseja trabalhar nesta oportunidade e o que te motiva a ser um(a) excelente ${cleanRole}?`,
      recruiterGoal: 'Entender sua motivação real, estabilidade esperada e vontade genuína de crescer na empresa.',
      starAnswer: `Tenho vocação e satisfação em atuar com excelência como ${cleanRole}. Busco uma empresa séria e consolidada como esta, onde eu possa aplicar minha dedicação diária, ser pontual e construir uma trajetória sólida de aprendizado contínuo e colaboração mútua.`,
      proTip: 'Olhe nos olhos do recrutador com firmeza e transmita segurança e disposição.',
      whatToAvoid: 'Responder que é apenas pelo salário ou porque não tinha outra opção disponível.'
    }
  ];

  return res.json({
    success: true,
    source: 'smart_interview_fallback',
    role: cleanRole,
    questions: questionsFallback
  });
});

// NOVO ENDPOINT: Auditor de ATS & Avaliador de Etapa com Inteligência Artificial
app.post('/api/ai-step-audit', async (req: Request, res: Response) => {
  const { step, roleName, candidateData } = req.body;
  const cleanRole = roleName || 'Profissional';
  const stepNum = Number(step) || 1;

  let auditScore = 85;
  let verdict = 'Bom Desempenho';
  let strengths: string[] = [];
  let improvements: string[] = [];
  let suggestedRewrite = '';

  if (stepNum === 2) {
    const hasName = Boolean(candidateData?.fullName && candidateData.fullName.trim().length > 3);
    const hasHeadline = Boolean(candidateData?.roleHeadline && candidateData.roleHeadline.trim().length > 4);
    const hasEmail = Boolean(candidateData?.email && candidateData.email.includes('@'));
    const hasPhone = Boolean(candidateData?.phone && candidateData.phone.length > 8);

    auditScore = (hasName ? 30 : 0) + (hasHeadline ? 35 : 10) + (hasEmail ? 20 : 0) + (hasPhone ? 15 : 0);
    verdict = auditScore >= 85 ? 'Excelente e Pronto para Triagem' : auditScore >= 60 ? 'Bom com Pequenos Ajustes' : 'Incompleto para Robôs ATS';

    strengths = [
      hasHeadline ? `Título profissional alinhado à vaga de ${cleanRole}` : 'Dados de contato presentes',
      hasEmail ? 'Canal direto de e-mail corporativo válido' : 'Identificação do candidato'
    ];
    improvements = [
      !hasHeadline ? `Adicione um título profissional claro com palavras-chave de ${cleanRole}` : 'Verifique se seu telefone possui DDD e WhatsApp ativo',
      'Inclua o link do seu perfil LinkedIn para triagem rápida dos recrutadores'
    ];
    suggestedRewrite = `${cleanRole} | Especialista em Rotinas Práticas | Pontualidade & Foco em Resultados`;
  } else if (stepNum === 3) {
    const sum = candidateData?.summary || '';
    const wordCount = sum.split(/\s+/).filter(Boolean).length;

    auditScore = wordCount >= 30 ? 95 : wordCount >= 15 ? 75 : 40;
    verdict = auditScore >= 85 ? 'Resumo de Alto Impacto' : 'Resumo Precisa de Mais Detalhes';

    strengths = [
      wordCount >= 20 ? 'Boa extensão de parágrafo sem prolixidade' : 'Texto inicial presente',
      sum.toLowerCase().includes(cleanRole.toLowerCase()) ? `Menciona o cargo alvo (${cleanRole}) diretamente` : 'Tom profissional'
    ];
    improvements = [
      wordCount < 25 ? 'Adicione mais 2 linhas destacando suas principais realizações e ferramentas de trabalho' : 'Enfatize sua facilidade em trabalhar em equipe',
      'Finalize o resumo expressando sua motivação para agregar resultados à nova empresa'
    ];
    suggestedRewrite = `Profissional dedicado(a) atuando como ${cleanRole}, com sólida experiência prática na execução de atividades com qualidade e rigor técnico. Reconhecido(a) pela pontualidade, facilidade de convivência em equipe e cumprimento exemplar de normas operacionais. Comprometido(a) em contribuir ativamente para os resultados e crescimento da organização.`;
  } else if (stepNum === 4) {
    const exps = candidateData?.experiences || [];
    const hasExp = exps.length > 0;
    const hasBullets = hasExp && exps.some((e: any) => e.description && e.description.includes('•'));

    auditScore = hasBullets ? 95 : hasExp ? 75 : 30;
    verdict = auditScore >= 85 ? 'Experiência Muito Bem Estruturada' : 'Adicione Resultados Quantitativos';

    strengths = [
      hasExp ? `${exps.length} experiência(s) informada(s) no histórico` : 'Início de preenchimento',
      hasBullets ? 'Uso correto de marcadores para escaneabilidade em 6 segundos' : 'Empresas e períodos identificados'
    ];
    improvements = [
      'Aplique a fórmula Ação + Ferramenta + Resultado em cada atividade',
      'Inclua números (ex: percentual de entregas no prazo, volume atendido ou redução de avarias)'
    ];
    suggestedRewrite = `• Conduzi com pontualidade e excelência as rotinas diárias de ${cleanRole}, garantindo 100% de conformidade com os procedimentos operacionais e padrões de segurança.\n• Otimizei o uso de materiais e ferramentas do setor, colaborando para a redução de retrabalhos e conservação preventiva do patrimônio da organização.`;
  } else {
    auditScore = 90;
    verdict = 'Alinhado aos Padrões ATS';
    strengths = [
      `Vocabulário alinhado às exigências do cargo de ${cleanRole}`,
      'Estrutura em conformidade com as diretrizes do LinkedIn e robôs de RH'
    ];
    improvements = [
      'Mantenha todas as informações concisas para garantir encaixe perfeito em 1 página',
      'Revise a ortografia e certifique-se de que todas as siglas técnicas estão explicadas'
    ];
    suggestedRewrite = `Competências e qualificações recomendadas para ${cleanRole} ativadas com sucesso.`;
  }

  return res.json({
    success: true,
    step: stepNum,
    score: auditScore,
    verdict,
    strengths,
    improvements,
    suggestedRewrite
  });
});

// Setup Vite middleware in dev or static files in production
async function setupViteOrStatic() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor Currículo & LinkedIn rodando na porta ${PORT}`);
  });
}

setupViteOrStatic();

