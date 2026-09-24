import { LinkedInRoleTemplate, CVData, ATSCheckResult } from '../types';

export const LINKEDIN_ROLE_TEMPLATES: LinkedInRoleTemplate[] = [
  // ==========================================
  // 1. AUDIOVISUAL, MÍDIA & COMUNICAÇÃO
  // ==========================================
  {
    id: 'audiovisual',
    roleName: 'Produtora Audiovisual / Videomaker',
    area: 'Audiovisual, Mídia & Criação',
    description: 'Focado em planejamento, captação, direção, pós-produção e narrativas digitais com alto engajamento no LinkedIn e canais corporativos.',
    headlines: [
      'Produtora Audiovisual | Edição de Vídeo & Pós-Produção | Adobe Premiere & After Effects | Storytelling Corporativo',
      'Videomaker & Produtora de Conteúdo Audiovisual | Captação 4K, Iluminação & Roteirização | Foco em Alcance & Branding',
      'Produtora Audiovisual | Gestão de Sets, Direção de Arte & Logística de Produção | Formação SENAI'
    ],
    summaries: [
      'Produtora Audiovisual com sólida experiência na concepção e execução de projetos de áudio e vídeo, desde a pré-produção e roteiro até a captação e pós-produção avançada. Especialista em criar conteúdos visuais alinhados a objetivos de marketing e comunicação corporativa, garantindo entregas no prazo e alto padrão de qualidade estética.',
      'Profissional apaixonada por narrativa visual e dinamismo de produção. Experiência técnica em equipamentos de captação, desenho de iluminação, captação de áudio direto e montagem no Adobe Premiere e After Effects. Reconhecida pela eficiência operacional, capacidade de liderar sets e colaboração com equipes criativas multidisciplinares.',
      'Com formação técnica especializada em Áudio e Vídeo pelo SENAI, atuo na produção executiva de projetos audiovisuais, relatórios técnicos e logística de estúdio. Foco constante na otimização de fluxos de edição, inovação em linguagens visuais para redes sociais e entrega de resultados de alto impacto.'
    ],
    experienceBullets: [
      'Liderei a produção executiva e técnica de mais de 35 peças audiovisuais institucionais, reduzindo o tempo médio de pós-produção em 25%.',
      'Gerenciei a logística completa de sets de gravação, coordenando cronogramas de equipe e equipamentos com 100% de pontualidade.',
      'Editei e finalizei vídeos de alta retenção no Adobe Premiere e After Effects, resultando em um crescimento de 40% no engajamento de redes sociais.',
      'Desenvolvi roteiros técnicos e storyboards para transmissões ao vivo e produções corporativas, reduzindo retrabalhos em 30% nas gravações.'
    ],
    hardSkills: [
      'Adobe Premiere Pro',
      'Adobe After Effects',
      'Edição de Áudio & Captação Direta',
      'Direção de Fotografia & Iluminação',
      'Roteirização Técnica & Storyboard',
      'Color Grading (DaVinci Resolve)',
      'Produção Executiva & Sets de Gravação',
      'Transmissões ao Vivo (OBS Studio / vMix)'
    ],
    softSkills: [
      'Comunicação Assertiva',
      'Resolução de Problemas sob Pressão',
      'Atenção Meticulosa aos Detalhes',
      'Trabalho em Equipe Multidisciplinar',
      'Gestão de Tempo & Prazos Rígidos'
    ],
    certifications: [
      'Técnico em Áudio e Vídeo — SENAI',
      'Adobe Certified Professional in Video Design',
      'Color Grading Avançado no DaVinci Resolve',
      'Indústria 4.0 e Gestão de Processos Criativos'
    ],
    linkedinAbout: `Olá! Sou Produtora Audiovisual com foco em transformar ideias e narrativas em produções dinâmicas de alto impacto visual.

Ao longo da minha trajetória, atuei desde a concepção de roteiros e montagem de sets até a edição e pós-produção no ecossistema Adobe (Premiere, After Effects, Photoshop). Minha abordagem alia rigor técnico a uma visão estética contemporânea voltada a engajamento e branding.

Principais competências:
🎬 Produção Executiva & Logística de Estúdio
🎥 Captação de Vídeo, Iluminação e Captação de Áudio
✂️ Edição Dinâmica, Motion Graphics e Colorimetria
📊 Organização de Fluxos de Trabalho e Gestão de Prazos

Estou sempre aberta a novas conexões, projetos desafiadores e oportunidades no mercado audiovisual. Vamos conversar?`,
    commonKeywords: ['Audiovisual', 'Edição de Vídeo', 'Premiere', 'After Effects', 'Videomaker', 'Produção', 'Roteiro', 'Motion Design', 'SENAI']
  },
  {
    id: 'fotografia',
    roleName: 'Fotógrafo(a) / Assistente de Fotografia',
    area: 'Audiovisual, Mídia & Criação',
    description: 'Produção fotográfica em estúdio e externa, iluminação, direção de modelos e tratamento profissional de imagens no Lightroom e Photoshop.',
    headlines: [
      'Fotógrafo Profissional | Fotografia Comercial, Eventos & Retratos | Adobe Lightroom & Photoshop',
      'Fotógrafo & Criador de Conteúdo Visual | Direção de Ensaio, Iluminação de Estúdio & Pós-Produção',
      'Assistente de Fotografia | Iluminação de Estúdio, Captação Digital & Edição | Foco em Moda e Publicidade'
    ],
    summaries: [
      'Fotógrafo profissional com olhar apurado para iluminação, composição e direção de retratos corporativos e publicitários. Domínio avançado do fluxo digital de pós-produção no Adobe Lightroom e Photoshop, com foco na entrega rápida e em conformidade com as diretrizes da marca.',
      'Profissional de fotografia com experiência prática na operação de câmeras profissionais, esquemas de flash/luz contínua e gerenciamento de acervo digital de imagens. Excelente habilidade interpessoal para orientar pessoas durante os ensaios.'
    ],
    experienceBullets: [
      'Conduzi mais de 80 ensaios fotográficos comerciais e institucionais, mantendo índice de 98% de satisfação dos clientes.',
      'Organizei o fluxo de backup e catalogação de mais de 50.000 fotos digitais com metadados padronizados.',
      'Realizei tratamento de pele e correção de cor avançada no Photoshop para campanhas publicitárias de grande circulação.'
    ],
    hardSkills: [
      'Adobe Lightroom Classic',
      'Adobe Photoshop',
      'Iluminação de Estúdio (Flash e Luz Contínua)',
      'Operação de Câmeras Canon / Sony / Nikon',
      'Direção de Retratos Corporativos',
      'Gestão de Acervo & Backup Digital'
    ],
    softSkills: [
      'Sensibilidade Estética',
      'Empatia e Comunicação com Clientes',
      'Organização e Pontualidade',
      'Agilidade em Prazos Curtos'
    ],
    certifications: [
      'Fotografia Digital e Iluminação de Estúdio — SENAI',
      'Tratamento Avançado de Imagens no Photoshop',
      'Colorimetria e Gerenciamento de Cores'
    ],
    linkedinAbout: `Fotógrafo focado em traduzir identidades e histórias por meio de imagens impactantes e tecnicamente impecáveis.

Especialista em iluminação de estúdio e externa, retratos corporativos que fortalecem a imagem profissional de executivos e pós-produção refinada no Adobe Lightroom e Photoshop.

Competências principais:
📸 Ensaios Corporativos e Publicitários
💡 Domínio de Iluminação Artificial e Natural
🖥️ Pós-Produção, Retoque e Tratamento de Cor

Aberto a trabalhos comerciais, ensaios corporativos e parcerias com agências e produtoras.`,
    commonKeywords: ['Fotografia', 'Lightroom', 'Photoshop', 'Retratos', 'Iluminação', 'Estúdio', 'Composição']
  },
  {
    id: 'socialmedia',
    roleName: 'Social Media / Gestor(a) de Mídias Sociais',
    area: 'Audiovisual, Mídia & Criação',
    description: 'Gestão estratégica de redes sociais (Instagram, LinkedIn, TikTok), calendário editorial, métricas de engajamento e produção de conteúdo.',
    headlines: [
      'Social Media Specialist | Gestão de Redes Sociais, Conteúdo Estratégico & Engajamento | Copywriting & Reels',
      'Gestor de Mídias Sociais | Planejamento de Conteúdo, Análise de Métricas & Branding | Canva & CapCut',
      'Analista de Redes Sociais & Comunidade | Gestão de Instagram e LinkedIn | Foco em Crescimento Orgânico'
    ],
    summaries: [
      'Especialista em Gestão de Redes Sociais com comprovada habilidade na construção de calendários editoriais que convertem seguidores em clientes. Experiência na produção de roteiros para Reels e TikTok, copywriting persuasivo e monitoramento constante de métricas de alcance e engajamento.',
      'Profissional de comunicação digital focado em posicionamento de marcas e autoridades nas redes sociais. Habilidade em planejar campanhas integradas, responder comunidades e interpretar dados para direcionar a estratégia de conteúdo.'
    ],
    experienceBullets: [
      'Gerenciei perfis corporativos somando mais de 60 mil seguidores, conquistando um aumento médio de 45% no engajamento orgânico.',
      'Produzi mais de 120 roteiros de vídeos curtos com foco em retenção e alcance qualificado.',
      'Estruturei relatórios mensais de desempenho com base em dados de alcance, cliques no link e taxa de interação.'
    ],
    hardSkills: [
      'Planejamento de Calendário Editorial',
      'Copywriting para Redes Sociais',
      'Edição de Vídeos Curtos (CapCut, Premiere Rush)',
      'Design para Posts (Canva / Photoshop)',
      'Métricas e Relatórios (Meta Business Suite, mLabs)',
      'Estratégia para LinkedIn e Instagram'
    ],
    softSkills: [
      'Criatividade e Curiosidade por Tendências',
      'Organização de Cronogramas',
      'Comunicação Empática',
      'Capacidade de Análise de Comportamento'
    ],
    certifications: [
      'Gestão de Mídias Sociais e Marketing de Conteúdo',
      'Copywriting e Escrita Persuasiva para a Web',
      'Estratégias de Crescimento no Instagram e LinkedIn'
    ],
    linkedinAbout: `Social Media focado em criar conexões autênticas entre marcas e pessoas através de conteúdo relevante, dinâmico e estratégico.

Trabalho desde a pesquisa de tendências e definição da linha editorial até a redação de copies, edição de vídeos curtos e análise aprofundada de métricas de conversão.

Foco de atuação:
📱 Gestão Estratégica de Instagram, LinkedIn e TikTok
✍️ Copywriting persuasivo e storytelling de marca
📊 Análise de Métricas e Relatórios de Desempenho

Vamos bater um papo sobre como fortalecer o posicionamento digital da sua marca?`,
    commonKeywords: ['Social Media', 'Redes Sociais', 'Instagram', 'LinkedIn', 'Copywriting', 'Engajamento', 'Canva']
  },

  // ==========================================
  // 2. ADMINISTRAÇÃO, ATENDIMENTO & FINANÇAS
  // ==========================================
  {
    id: 'assistente-adm',
    roleName: 'Assistente Administrativo / Auxiliar de Escritório',
    area: 'Administração & Escritório',
    description: 'Rotinas administrativas, controle de planilhas Excel, atendimento telefônico/presencial, organização de arquivos e suporte a departamentos.',
    headlines: [
      'Assistente Administrativo | Rotinas de Escritório, Controle de Documentos & Excel Intermediário | Organização & Suporte',
      'Auxiliar Administrativo | Faturamento, Atendimento ao Cliente & Gestão de Arquivos | Proatividade',
      'Assistente Administrativo Pleno | Emissão de Notas Fiscais, Contas a Pagar/Receber & Organização de Processos'
    ],
    summaries: [
      'Profissional de Administração com experiência sólida no suporte a rotinas de escritório, controle de fluxo documental, emissão de notas fiscais e atendimento cordial a clientes e fornecedores. Domínio de ferramentas de informática (Pacote Office, Excel e ERPs corporativos) e foco constante em organização e pontualidade.',
      'Assistente Administrativo dinâmico, organizado e comprometido com a melhoria contínua dos processos internos. Habilidade no acompanhamento de contas a pagar/receber, conciliação bancária simples, elaboração de relatórios gerenciais e alimentação de cadastros em sistemas.'
    ],
    experienceBullets: [
      'Organizei e digitalizei mais de 1.500 documentos físicos, reduzindo o tempo de localização de arquivos pela equipe em 50%.',
      'Alimentei planilhas de controle de fluxo de caixa e estoques diários com 100% de conformidade e sem divergências.',
      'Realizei atendimento presencial e telefônico a uma média de 40 clientes e parceiros por dia, mantendo alto índice de cordialidade.',
      'Apoiei a emissão de notas fiscais eletrônicas e conferência de pedidos de compras com rigor aos prazos fiscais.'
    ],
    hardSkills: [
      'Microsoft Excel (Tabelas, Fórmulas, Procv)',
      'Pacote Office (Word, PowerPoint, Outlook)',
      'Emissão e Conferência de Notas Fiscais (NF-e)',
      'Sistemas de Gestão Integrada (ERP)',
      'Controle de Contas a Pagar e Receber',
      'Organização de Arquivos e Gestão Documental'
    ],
    softSkills: [
      'Organização Meticulosa',
      'Pontualidade e Responsabilidade',
      'Comunicação Clara e Educada',
      'Facilidade de Aprendizado com Sistemas',
      'Discrição e Ética Profissional'
    ],
    certifications: [
      'Assistente Administrativo — SENAI / Certificação Profissional',
      'Informática Profissional e Excel Aplicado à Administração',
      'Gestão de Documentos e Rotinas de Departamento Pessoal'
    ],
    linkedinAbout: `Assistente Administrativo focado em garantir eficiência, organização e precisão nas rotinas diárias da empresa.

Tenho vivência prática em controle de planilhas financeiras, conciliação de contas, atendimento ao público e fornecedores, elaboração de relatórios e suporte a múltiplos setores da organização.

Áreas de destaque:
📁 Gestão e Digitalização de Arquivos e Documentos
📊 Excel e Elaboração de Controles Operacionais
📝 Atendimento ao Cliente, Emissão de Notas e Suporte a Compras

Disponível para novas oportunidades de trabalho no setor administrativo.`,
    commonKeywords: ['Administração', 'Excel', 'Assistente Administrativo', 'Notas Fiscais', 'Rotinas de Escritório', 'Atendimento', 'Controle']
  },
  {
    id: 'recepcionista',
    roleName: 'Recepcionista / Atendente ao Cliente',
    area: 'Administração & Escritório',
    description: 'Recepção cordial de visitantes, triagem de chamadas telefônicas, agendamento de consultas/reuniões e organização do espaço de entrada.',
    headlines: [
      'Recepcionista & Atendente | Recepção de Clientes, Atendimento Telefônico & Organização de Agendas',
      'Recepcionista Bilíngue / Hospitalar | Triagem Humanizada, Controle de Acesso & Rotinas de Recepção',
      'Atendente de Recepção | Cordialidade, Agendamentos & Suporte Administrativo | Boa Comunicação'
    ],
    summaries: [
      'Profissional de atendimento e recepção reconhecida pela postura cordial, comunicação acolhedora e excelente apresentação pessoal. Experiência em recepcionar clientes, direcionar visitantes, operar centrais telefônicas e gerenciar agendas com total atenção à pontualidade.',
      'Recepcionista com foco no atendimento humanizado e na organização do primeiro contato do cliente com a instituição. Habilidade no uso de softwares de agendamento, controle de correspondências e apoio administrativo básico.'
    ],
    experienceBullets: [
      'Atendi diariamente mais de 60 clientes presenciais e ligações telefônicas com alto padrão de simpatia e profissionalismo.',
      'Gerenciei a agenda de 8 salas de reuniões e profissionais, zerando conflitos de horários e atrasos.',
      'Controlei o fluxo de correspondências, encomendas e notas de entrega com protocolo de recebimento seguro.'
    ],
    hardSkills: [
      'Operação de Central Telefônica e PABX',
      'Softwares de Agendamento e Controle de Visitas',
      'Pacote Office (Word, Excel e E-mail Corporativo)',
      'Organização de Correspondências e Encomendas',
      'Técnicas de Atendimento Humanizado e Cordial'
    ],
    softSkills: [
      'Excelente Comunicação Verbal',
      'Empatia e Postura Acolhedora',
      'Paciência e Controle Emocional',
      'Pontualidade e Apresentação Pessoal Impecável'
    ],
    certifications: [
      'Atendimento ao Público e Técnicas de Recepção',
      'Comunicação Assertiva e Relacionamento Interpessoal',
      'Informática Básica e Secretariado'
    ],
    linkedinAbout: `Recepcionista com sólida experiência em recepção corporativa e atendimento ao cliente com simpatia, ética e eficiência.

Acredito que a primeira impressão é determinante para a imagem da empresa. Por isso, dedico especial atenção à cordialidade, à clareza das informações transmitidas e à organização impecável do ambiente de recepção.

Estou aberta a oportunidades no segmento corporativo, clínicas, escritórios e hotelaria.`,
    commonKeywords: ['Recepcionista', 'Atendimento ao Cliente', 'Agendamento', 'Recepção', 'Comunicação', 'Telefonia']
  },
  {
    id: 'rh',
    roleName: 'Analista de Recursos Humanos / R&S',
    area: 'Recursos Humanos & Pessoas',
    description: 'Gestão de processos seletivos end-to-end, atração de talentos via LinkedIn, entrevistas por competências, integração (onboarding) e clima.',
    headlines: [
      'Analista de Recursos Humanos | Recrutamento & Seleção (R&S) | LinkedIn Recruiter & ATS Gupy | Clima Organizacional',
      'Talent Acquisition Specialist | Hunting Ativo, Entrevistas por Competências & Onboarding Acolhedor',
      'Analista de RH | Gestão de Pessoas, Treinamento & Desenvolvimento (T&D) e Avaliação de Desempenho'
    ],
    summaries: [
      'Analista de Recursos Humanos com foco em Atração de Talentos e Gestão de Pessoas. Ampla experiência na condução de processos seletivos de ponta a ponta para posições operacionais, administrativas e técnicas, utilizando plataformas de recrutamento (Gupy, LinkedIn) e dinâmicas estruturadas por competências.',
      'Profissional de RH comprometida em conectar talentos certos às oportunidades estratégicas da empresa. Habilidade em hunting ativo, mapeamento de mercado, elaboração de programas de onboarding acolhedores e acompanhamento de indicadores de turnover e tempo de contratação.'
    ],
    experienceBullets: [
      'Conduzi mais de 70 processos seletivos simultâneos, reduzindo o tempo médio de fechamento de vagas em 28%.',
      'Implementei novo programa de Onboarding institucional, elevando o índice de satisfação dos novos colaboradores para 92%.',
      'Atuei no hunting ativo no LinkedIn, construindo um banco de talentos qualificados com aumento de 35% na taxa de resposta dos candidatos.'
    ],
    hardSkills: [
      'Recrutamento & Seleção por Competências',
      'LinkedIn Recruiter & Busca Ativa de Talentos',
      'Sistemas ATS (Gupy, Kenoby, InfoJobs)',
      'Métricas de RH (Turnover, Tempo de Vaga Aberta)',
      'Programas de Treinamento e Integração (Onboarding)',
      'Entrevistas Estruturadas & Pareceres de Seleção'
    ],
    softSkills: [
      'Escuta Ativa & Inteligência Emocional',
      'Excelente Comunicação Interpessoal',
      'Ética & Confidencialidade',
      'Mediação de Conflitos e Empatia'
    ],
    certifications: [
      'Analista de Recrutamento & Seleção por Competências',
      'Gestão de Pessoas e Cultura Organizacional',
      'Práticas Modernas de Departamento Pessoal'
    ],
    linkedinAbout: `Analista de Recursos Humanos apaixonada por potencializar pessoas e aproximar talentos das culturas certas.

Ao longo da minha trajetória, liderei processos seletivos complexos, implementei programas de integração humanizados e desenvolvi ações voltadas para o bem-estar e o engajamento das equipes de trabalho.

Aberto a conexões com profissionais de RH e oportunidades na área de Atração de Talentos e Gestão de Pessoas.`,
    commonKeywords: ['Recursos Humanos', 'Recrutamento', 'Seleção', 'Gupy', 'Entrevistas', 'Onboarding', 'Pessoas']
  },
  {
    id: 'financeiro',
    roleName: 'Assistente Financeiro / Contas a Pagar e Receber',
    area: 'Administração & Escritório',
    description: 'Conciliação bancária, lançamentos em ERP, controle de fluxo de caixa, cobrança amigável de inadimplentes e relatórios financeiros diários.',
    headlines: [
      'Assistente Financeiro | Contas a Pagar e Receber, Conciliação Bancária & Fluxo de Caixa | Excel Avançado',
      'Auxiliar Financeiro | Lançamento em ERP, Faturamento & Cobrança Amigável | Precisão Numérica',
      'Assistente Financeiro Pleno | Relatórios de DRE, Fechamento Mensal & Gestão de Inadimplência'
    ],
    summaries: [
      'Profissional da área Financeira com sólida vivência em contas a pagar, contas a receber, conciliação bancária diária e controle minucioso de fluxo de caixa. Perfil analítico, com atenção rigorosa a prazos de vencimento de boletos e otimização de custos operacionais.',
      'Assistente Financeiro capacitado na operação de sistemas ERP e planilhas de conciliação. Habilidade na comunicação cordial com fornecedores e clientes para negociação de prazos e recuperação de crédito.'
    ],
    experienceBullets: [
      'Efetuei a conciliação bancária diária de 4 contas correntes com 100% de exatidão e sem pendências não identificadas.',
      'Reduzi o índice de inadimplência da carteira de clientes em 18% através de régua de cobrança preventiva via e-mail e WhatsApp.',
      'Monitorei o calendário de contas a pagar evitando juros e multas por atraso em mais de 400 títulos mensais.'
    ],
    hardSkills: [
      'Contas a Pagar e Contas a Receber',
      'Conciliação Bancária e Fechamento Diário',
      'Controle de Fluxo de Caixa e Projeções',
      'Microsoft Excel (Fórmulas Financeiras e Tabelas Dinâmicas)',
      'Sistemas ERP Financeiro (Totvs, ContaAzul, Omie, SAP)',
      'Emissão de Boletos e Remessas Bancárias'
    ],
    softSkills: [
      'Raciocínio Lógico e Atenção a Detalhes',
      'Negociação Firme e Respeitosa',
      'Comprometimento com Prazos e Metas',
      'Responsabilidade com Dados Sensíveis'
    ],
    certifications: [
      'Gestão Financeira e Contabilidade Prática — SENAI',
      'Excel Aplicado a Finanças Corporativas',
      'Matemática Financeira e Fluxo de Caixa'
    ],
    linkedinAbout: `Assistente Financeiro focado em garantir a integridade dos dados contábeis, a pontualidade nos pagamentos e a saúde do fluxo de caixa.

Tenho experiência prática na gestão diária de contas a pagar e receber, conciliação bancária de múltiplos bancos e relatórios gerenciais para a tomada de decisão da diretoria.

Disponível para novos desafios na área de finanças e controladoria.`,
    commonKeywords: ['Financeiro', 'Contas a Pagar', 'Contas a Receber', 'Conciliação Bancária', 'Fluxo de Caixa', 'Excel']
  },

  // ==========================================
  // 3. INDÚSTRIA, MANUTENÇÃO & ENGENHARIA (SENAI)
  // ==========================================
  {
    id: 'eletromecanica',
    roleName: 'Técnico(a) em Eletromecânica / Automação (SENAI)',
    area: 'Indústria, Manutenção & Operações',
    description: 'Manutenção preditiva, preventiva e corretiva em sistemas eletromecânicos, automação com CLP, painéis e normas NR-10/NR-12.',
    headlines: [
      'Técnico em Eletromecânica | Manutenção Industrial, Automação & CLPs | Formação SENAI | NR-10 & NR-12',
      'Eletromecânico de Manutenção | Comandos Elétricos, Hidráulica, Pneumática & Mecânica Industrial | TPM',
      'Técnico em Automação & Eletromecânica | Diagnóstico de Falhas, Motores Elétricos & Instrumentação Industrial'
    ],
    summaries: [
      'Técnico em Eletromecânica com sólida formação profissional pelo SENAI, atuando na manutenção preventiva, preditiva e corretiva de maquinários e linhas industriais. Experiência na montagem de painéis elétricos, parametrização de inversores de frequência, programação básica de CLPs e conformidade rigorosa com normas de segurança NR-10 e NR-12.',
      'Profissional dedicado à manutenção eletromecânica industrial com foco em confiabilidade de ativos (TPM) e redução de paradas não programadas. Habilidade na leitura e interpretação de diagramas elétricos e pneumáticos, substituição de rolamentos, alinhamento de eixos e calibração de sensores.'
    ],
    experienceBullets: [
      'Executei planos de manutenção preventiva e preditiva em linhas de produção, reduzindo as paradas não programadas de máquinas em 32%.',
      'Montei e comissionei painéis de comandos elétricos e inversores de frequência para esteiras industriais de acordo com a NR-10.',
      'Realizei diagnósticos rápidos de falhas eletromecânicas com apoio de termografia e analisadores, economizando horas críticas de produção.'
    ],
    hardSkills: [
      'Comandos Elétricos & Montagem de Painéis',
      'Programação de CLP (Controlador Lógico Programável)',
      'Sistemas Hidráulicos & Pneumáticos',
      'Normas de Segurança: NR-10, NR-12 e NR-35',
      'Manutenção Preventiva, Preditiva & TPM',
      'Parametrização de Inversores de Frequência e Motores'
    ],
    softSkills: [
      'Compromisso com a Segurança do Trabalho',
      'Atenção ao Diagnóstico Preciso',
      'Prontidão e Resposta Rápida a Emergências',
      'Organização e Registro Técnico de O.S.'
    ],
    certifications: [
      'Técnico em Eletromecânica — SENAI',
      'Certificação NR-10 (Segurança em Instalações Elétricas)',
      'Certificação NR-12 (Segurança em Máquinas e Equipamentos)',
      'Automação com Controladores Lógicos Programáveis (CLP)'
    ],
    linkedinAbout: `Técnico em Eletromecânica formado pelo SENAI com experiência prática em manutenção industrial, automação e sistemas eletropneumáticos.

Minha atuação é voltada para a máxima disponibilidade e segurança operacional do parque fabril, unindo conhecimento em elétrica de potência, comandos, mecânica de precisão e respeito inegociável às normas NR-10 e NR-12.

Competências principais:
⚡ Comandos Elétricos, Inversores e Diagnóstico de Falhas
🛠️ Manutenção Preventiva, Preditiva e Corretiva
⚙️ Automação Industrial, CLPs, Hidráulica e Pneumática`,
    commonKeywords: ['Eletromecânica', 'SENAI', 'Manutenção Industrial', 'NR-10', 'NR-12', 'CLP', 'Comandos Elétricos']
  },
  {
    id: 'eletricista',
    roleName: 'Eletricista Predial & Industrial',
    area: 'Indústria, Manutenção & Operações',
    description: 'Instalações elétricas de baixa e média tensão, quadros de distribuição, cabeamento estruturado, iluminação e manutenções elétricas preventivas.',
    headlines: [
      'Eletricista Instalador Predial e Industrial | Baixa e Média Tensão | NR-10 Ativa | Formação SENAI',
      'Eletricista de Manutenção | Instalações Elétricas, Quadros de Distribuição & Cabeamento | Segurança',
      'Eletricista Profissional | Montagem de Padrão de Entrada, Circuitos Elétricos & Iluminação LED'
    ],
    summaries: [
      'Eletricista qualificado com formação pelo SENAI e certificado NR-10 em dia. Experiência na execução de instalações elétricas prediais, comerciais e industriais, montagem e manutenção de quadros de distribuição, passagem de cabeamento e dimensionamento de cargas com total segurança.',
      'Profissional ágil e responsável no diagnóstico de panes elétricas, curto-circuitos e substituição de disjuntores, contatores e fiações. Preza pela organização no canteiro de obras e cumprimento das normas técnicas da NBR 5410.'
    ],
    experienceBullets: [
      'Instalei e comissionei mais de 50 quadros de distribuição em obras residenciais e galpões comerciais dentro dos prazos de engenharia.',
      'Identifiquei e sanei falhas elétricas complexas em circuitos industriais, restaurando a energia com agilidade e segurança.',
      'Executei cabeamento de redes elétricas e iluminação LED, promovendo economia de energia de até 25% para os clientes.'
    ],
    hardSkills: [
      'Instalações Elétricas em Baixa Tensão (NBR 5410)',
      'Montagem de Quadros de Distribuição e Disjuntores',
      'Leitura e Interpretação de Projetos Elétricos',
      'Norma de Segurança NR-10 (Trabalho Seguro com Eletricidade)',
      'Uso de Instrumentos de Medição (Multímetro, Alicate Amperímetro)',
      'Sistemas de Aterramento e SPDA'
    ],
    softSkills: [
      'Consciência Rigorosa de Segurança',
      'Atenção ao Trabalho Bem Acabado',
      'Agilidade e Disposição Física',
      'Pontualidade e Relacionamento com Equipe'
    ],
    certifications: [
      'Eletricista Instalador Predial e Industrial — SENAI',
      'NR-10 Básico e Reciclagem em Dia',
      'NR-35 (Trabalho em Altura)'
    ],
    linkedinAbout: `Eletricista profissional com formação técnica no SENAI e sólida vivência em instalações elétricas prediais, comerciais e industriais.

Atuo com foco total nas normas técnicas de segurança e na entrega de instalações seguras, duráveis e bem dimensionadas.

Aberto a oportunidades com construtoras, empresas de manutenção e serviços elétricos.`,
    commonKeywords: ['Eletricista', 'NR-10', 'Instalações Elétricas', 'SENAI', 'Quadros de Distribuição', 'Manutenção']
  },
  {
    id: 'mecanico-manutencao',
    roleName: 'Mecânico(a) de Manutenção Industrial',
    area: 'Indústria, Manutenção & Operações',
    description: 'Montagem, ajuste e manutenção de redutores, esteiras transportadoras, rolamentos, bombas centrífugas e equipamentos pesados.',
    headlines: [
      'Mecânico de Manutenção Industrial | Redutores, Bombas & Rolamentos | Alinhamento a Laser | SENAI',
      'Mecânico Industrial Pleno | Usinagem Básica, Solda & Manutenção Preventiva/Corretiva | Confiabilidade',
      'Técnico em Mecânica | Ajustagem Mecânica, Lubrificação Industrial & Troca de Elementos de Máquinas'
    ],
    summaries: [
      'Mecânico de Manutenção Industrial capacitado no SENAI com ampla vivência em chão de fábrica. Especialista em desmontagem, diagnóstico de desgaste, substituição de rolamentos, retentores e gaxetas, alinhamento de eixos e ajuste de conjuntos mecânicos.',
      'Profissional prático e resiliente, experiente em planos de lubrificação industrial, inspeção de redutores de velocidade e bombas hidráulicas. Foco constante na prevenção de paradas mecânicas na linha de produção.'
    ],
    experienceBullets: [
      'Realizei a reforma e alinhamento mecânico de 12 redutores e esteiras, estendendo a vida útil dos componentes em 30%.',
      'Implementei rota diária de lubrificação e inspeção de ruídos em mancais, reduzindo quebras inesperadas de bombas centrífugas.',
      'Efetuei solda de reparo (eletrodo revestido e MIG) em estruturas mecânicas auxiliares com rapidez e acabamento seguro.'
    ],
    hardSkills: [
      'Desmontagem e Montagem de Conjuntos Mecânicos',
      'Substituição e Ajuste de Rolamentos e Mancais',
      'Alinhamento de Eixos e Polias',
      'Sistemas Hidráulicos e Pneumáticos',
      'Soldagem de Reparo (Eletrodo Revestido / MIG)',
      'Leitura de Desenho Técnico Mecânico'
    ],
    softSkills: [
      'Capacidade de Resolução de Problemas Práticos',
      'Trabalho em Equipe e Cooperação',
      'Disciplina com Procedimentos e EPIs',
      'Foco em Confiabilidade e Qualidade'
    ],
    certifications: [
      'Mecânico de Manutenção de Máquinas Industriais — SENAI',
      'Tecnologia de Rolamentos e Lubrificação Industrial',
      'Norma Regulamentadora NR-12 e NR-35'
    ],
    linkedinAbout: `Mecânico de Manutenção Industrial formado pelo SENAI, com forte experiência em manter as linhas de produção em funcionamento contínuo.

Domínio prático na manutenção de bombas, redutores, compressores e esteiras, atuando sempre com respeito às normas de segurança e foco em produtividade industrial.`,
    commonKeywords: ['Mecânica Industrial', 'Manutenção', 'SENAI', 'Rolamentos', 'Bombas', 'Redutores', 'Usinagem']
  },
  {
    id: 'operador-producao',
    roleName: 'Operador(a) de Produção Industrial',
    area: 'Indústria, Manutenção & Operações',
    description: 'Operação de maquinário na linha fabril, abastecimento de matéria-prima, inspeção de qualidade de peças e rotinas de organização 5S.',
    headlines: [
      'Operador de Produção Industrial | Linha de Montagem, Abastecimento & Controle de Qualidade | Metodologia 5S',
      'Auxiliar de Produção | Operação de Máquinas, Embalagem & Segurança no Trabalho | Disponibilidade de Turno',
      'Operador de Processos Industriais | Foco em Produtividade, Boas Práticas de Fabricação (BPF) & Agilidade'
    ],
    summaries: [
      'Operador de Produção dedicado e atento ao cumprimento rigoroso das metas diárias de produtividade e padrões de qualidade fabril. Experiência na operação de esteiras de montagem, abastecimento de matérias-primas e preenchimento de planilhas de controle de lote.',
      'Profissional com grande facilidade de adaptação a diferentes postos de trabalho da fábrica, habituado a ambientes com metas dinâmicas e trabalho sob normas de segurança e programas 5S.'
    ],
    experienceBullets: [
      'Operei postos da linha de montagem com índice de refugo inferior a 0,5%, superando as metas diárias de fabricação.',
      'Participei ativamente do programa 5S no setor fabril, mantendo o posto de trabalho sempre limpo, seguro e organizado.',
      'Realizei inspeção visual e dimensional de peças produzidas, garantindo a liberação apenas de itens em conformidade técnica.'
    ],
    hardSkills: [
      'Operação de Linhas de Produção e Montagem',
      'Boas Práticas de Fabricação (BPF)',
      'Metodologia 5S (Organização e Limpeza Industrial)',
      'Controle Visual de Qualidade e Medição Básica (Paquímetro)',
      'Segurança do Trabalho e Uso Correto de EPIs'
    ],
    softSkills: [
      'Atenção Concentrada e Agilidade Manual',
      'Espírito de Equipe e Cooperação',
      'Pontualidade e Assiduidade',
      'Disposição para Trabalho em Turnos'
    ],
    certifications: [
      'Operador de Processos Industriais — SENAI',
      'Noções de Qualidade e Metrologia Básica',
      'Treinamento em Segurança do Trabalho e BPF'
    ],
    linkedinAbout: `Profissional dedicado à produção industrial com foco em atingir metas diárias com qualidade, segurança e organização.

Experiência em linhas de montagem, embalagem e inspeção, sempre colaborando com a equipe para manter o ritmo fabril contínuo.`,
    commonKeywords: ['Produção Industrial', 'Operador de Produção', '5S', 'Linha de Montagem', 'Qualidade', 'SENAI']
  },

  // ==========================================
  // 4. TECNOLOGIA, SOFTWARE & SUPORTE DE TI
  // ==========================================
  {
    id: 'fullstack',
    roleName: 'Desenvolvedor(a) Full Stack / Web Developer',
    area: 'Tecnologia, Software & TI',
    description: 'Engenharia de software moderna com React, Node.js, TypeScript e bancos de dados para aplicações escaláveis.',
    headlines: [
      'Desenvolvedor Full Stack | React, Node.js, TypeScript & PostgreSQL | APIs REST & Cloud',
      'Software Engineer Full Stack | Especialista em Frontend React & Node.js Backend | Arquitetura Limpa',
      'Desenvolvedor Full Stack Júnior / Pleno | TypeScript, React.js, Tailwind CSS & Docker | Performance'
    ],
    summaries: [
      'Engenheiro de Software com vivência prática no desenvolvimento de ponta a ponta em aplicações web modernas. Especializado no ecossistema JavaScript/TypeScript (React, Node.js, Express) e bancos de dados relacionais e não-relacionais. Apaixonado por código limpo, testes e usabilidade.',
      'Desenvolvedor Full Stack focado em criar produtos digitais robustos, responsivos e de alta performance. Experiência na modelagem e consumo de APIs RESTful, integração com bancos SQL/NoSQL, versionamento Git e colaboração em equipes ágeis.'
    ],
    experienceBullets: [
      'Desenvolvi e lancei 4 aplicações completas utilizando React, TypeScript e Node.js com alta estabilidade.',
      'Otimizei rotas de API e consultas a banco de dados PostgreSQL, reduzindo a latência média de resposta em 45%.',
      'Implementei autenticação segura OAuth2/JWT e integrações com webhooks de pagamento com 99.9% de uptime.'
    ],
    hardSkills: [
      'TypeScript & JavaScript (ES6+)',
      'React.js & Next.js',
      'Node.js & Express',
      'PostgreSQL & MongoDB',
      'Tailwind CSS & Componentes',
      'Git, GitHub & Boas Práticas'
    ],
    softSkills: [
      'Pensamento Lógico e Analítico',
      'Capacidade de Aprendizado Contínuo',
      'Comunicação Técnica Clara',
      'Trabalho em Equipe e Proatividade'
    ],
    certifications: [
      'Desenvolvedor Full Stack — Certificação Profissional',
      'Git & Version Control Specialist',
      'Node.js & Microservices Architecture'
    ],
    linkedinAbout: `Desenvolvedor Full Stack focado em resolver problemas reais através de software limpo, intuitivo e escalável.

Atuo no desenvolvimento de soluções completas: APIs seguras no backend (Node.js, TypeScript, PostgreSQL) e interfaces responsivas no frontend (React, Tailwind CSS).

Aberto a conexões com recrutadores, engenheiros e projetos inovadores.`,
    commonKeywords: ['Full Stack', 'React', 'Node.js', 'TypeScript', 'JavaScript', 'APIs', 'PostgreSQL', 'Git']
  },
  {
    id: 'suporte-ti',
    roleName: 'Técnico(a) de Suporte em TI / Helpdesk',
    area: 'Tecnologia, Software & TI',
    description: 'Manutenção de computadores, suporte a usuários (N1/N2), configuração de redes cabeadas/Wi-Fi, formatação e instalação de softwares.',
    headlines: [
      'Técnico de Suporte em TI | Helpdesk N1/N2, Manutenção de Hardware & Redes | Atendimento ao Usuário',
      'Analista de Suporte Técnico | Windows, Redes TCP/IP, Formatação & Active Directory | Resolução Rápida',
      'Técnico em Informática | Montagem e Manutenção de Micros, Impressoras & Suporte Remoto'
    ],
    summaries: [
      'Técnico em Informática e Suporte com experiência no atendimento a usuários de escritório e chão de fábrica. Habilidade no diagnóstico e reparo de hardware, formatação e instalação do Windows/Linux, configuração de roteadores, impressoras e suporte remoto via AnyDesk/TeamViewer com alta taxa de resolução no primeiro contato.',
      'Profissional de TI dedicado e paciente no atendimento ao cliente interno. Experiência na abertura e acompanhamento de chamados em ferramentas de Service Desk, controle de inventário de máquinas e garantia de segurança de backups de dados.'
    ],
    experienceBullets: [
      'Atendi e solucionei mais de 800 chamados técnicos de helpdesk mantendo índice de 96% de chamados resolvidos dentro do prazo (SLA).',
      'Configurei e mantive o parque de 70 computadores e impressoras da empresa com rotinas preventivas de antivírus e atualizações.',
      'Estruturei o cabeamento de rede de dados e pontos de acesso Wi-Fi para o novo escritório da organização.'
    ],
    hardSkills: [
      'Manutenção Preventiva e Corretiva de Hardware',
      'Sistemas Operacionais Windows (10/11) e Linux',
      'Redes de Computadores (TCP/IP, DNS, Roteadores, Switches)',
      'Suporte Remoto (AnyDesk, TeamViewer, RDP)',
      'Active Directory & Gestão de Usuários e Permissões',
      'Ferramentas de Chamados (Jira Service Management, GLPI)'
    ],
    softSkills: [
      'Paciência e Didática no Atendimento a Usuários',
      'Agilidade no Diagnóstico de Problemas',
      'Organização de Inventário',
      'Vontade Constante de Aprender Novas Tecnologias'
    ],
    certifications: [
      'Técnico em Redes de Computadores / Manutenção — SENAI',
      'Fundamentos de Redes e Suporte Técnico N1/N2',
      'Segurança da Informação Básica para Usuários'
    ],
    linkedinAbout: `Técnico de Suporte em TI com vocação para resolver problemas com rapidez e apoiar os usuários a trabalharem com tranquilidade.

Tenho vivência prática em manutenção de computadores, configuração de redes locais, suporte a periféricos e atendimento amigável a chamados de suporte.

Aberto a oportunidades em equipes de TI, Helpdesk e infraestrutura.`,
    commonKeywords: ['Suporte TI', 'Helpdesk', 'Manutenção', 'Redes', 'Hardware', 'Windows', 'SENAI', 'Service Desk']
  },

  // ==========================================
  // 5. VENDAS, COMÉRCIO & ATENDIMENTO
  // ==========================================
  {
    id: 'vendedor',
    roleName: 'Vendedor(a) Comercial / Atendente de Loja',
    area: 'Comércio & Vendas',
    description: 'Atendimento consultivo ao cliente, apresentação de produtos, negociação, superação de metas comerciais e pós-venda.',
    headlines: [
      'Vendedor Comercial | Atendimento Consultivo, Negociação & Superação de Metas | Pós-Venda Ativo',
      'Atendente de Vendas | Balcão, Prospecção de Clientes & Fechamento de Vendas | Comunicação Persuasiva',
      'Consultor de Vendas | Foco em Relacionamento com o Cliente, Fidelização & Vendas por WhatsApp'
    ],
    summaries: [
      'Profissional de Vendas focado em proporcionar uma experiência de compra consultiva e acolhedora. Experiência na identificação das necessidades dos clientes, apresentação de vantagens de produtos, superação consistente de metas mensais e fidelização através de um pós-venda atencioso.',
      'Vendedor dinâmico e comunicativo com facilidade para criar conexões rápidas e empáticas com o público. Habilidade no uso de ferramentas de vendas digitais (WhatsApp Business, Catálogos e CRMs) para prospecção ativa e reativa.'
    ],
    experienceBullets: [
      'Superei as metas mensais de vendas em 115% de forma consecutiva ao longo do último ano.',
      'Aumentei a base de clientes recorrentes em 30% implementando rotina estruturada de acompanhamento pós-venda no WhatsApp.',
      'Realizei atendimento diário de balcão e telefone com abordagem cordial e apresentação clara das condições de pagamento.'
    ],
    hardSkills: [
      'Técnicas de Vendas Consultivas e Fechamento',
      'Atendimento ao Cliente e Negociação',
      'WhatsApp Business para Vendas',
      'Operação de Sistemas de Caixa e PDV',
      'Controle de Estoque de Balcão e Demonstração de Produtos'
    ],
    softSkills: [
      'Empatia e Habilidade de Escuta',
      'Persuasão Ética e Clareza na Fala',
      'Motivação por Metas e Resultados',
      'Resiliência e Energia Positiva'
    ],
    certifications: [
      'Técnicas de Negociação e Vendas no Varejo',
      'Atendimento Excelente e Fidelização de Clientes',
      'Comunicação Persuasiva para Vendedores'
    ],
    linkedinAbout: `Profissional de Vendas apaixonado pelo relacionamento com pessoas e focado em transformar conversas em negócios bem-sucedidos.

Trabalho com abordagem consultiva, buscando compreender a real dor do cliente para oferecer a solução ideal com transparência e respeito.

Sempre em busca de novos desafios comerciais no varejo ou atacado.`,
    commonKeywords: ['Vendas', 'Atendimento', 'Negociação', 'Comercial', 'Metas', 'Pós-Venda', 'WhatsApp']
  },
  {
    id: 'operador-caixa',
    roleName: 'Operador(a) de Caixa / Atendente Comercial',
    area: 'Comércio & Vendas',
    description: 'Abertura e fechamento de caixa, registro de mercadorias no PDV, recebimento de pagamentos (dinheiro, cartão, Pix) e atenção ao cliente.',
    headlines: [
      'Operadora de Caixa | Registro de Mercadorias, Fechamento de Caixa Sem Divergências & Agilidade',
      'Operador de Caixa & Atendimento | Operação de Sistema PDV, Recebimento de Valores & Cordialidade',
      'Atendente de Caixa | Abertura e Fechamento, Controle de Sangrias & Foco na Satisfação do Cliente'
    ],
    summaries: [
      'Operadora de Caixa com perfil ágil, responsável e altamente atenta ao controle exato de valores monetários. Experiência na abertura, sangria e fechamento de caixas em ambientes de alto fluxo, operando leitores de código de barras, máquinas de cartão e emissores de cupom fiscal com cordialidade permanente.',
      'Profissional comprometida com a precisão matemática e atendimento amável aos clientes na etapa final de sua compra. Facilidade para atuar com troco, conferência de notas e colaboração na reposição de itens de conveniência.'
    ],
    experienceBullets: [
      'Operei caixas em horários de pico atendendo mais de 120 clientes por turno com simpatia e sem filas acumuladas.',
      'Finalizei meses de operação com 100% dos fechamentos de caixa exatos, sem qualquer diferença de valores.',
      'Prestei suporte aos clientes quanto a formas de pagamento, parcelamentos e emissão de notas fiscais com CPF.'
    ],
    hardSkills: [
      'Operação de Sistemas de Frente de Caixa (PDV)',
      'Abertura, Sangria e Fechamento de Caixa',
      'Recebimento em Dinheiro, Cartões de Crédito/Débito e Pix',
      'Emissão de Cupom Fiscal Eletrônico (NFC-e)',
      'Noções Básicas de Matemática Financeira e Troco'
    ],
    softSkills: [
      'Atenção e Foco em Números',
      'Simpatia e Cordialidade no Atendimento',
      'Honestidade e Ética Inegociáveis',
      'Agilidade Manual e Pontualidade'
    ],
    certifications: [
      'Operador de Caixa e Excelência no Atendimento Comercial',
      'Técnicas de Prevenção de Perdas no Varejo',
      'Informática Básica e Frente de Caixa'
    ],
    linkedinAbout: `Operadora de Caixa profissional focada na precisão dos valores recebidos e no atendimento respeitoso a cada cliente.

Disponível para oportunidades em supermercados, farmácias, lojas de departamentos e comércios em geral.`,
    commonKeywords: ['Operador de Caixa', 'PDV', 'Fechamento de Caixa', 'Atendimento', 'Cupom Fiscal', 'Caixa']
  },

  // ==========================================
  // 6. LOGÍSTICA & ESTOQUE
  // ==========================================
  {
    id: 'estoquista',
    roleName: 'Estoquista / Auxiliar de Almoxarifado',
    area: 'Logística & Operações',
    description: 'Recebimento de mercadorias, conferência de notas fiscais, estocagem padronizada, separação de pedidos (picking) e inventários periódicos.',
    headlines: [
      'Estoquista & Auxiliar de Almoxarifado | Recebimento, Separação de Pedidos & Inventário | Organização',
      'Auxiliar de Estoque | Conferência de Cargas, Lançamento em Sistema & Metodologia 5S | Agilidade',
      'Almoxarife | Controle de Entradas e Saídas, Armazenagem Segura & Prevenção de Perdas'
    ],
    summaries: [
      'Profissional de Estoque e Almoxarifado com vasta prática no recebimento, conferência quantitativa e qualitativa de mercadorias, controle de etiquetas e organização lógica dos produtos nas prateleiras. Experiência na realização de contagens de inventário rotativo e separação rápida de pedidos para entrega.',
      'Estoquista metódico e proativo, com foco na integridade física dos produtos e agilidade na expedição. Habilidade na operação de coletores de dados, conferência de notas fiscais e manutenção de um armazém limpo e sinalizado.'
    ],
    experienceBullets: [
      'Conferi e armazenei cargas diárias de mais de 400 volumes com 0% de erro na conferência com a nota fiscal.',
      'Participei da realização de 6 inventários gerais com índice de acuracidade de estoque superior a 98,5%.',
      'Otimizei a disposição dos produtos de maior giro no estoque, reduzindo o tempo de separação de pedidos em 25%.'
    ],
    hardSkills: [
      'Recebimento e Conferência de Mercadorias',
      'Separação de Pedidos (Picking e Packing)',
      'Organização de Almoxarifado e Endereçamento de Itens',
      'Inventário Rotativo e Contagem Cega',
      'Operação de Coletor de Dados e Leitor de Código de Barras',
      'Lançamento de Movimentações em Sistema de Estoque'
    ],
    softSkills: [
      'Organização Espacial e Disciplina',
      'Atenção Meticulosa a Códigos e Referências',
      'Disposição Física e Agilidade',
      'Trabalho Colaborativo com a Equipe'
    ],
    certifications: [
      'Logística de Armazenagem e Gestão de Estoques — SENAI',
      'Boas Práticas de Movimentação de Cargas e Prevenção de Perdas',
      'Noções de Informática para Logística'
    ],
    linkedinAbout: `Estoquista e Auxiliar de Almoxarifado dedicado à organização precisa, à acuracidade das contagens e à rapidez na separação de produtos.

Aberto a oportunidades em centros de distribuição, comércios, indústrias e empresas de logística.`,
    commonKeywords: ['Estoque', 'Almoxarifado', 'Conferência', 'Inventário', 'Logística', 'Picking', 'Recebimento']
  },

  // ==========================================
  // 7. SAÚDE & SERVIÇOS
  // ==========================================
  {
    id: 'tecnico-enfermagem',
    roleName: 'Técnico(a) em Enfermagem',
    area: 'Saúde & Cuidados',
    description: 'Cuidados assistenciais aos pacientes, administração de medicamentos prescritos, aferição de sinais vitais, curativos e anotação em prontuário.',
    headlines: [
      'Técnico em Enfermagem | Coren Ativo | Cuidados Assistenciais, Medicação & Sinais Vitais | Humanização',
      'Técnico de Enfermagem Hospitalar | Pronto-Socorro, Clínica Médica & Curativos | Dedicação ao Paciente',
      'Técnico em Enfermagem | Atendimento Humanizado, Coleta de Exames & Normas de Biossegurança'
    ],
    summaries: [
      'Técnico em Enfermagem com registro ativo no COREN e sólida conduta ética e humanizada. Experiência na prestação de cuidados diretos a pacientes em leitos clínicos e ambulatoriais, administração rigorosa de medicamentos conforme prescrição médica, realização de curativos simples e complexos e monitoramento de sinais vitais.',
      'Profissional de saúde comprometido com a segurança do paciente e o controle de infecções hospitalares. Habilidade em comunicação acolhedora com pacientes e familiares, atuando sempre em perfeita sintonia com a equipe médica e de enfermagem.'
    ],
    experienceBullets: [
      'Prestei assistência direta de enfermagem a uma média de 15 leitos por plantão com rigor aos horários de medicação e protocolos de segurança.',
      'Realizei aferição contínua de sinais vitais (PA, FC, saturação, glicemia) identificando alterações precocemente.',
      'Efetuei curativos estéreis e procedimentos de higiene e conforto, recebendo elogios frequentes de pacientes e acompanhantes.'
    ],
    hardSkills: [
      'Administração de Medicamentos (Oral, IM, EV)',
      'Aferição e Registro de Sinais Vitais',
      'Técnicas de Assepsia e Normas de Biossegurança',
      'Realização de Curativos e Cuidados com Sondas',
      'Preenchimento de Prontuário Eletrônico do Paciente',
      'Primeiros Socorros e Suporte Básico de Vida'
    ],
    softSkills: [
      'Empatia e Humanização no Cuidado',
      'Equilíbrio Emocional em Situações Críticas',
      'Atenção Concentrada aos Protocolos Médicos',
      'Espírito de Equipe e Respeito aos Colegas'
    ],
    certifications: [
      'Curso Técnico em Enfermagem (com COREN Regular)',
      'Suporte Básico de Vida (BLS)',
      'Prevenção e Tratamento de Feridas e Curativos'
    ],
    linkedinAbout: `Técnico em Enfermagem apaixonado por cuidar de pessoas com respeito, técnica apurada e dedicação integral.

Atuação com registro ativo no COREN, experiência em cuidados gerais, administração segura de medicações e acolhimento humano.

Disponível para atuar em hospitais, clínicas, postos de saúde e atendimento domiciliar (Home Care).`,
    commonKeywords: ['Enfermagem', 'COREN', 'Técnico de Enfermagem', 'Saúde', 'Medicamentos', 'Cuidados', 'Hospitalar']
  }
];

// Gerador dinâmico de template para qualquer cargo que o usuário digitar e não estiver na lista prévia
export function createCustomRoleTemplate(customRoleName: string, areaName: string = 'Área Profissional'): LinkedInRoleTemplate {
  const cleanRole = customRoleName.trim() || 'Serviços Gerais';
  const lower = cleanRole.toLowerCase();

  let detectedArea = areaName !== 'Cargo Personalizado' && areaName !== 'Área Profissional' ? areaName : 'Operações & Serviços Gerais';
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
      `Profissional atuante como ${cleanRole}, com sólida experiência em higienização, conservação predial e organização de ambientes corporativos e comerciais. Habilidade no manuseio seguro de produtos e equipamentos de limpeza, seguindo rigorosamente os padrões de segurança e normas sanitárias.`,
      `${cleanRole} com histórico exemplar de assiduidade, responsabilidade e postura ética. Foco na manutenção de espaços limpos, organizados e acolhedores, além de suporte proativo às necessidades diárias da empresa.`
    ];
    experienceBullets = [
      'Realizei higienização e desinfecção completa de salas, corredores, sanitários e áreas comuns com 100% de conformidade às normas sanitárias.',
      'Controlei o estoque diário de materiais de limpeza e higiene, evitando desabastecimentos e reduzindo o consumo excessivo de produtos químicos.',
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
  } else if (lower.includes('portei') || lower.includes('vigia') || lower.includes('controlador de acesso')) {
    detectedArea = 'Segurança Patrimonial & Portaria';
    headlines = [
      `${cleanRole} | Controle de Acesso, Monitoramento & Atendimento Cordial | Foco em Segurança`,
      `${cleanRole} | Gestão de Portaria, Recepção de Encomendas & Vigilância Preventiva`,
      `Profissional de ${cleanRole} | Pontualidade, Discrição & Postura Atenta`
    ];
    summaries = [
      `Profissional de ${cleanRole} experiente no controle rigoroso de entrada e saída de moradores, visitantes e prestadores de serviço. Habilidade na operação de interfonia, portões eletrônicos e sistemas de CFTV, sempre com postura respeitosa, atenta e preventiva.`,
      `${cleanRole} comprometido com a segurança e tranquilidade do condomínio ou empresa. Destaque em atendimento ao público, recebimento de correspondências e comunicação clara via rádio e interfone.`
    ];
    experienceBullets = [
      'Controlei o fluxo diário de acesso de veículos e pedestres, realizando checagem de documentos e autorizações prévias.',
      'Operei sistemas de segurança eletrônica, interfonia e monitoramento de câmeras (CFTV) com máxima vigilância.',
      'Gerenciei o recebimento e entrega organizada de encomendas e correspondências aos destinatários.',
      'Atuei na orientação de visitantes com cordialidade e firmeza nos protocolos internos.'
    ];
    hardSkills = [
      'Controle de Acesso e Livro de Ocorrências',
      'Operação de Sistemas de CFTV e Monitoramento',
      'Gestão de Encomendas e Correspondências',
      'Interfonia e Rádio Comunicador (HT)',
      'Protocolos de Emergência e Prevenção de Sinistros'
    ];
    softSkills = ['Atenção Concentrada', 'Postura Firme e Cordial', 'Discrição Absoluta', 'Pontualidade Britânica', 'Resolução Pacífica de Conflitos'];
    certifications = ['Curso de Porteiro e Controlador de Acesso — SENAI', 'Segurança Patrimonial e Vigilância Preventiva', 'Atendimento ao Cliente e Comunicação Assertiva'];
  } else if (lower.includes('cozinha') || lower.includes('cozinheir') || lower.includes('garçom') || lower.includes('atendente de lanchonete')) {
    detectedArea = 'Alimentos, Gastronomia & Hospitalidade';
    headlines = [
      `${cleanRole} | Boas Práticas na Manipulação de Alimentos, Pré-Preparo & Higiene | SENAI`,
      `${cleanRole} | Agilidade em Cozinha Industrial, Organização & Controle de Validade`,
      `Auxiliar de ${cleanRole} | Dedicação, Agilidade & Rigor Sanitário (ANVISA)`
    ];
    summaries = [
      `Profissional na área de ${cleanRole}, com sólida vivência no pré-preparo de alimentos, higienização rigorosa de bancadas e utensílios e controle de estoque de insumos. Conhecimento aprofundado nas normas de segurança alimentar da ANVISA.`,
      `${cleanRole} dinâmico e organizado, acostumado ao ritmo ágil de cozinhas e restaurantes. Excelente relacionamento interpessoal, pontualidade e disposição para colaborar em todas as rotinas operacionais.`
    ];
    experienceBullets = [
      'Realizei o pré-preparo, corte e porcionamento de alimentos seguindo rigorosas fichas técnicas e normas de higiene.',
      'Controlei as datas de validade, etiquetagem e armazenamento adequado de mercadorias no estoque e câmara fria (método PVPS).',
      'Efetuei a limpeza e desinfecção de bancadas, fogões industriais e utensílios ao longo de todo o expediente.',
      'Colaborei com os cozinheiros chefes para agilizar a saída dos pratos com pontualidade e alto padrão de apresentação.'
    ];
    hardSkills = [
      'Boas Práticas na Manipulação de Alimentos (ANVISA)',
      'Pré-Preparo e Mise en Place',
      'Controle de Estoque e Validade (PVPS)',
      'Higienização de Utensílios e Equipamentos Industriais',
      'Segurança do Trabalho em Cozinhas'
    ];
    softSkills = ['Agilidade sob Pressão', 'Organização Impecável', 'Trabalho em Equipe e Companheirismo', 'Atenção aos Detalhes', 'Assiduidade'];
    certifications = ['Curso de Boas Práticas na Manipulação de Alimentos — SENAI', 'Higiene e Sanitação em Serviços de Alimentação', 'Prevenção de Acidentes com Fogo e Facas'];
  }

  const linkedinAbout = `Olá! Sou profissional na área de ${cleanRole} com paixão por manter a excelência operacional, disciplina e colaboração diária.

Tenho sólida experiência no cumprimento de rotinas práticas, cuidado com o ambiente e respeito às normas de segurança e qualidade. Me destaco pela pontualidade, disposição constante para aprender e facilidade para me integrar a qualquer equipe.

Principais competências:
🎯 Execução ágil de rotinas operacionais
🛠️ Uso consciente de materiais, produtos e ferramentas
🤝 Trabalho em equipe, respeito e cordialidade
🛡️ Segurança no trabalho e prevenção de riscos

Estou disponível para novas oportunidades de trabalho. Vamos conversar?`;

  return {
    id: `custom-${Date.now()}`,
    roleName: cleanRole,
    area: detectedArea,
    description: `Atuação profissional voltada para ${cleanRole}, combinando competências técnicas especializadas, disciplina operacional e busca por resultados concretos.`,
    headlines,
    summaries,
    experienceBullets,
    hardSkills,
    softSkills,
    certifications,
    linkedinAbout,
    commonKeywords: [cleanRole, 'Profissional', 'Qualidade', 'Experiência', 'Processos', 'Eficiência', 'SENAI'],
    stepTips: {
      1: `Para ${cleanRole}, o modelo visual mais recomendado é o "Clássico ATS" ou "Coluna Lateral", com paletas neutras.`,
      2: `No título profissional, destaque "${cleanRole}" e suas principais especialidades práticas.`,
      3: `No resumo, fale sobre sua pontualidade, dedicação e as tarefas que você realiza com agilidade.`,
      4: `Na experiência, use verbos como "Organizei", "Executei", "Realizei" e "Controlei".`,
      5: `Cursos do SENAI e normas regulamentadoras trazem grande diferencial para ${cleanRole}.`,
      6: `Liste suas habilidades práticas manuais somadas às suas qualidades de convivência em equipe.`,
      7: `O texto de apresentação do LinkedIn deve ser amigável e destacar sua disposição para trabalhar.`
    },
    isAiGenerated: false
  };
}

// Verbos de ação categorizados para turbinar experiências no currículo (exclusivos para o campo de Experiências)
export const ACTION_VERBS = {
  resultados: [
    'Aumentei', 'Reduzi', 'Otimizei', 'Economizei', 'Elevei', 'Maximizou', 'Acelerei', 'Multipliquei', 'Superei'
  ],
  lideranca: [
    'Liderei', 'Coordenei', 'Capacitei', 'Gerenciei', 'Supervisionei', 'Orientei', 'Direcionei', 'Treinei'
  ],
  criacao: [
    'Desenvolvi', 'Estruturei', 'Criei', 'Implementei', 'Lancei', 'Projetei', 'Concebi', 'Elaborei', 'Produzi'
  ],
  organizacao: [
    'Organizei', 'Padronizei', 'Auditei', 'Mapeei', 'Reestruturei', 'Negociei', 'Automatizei', 'Controlei'
  ]
};

// Exemplos padrão pré-carregados
export const INITIAL_CV_DATA: CVData = {
  template: 'm-coluna',
  primaryColor: '#005b82',
  showAIBadge: false, // Desativado por padrão para eliminar ruído de AI slop
  targetRole: 'Produtora Audiovisual / Videomaker',
  targetArea: 'Audiovisual, Mídia & Criação',

  fullName: 'ALESSANDRA MORAES',
  roleHeadline: 'Produtora Audiovisual | Edição de Vídeo & Pós-Produção',
  email: 'alessandra.moraes@email.com',
  phone: '(96) 90000-0000',
  location: 'Macapá, AP',
  linkedinUrl: 'https://linkedin.com/in/alessandramoraes',
  portfolioUrl: 'https://behance.net/alessandramoraes',
  photoUrl: '',

  summary: 'Produtora Audiovisual com experiência em planejamento, captação e edição de projetos de vídeo e fotografia. Comprometida com resultados de alto impacto estético, inovação e eficiência operacional nas entregas.',

  experiences: [
    {
      id: 'exp-1',
      role: 'Estagiária de Produção Audiovisual',
      company: 'Produtora SENAI',
      location: 'Macapá, AP',
      startDate: '2025',
      endDate: 'Atual',
      current: true,
      description: '• Criação de apresentações visuais e relatórios técnicos de produção.\n• Apoio na organização de cronogramas, logística de sets e estúdio.\n• Edição e montagem de vídeos institucionais no Adobe Premiere Pro.'
    },
    {
      id: 'exp-2',
      role: 'Assistente de Câmera & Fotografia',
      company: 'Estúdio Criativo Norte',
      location: 'Macapá, AP',
      startDate: '2024',
      endDate: '2025',
      current: false,
      description: '• Operação de câmeras digitais e montagem de esquemas de iluminação de estúdio.\n• Organização de arquivos brutos e backup seguro de dados de gravação.\n• Apoio na checagem de áudio direto e montagem de equipamentos.'
    }
  ],

  education: [
    {
      id: 'edu-1',
      degree: 'Técnico em Áudio e Vídeo',
      institution: 'SENAI Macapá',
      fieldOfStudy: 'Comunicação e Mídia',
      completionYear: '2026',
      status: 'Em andamento'
    }
  ],

  certifications: [
    {
      id: 'cert-1',
      name: 'Excel e Gestão de Indicadores',
      issuer: 'SENAI',
      year: '2024'
    },
    {
      id: 'cert-2',
      name: 'Indústria 4.0 e Processos Produtivos',
      issuer: 'SENAI Nacional',
      year: '2024'
    }
  ],

  hardSkills: [
    'Edição de Vídeo (Premiere Pro)',
    'Adobe After Effects',
    'Captação de Áudio Direto',
    'Operação de Câmeras Profissionais',
    'Logística de Sets e Gravações',
    'Organização de Arquivos e Backup'
  ],

  softSkills: [
    'Comunicação Clara e Assertiva',
    'Organização e Pontualidade',
    'Trabalho em Equipe',
    'Atenção a Detalhes'
  ],

  languages: [
    {
      id: 'lang-1',
      language: 'Português',
      level: 'Nativo'
    },
    {
      id: 'lang-2',
      language: 'Inglês',
      level: 'Intermediário (B2)'
    }
  ]
};

// Avaliador de ATS e Força de Perfil com recomendações didáticas e acessíveis
export function calculateATSScore(cv: CVData): ATSCheckResult {
  const checks = [
    {
      id: 'name',
      label: 'Nome completo e bem visível no topo',
      passed: Boolean(cv.fullName && cv.fullName.trim().length > 3),
      recommendation: 'Escreva seu nome e sobrenome completo para identificação imediata.',
      weight: 10
    },
    {
      id: 'role',
      label: 'Título profissional com o cargo pretendido',
      passed: Boolean(cv.roleHeadline && cv.roleHeadline.trim().length > 5),
      recommendation: 'Adicione um título claro logo abaixo do seu nome (ex: Produtora Audiovisual | Edição de Vídeo).',
      weight: 15
    },
    {
      id: 'contact',
      label: 'Contatos essenciais preenchidos (E-mail, Telefone, Cidade)',
      passed: Boolean(cv.email && cv.phone && cv.location),
      recommendation: 'Preencha seu e-mail, telefone com DDD e a cidade onde mora.',
      weight: 15
    },
    {
      id: 'linkedin',
      label: 'Link do perfil no LinkedIn informado',
      passed: Boolean(cv.linkedinUrl && cv.linkedinUrl.includes('linkedin.com')),
      recommendation: 'Adicione o endereço do seu perfil do LinkedIn (ex: linkedin.com/in/seunome) para os recrutadores te encontrarem.',
      weight: 10
    },
    {
      id: 'summary',
      label: 'Resumo profissional com apresentação clara (mínimo 100 letras)',
      passed: Boolean(cv.summary && cv.summary.length >= 100),
      recommendation: 'Escreva de 3 a 5 linhas contando suas principais qualidades e o que você faz de melhor.',
      weight: 15
    },
    {
      id: 'experiences',
      label: 'Experiência com descrição das tarefas realizadas',
      passed: Boolean(cv.experiences && cv.experiences.length > 0 && cv.experiences.some(e => e.description && e.description.length > 25)),
      recommendation: 'Descreva pelo menos uma experiência contando o que você fazia no dia a dia (ou projetos de curso/estágio).',
      weight: 15
    },
    {
      id: 'education',
      label: 'Escolaridade ou curso técnico informado',
      passed: Boolean(cv.education && cv.education.length > 0 && cv.education[0].institution),
      recommendation: 'Informe sua formação (por exemplo: SENAI, Ensino Médio ou Faculdade).',
      weight: 10
    },
    {
      id: 'skills',
      label: 'Habilidades técnicas listadas (mínimo 4 competências)',
      passed: Boolean(cv.hardSkills && cv.hardSkills.length >= 4),
      recommendation: 'Liste pelo menos 4 programas, ferramentas ou tarefas que você sabe fazer bem.',
      weight: 10
    }
  ];

  const earned = checks.reduce((acc, c) => acc + (c.passed ? c.weight : 0), 0);
  const total = checks.reduce((acc, c) => acc + c.weight, 0);
  const score = Math.round((earned / total) * 100);

  let status: 'excelente' | 'bom' | 'precisa-melhorar' = 'precisa-melhorar';
  if (score >= 80) status = 'excelente';
  else if (score >= 60) status = 'bom';

  return { score, status, checks };
}
