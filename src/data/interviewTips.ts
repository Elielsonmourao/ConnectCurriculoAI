export interface InterviewQuestionGuide {
  id: string;
  category: 'classicas' | 'comportamentais' | 'tecnicas' | 'perguntas_fazer';
  question: string;
  recruiterGoal: string;
  recommendedStructure: string;
  exampleAnswer: string;
  whatToAvoid: string;
  tag: string;
}

export interface InterviewPhaseChecklist {
  phase: string;
  timeframe: string;
  items: { title: string; desc: string; icon?: string }[];
}

export const INTERVIEW_CHECKLIST: InterviewPhaseChecklist[] = [
  {
    phase: '1. Preparação (24h antes)',
    timeframe: 'Véspera da entrevista',
    items: [
      {
        title: 'Pesquisa da Empresa',
        desc: 'Entre no site oficial, Instagram e LinkedIn da empresa. Conheça seus principais produtos, clientes e missão.'
      },
      {
        title: 'Alinhamento do Currículo',
        desc: 'Releia seu currículo gerado aqui no app. Tenha na ponta da língua as datas e os resultados das suas experiências.'
      },
      {
        title: 'Planejamento de Rota ou Teste Técnico',
        desc: 'Se presencial: calcule o trajeto com 30 min de folga. Se online: teste microfone, câmera, iluminação e fundo neutro.'
      },
      {
        title: 'Vestimenta Adequada',
        desc: 'Separe roupas sóbrias, limpas e adequadas ao perfil da empresa (desde trajes formais até uniformes/sociais alinhados).'
      }
    ]
  },
  {
    phase: '2. Momento da Entrevista (Durante)',
    timeframe: 'No momento do contato',
    items: [
      {
        title: 'Primeiros 30 Segundos',
        desc: 'Cumprimente com firmeza e cordialidade. Mantenha contato visual, postura ereta e sorriso receptivo.'
      },
      {
        title: 'Escuta Ativa',
        desc: 'Ouça a pergunta inteira antes de responder. Faça uma pausa de 2 segundos para estruturar o raciocínio.'
      },
      {
        title: 'Método STAR nas Respostas',
        desc: 'Situação (contexto) → Tarefa (desafio) → Ação (o que você fez) → Resultado (impacto positivo gerado).'
      },
      {
        title: 'Sinceridade & Humildade',
        desc: 'Se não souber responder algo técnico, seja honesto: "Não vivenciei essa ferramenta ainda, mas aprendo com rapidez".'
      }
    ]
  },
  {
    phase: '3. Encerramento & Pós-Entrevista',
    timeframe: 'Logo após o término',
    items: [
      {
        title: 'Faça Perguntas Inteligentes',
        desc: 'Mostre interesse real: pergunte sobre os desafios da equipe, rotinas do setor e próximos passos do processo.'
      },
      {
        title: 'Agradecimento Profissional',
        desc: 'Agradeça pela oportunidade e tempo dedicado pelo entrevistador. Reitere sua motivação com a vaga.'
      },
      {
        title: 'Mensagem no LinkedIn',
        desc: 'Envie uma mensagem curta e educada de conexão agradecendo pela conversa e se colocando à disposição.'
      }
    ]
  }
];

export const INTERVIEW_QUESTIONS: InterviewQuestionGuide[] = [
  {
    id: 'fale-sobre-voce',
    category: 'classicas',
    question: 'Fale um pouco sobre você e sua trajetória profissional.',
    recruiterGoal: 'Avaliar clareza de comunicação, síntese, autoconfiança e se a sua história se conecta com a vaga.',
    recommendedStructure: 'Fórmula Presente → Passado → Futuro (Em no máximo 2 minutos).',
    exampleAnswer: 'Atualmente atuo como [Sua Função], com foco em organização e cumprimento de metas diárias. Ao longo da minha carreira, desenvolvi sólida vivência prática em rotinas operacionais e trabalho em equipe. Meu objetivo hoje é aplicar minha dedicação nesta vaga, contribuindo diretamente com a qualidade e pontualidade da empresa.',
    whatToAvoid: 'Contar sua vida pessoal desde a infância, listar problemas familiares ou apenas repetir o currículo linha por linha.',
    tag: 'Pergunta Obrigatória'
  },
  {
    id: 'ponto-forte-fraco',
    category: 'classicas',
    question: 'Qual é o seu maior ponto forte e o seu maior ponto a desenvolver (defeito)?',
    recruiterGoal: 'Checar maturidade, autoconsciência e se você busca evoluir ativamente.',
    recommendedStructure: 'Ponto forte com exemplo prático + Ponto fraco real acompanhado de como você já está melhorando.',
    exampleAnswer: 'Meu maior ponto forte é o comprometimento com prazos e o zelo com as ferramentas de trabalho. Como ponto a desenvolver, às vezes sou muito perfeccionista e ficava ansioso(a) quando algo saía do planejado; para contornar isso, hoje uso listas de prioridades e aprendi a ter mais flexibilidade.',
    whatToAvoid: 'Dizer clichês como "meu defeito é ser perfeccionista demais" de forma superficial ou dizer "não tenho defeitos".',
    tag: 'Autoconhecimento'
  },
  {
    id: 'por-que-nossa-empresa',
    category: 'classicas',
    question: 'Por que você quer trabalhar especificamente na nossa empresa?',
    recruiterGoal: 'Descobrir se você pesquisou sobre a organização ou se está apenas distribuindo currículos aleatoriamente.',
    recommendedStructure: 'Fato real da empresa que te chamou a atenção + Como seus valores e objetivos combinam com a cultura dela.',
    exampleAnswer: 'Acompanho o crescimento da [Nome da Empresa] no setor e admiro o padrão de qualidade e respeito aos colaboradores. Me identifico muito com o ambiente dinâmico da organização e sei que minha experiência prática como [Sua Função] pode somar imediatamente na produtividade da equipe.',
    whatToAvoid: 'Dizer "porque estou precisando muito de dinheiro" ou demonstrar que não sabe o que a empresa faz.',
    tag: 'Fit Cultural'
  },
  {
    id: 'situacao-desafiadora',
    category: 'comportamentais',
    question: 'Conte uma situação em que você enfrentou um grande desafio ou pressão no trabalho.',
    recruiterGoal: 'Entender sua resiliência, inteligência emocional e capacidade de resolver conflitos e imprevistos.',
    recommendedStructure: 'Método STAR: Situação (o problema) → Tarefa (sua responsabilidade) → Ação (o que executou) → Resultado (desfecho).',
    exampleAnswer: 'Em uma ocasião, tivemos uma entrega com prazo reduzido pela metade devido a um imprevisto operacional. Assumi a responsabilidade de reorganizar as tarefas com a equipe, priorizamos os itens mais críticos e mantivemos foco total. O resultado foi a entrega concluída sem atrasos e sem avarias nos materiais.',
    whatToAvoid: 'Culpar colegas ou o antigo chefe, ou inventar uma história que não tem um desfecho claro.',
    tag: 'Método STAR'
  },
  {
    id: 'pretensao-salarial',
    category: 'classicas',
    question: 'Qual é a sua pretensão salarial para esta oportunidade?',
    recruiterGoal: 'Saber se a sua expectativa está alinhada ao orçamento da vaga e seu nível de conhecimento de mercado.',
    recommendedStructure: 'Indicar uma faixa salarial compatível com o mercado, mostrando flexibilidade para negociação.',
    exampleAnswer: 'Com base nas minhas pesquisas para a função de [Sua Função] na nossa região e na minha experiência, busco uma remuneração na faixa entre R$ [X] e R$ [Y]. No entanto, estou aberto(a) a entender o plano de benefícios e as oportunidades de crescimento da empresa para negociarmos.',
    whatToAvoid: 'Dar uma resposta evasiva como "qualquer valor está bom" ou exigir um valor desproporcional sem justificativa.',
    tag: 'Negociação'
  },
  {
    id: 'perguntas-fazer-ao-recrutador',
    category: 'perguntas_fazer',
    question: 'Você tem alguma pergunta para nos fazer?',
    recruiterGoal: 'Medir seu entusiasmo, interesse genuíno e raciocínio crítico sobre o dia a dia da vaga.',
    recommendedStructure: 'Fazer 1 a 2 perguntas inteligentes que mostram compromisso com o sucesso do setor.',
    exampleAnswer: 'Sim! Gostaria de saber: Quais são as principais metas ou desafios que a pessoa contratada precisará priorizar nos primeiros 90 dias? E como a empresa costuma avaliar o bom desempenho nesta função?',
    whatToAvoid: 'Dizer "não, nenhuma pergunta" e ir embora, ou perguntar apenas "quando vou ter folga ou férias?".',
    tag: 'Perguntas Estratégicas'
  }
];
