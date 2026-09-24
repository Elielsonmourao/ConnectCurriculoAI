import { LinkedInRoleTemplate } from '../types';

export interface RoleTipItem {
  id: number | string;
  title: string;
  content: string;
  tip?: string;
  actionableSnippet?: string;
  actionableInsight?: string;
  targetField?: string;
  tag?: string;
}

/**
 * Gera um acervo diversificado e dinâmico de 8 a 10 sugestões e orientações exclusivas
 * para cada etapa do assistente (Passos 1 a 7).
 * Garante que NENHUMA sugestão aqui repita os modelos do card "Exemplos".
 */
export function getRoleStepTips(roleTemplate: LinkedInRoleTemplate, step: number): RoleTipItem[] {
  const role = roleTemplate?.roleName?.trim() || 'Profissional';
  const area = roleTemplate?.area?.trim() || 'Mercado Geral';

  switch (step) {
    case 1:
      return [
        {
          id: 101,
          title: `Modelo Visual Estratégico para ${role}`,
          content: `Para posições em ${area}, a clareza de leitura imediata é o fator decisivo. O modelo "Coluna Lateral" é ideal se você deseja evidenciar seus contatos e competências técnicas em primeiro plano. Já o modelo "Clássico ATS" garante máxima compatibilidade com softwares de triagem como a Gupy e Kenoby.`,
          tag: 'Design & ATS',
          actionableSnippet: `Configuração Recomendada para ${role}: Modelo Coluna Lateral ou Clássico ATS, estruturado rigorosamente em 1 página objetiva.`,
          targetField: 'copyText'
        },
        {
          id: 102,
          title: `Paleta de Cores Corporativas de Alta Credibilidade`,
          content: `Tons neutros e sóbrios como Azul Corporativo, Cinza Grafite ou Verde Floresta comunicam maturidade, disciplina e equilíbrio profissional. Evite cores fluorescentes ou fundos escuros que dificultem a impressão física da folha.`,
          tag: 'Identidade Visual',
          actionableSnippet: `Paleta recomendada para ${role}: Azul Corporativo ou Cinza Grafite para elegância e alta legibilidade em impressões preto e branco.`,
          targetField: 'copyText'
        },
        {
          id: 103,
          title: `Regra de Ouro da Escaneabilidade em 1 Página`,
          content: `Recrutadores dedicam em média de 6 a 10 segundos na primeira triagem para vagas de ${role}. Manter todas as informações relevantes concentradas em uma única folha garante que o contratante visualize seus pontos fortes sem precisar rolar a página.`,
          tag: 'Escaneabilidade',
          actionableSnippet: `Mantenha o currículo de ${role} em 1 página, priorizando suas 3 experiências mais recentes e qualificações de maior impacto.`,
          targetField: 'copyText'
        },
        {
          id: 104,
          title: `Diretrizes Profissionais para Foto no Currículo`,
          content: `A foto deve ser recente, com enquadramento do peito para cima, fundo neutro e boa iluminação natural. Evite fotos recortadas de redes sociais, festas ou com óculos de sol. A imagem deve transmitir confiança e prontidão para o trabalho.`,
          tag: 'Apresentação Pessoal',
          actionableSnippet: `Foto Profissional: Postura receptiva, camisa lisa, fundo limpo e iluminação clara, sem filtros de redes sociais.`,
          targetField: 'copyText'
        },
        {
          id: 105,
          title: `Hierarquia Visual e Tipografia Sem Ruídos`,
          content: `Fontes modernas e limpas garantem leitura sem cansaço visual. Todos os modelos da plataforma utilizam tamanhos proporcionais para cabeçalhos, títulos de seção e marcadores de texto.`,
          tag: 'Tipografia & ATS',
          actionableSnippet: `Hierarquia visual padronizada: seções destacadas em negrito e espaçamento equilibrado entre experiências.`,
          targetField: 'copyText'
        },
        {
          id: 106,
          title: `Contraste e Nitidez para Impressão em Preto e Branco`,
          content: `Muitas empresas e agências de recrutamento imprimem currículos em preto e branco. Verifique se os textos mantêm alto contraste com o fundo branco da folha A4.`,
          tag: 'Qualidade de Impressão',
          actionableSnippet: `Garantia de contraste: textos em preto/grafite escuro sobre fundo branco 100% legíveis em qualquer impressora.`,
          targetField: 'copyText'
        }
      ];

    case 2:
      return [
        {
          id: 201,
          title: `Headline Focado em Produtividade e Eficiência Operacional`,
          content: `Este título destaca agilidade prática, cumprimento de padrões e rigor no fluxo de trabalho diário de ${role}.`,
          tag: 'Produtividade & Foco',
          actionableSnippet: `${role} | Produtividade Operacional, Cumprimento de Metas & Alta Eficiência`,
          targetField: 'roleHeadline'
        },
        {
          id: 202,
          title: `Headline com Ênfase em Segurança, Qualidade e Normas`,
          content: `Ideal para transmitir responsabilidade imediata e conformidade com procedimentos padronizados e normas da empresa.`,
          tag: 'Qualidade & Normas',
          actionableSnippet: `Profissional de ${role} | Padrões de Qualidade, Procedimentos Operacionais (POP) & Segurança`,
          targetField: 'roleHeadline'
        },
        {
          id: 203,
          title: `Headline Focado em Organização, Método e Pontualidade`,
          content: `Empresas valorizam profissionais assíduos que cuidam do setor e realizam tarefas sem necessidade de supervisão constante.`,
          tag: 'Disciplina & Rotina',
          actionableSnippet: `${role} | Organização de Ambientes, Assiduidade Rigorosa & Disciplina no Trabalho`,
          targetField: 'roleHeadline'
        },
        {
          id: 204,
          title: `Headline Voltado para Início de Carreira ou Transição`,
          content: `Para quem está ingressando na área ou buscando nova colocação, ressalte facilidade para aprender rotinas e dedicação.`,
          tag: 'Transição / Primeiro Emprego',
          actionableSnippet: `Candidato a ${role} | Aprendizado Rápido, Dedicação Integral & Facilidade com Rotinas Práticas`,
          targetField: 'roleHeadline'
        },
        {
          id: 205,
          title: `Headline com Foco em Atendimento e Relacionamento Interpessoal`,
          content: `Excelente para demonstrar cordialidade, comunicação respeitosa com clientes, colegas e superiores.`,
          tag: 'Atendimento & Empatia',
          actionableSnippet: `${role} | Cordialidade no Atendimento, Cooperação em Equipe & Comunicação Clara`,
          targetField: 'roleHeadline'
        },
        {
          id: 206,
          title: `Headline Focado em Resolução Ágil de Demandas e Autonomia`,
          content: `Destaca proatividade para solucionar imprevistos operacionais com prontidão e sem burocracia.`,
          tag: 'Agilidade & Autonomia',
          actionableSnippet: `${role} | Resolução Prática de Problemas, Agilidade em Demandas Rápidas & Proatividade`,
          targetField: 'roleHeadline'
        },
        {
          id: 207,
          title: `Headline Especialista com Foco em Ferramentas e Métodos`,
          content: `Valoriza o domínio prático de ferramentas, equipamentos e registros diários indispensáveis para a função.`,
          tag: 'Habilidade Técnica',
          actionableSnippet: `${role} Especializado | Controle de Materiais, Manuseio de Ferramentas & Rotinas Técnicas`,
          targetField: 'roleHeadline'
        },
        {
          id: 208,
          title: `Headline com Foco em Redução de Custos e Zero Desperdício`,
          content: `Demonstra consciência econômica com os recursos e materiais de trabalho fornecidos pela organização.`,
          tag: 'Economia & Sustentabilidade',
          actionableSnippet: `Profissional de ${role} | Otimização de Insumos, Redução de Desperdícios & Cuidado Patrimonial`,
          targetField: 'roleHeadline'
        }
      ];

    case 3:
      return [
        {
          id: 301,
          title: `Resumo Focado em Agilidade Operacional e Produtividade`,
          content: `Este resumo demonstra rapidez na execução de ordens de serviço, pontualidade britânica e capacidade de manter alto rendimento mesmo em horários de pico.`,
          tag: 'Alta Produtividade',
          actionableSnippet: `Profissional com sólida dedicação na função de ${role}, destacando-se pela rapidez na execução de atividades, disciplina e atenção aos detalhes operacionais. Comprometido(a) com a entrega de serviços com excelência, respeito aos horários e colaboração diária para o alcance dos objetivos da equipe.`,
          targetField: 'summary'
        },
        {
          id: 302,
          title: `Resumo com Foco em Disciplina, Assiduidade e Ética`,
          content: `Focado em transmitir máxima segurança ao contratante: histórico de frequência impecável, seriedade e respeito absoluto às normas internas da organização.`,
          tag: 'Disciplina & Confiabilidade',
          actionableSnippet: `${role} responsável, assíduo(a) e com forte ética de trabalho. Possuo facilidade para seguir manuais de procedimentos, zelo com o patrimônio da empresa e postura cooperativa. Disponibilidade para horários flexíveis e comprometimento permanente com a harmonia no ambiente de trabalho.`,
          targetField: 'summary'
        },
        {
          id: 303,
          title: `Resumo com Ênfase em Cuidado com Recursos e Segurança`,
          content: `Destaca o uso correto de equipamentos, preservação de materiais de trabalho e rigoroso cumprimento de normas de segurança e prevenção de acidentes.`,
          tag: 'Segurança & Cuidado',
          actionableSnippet: `Atuação prática como ${role} com foco permanente em conservação de materiais, controle de insumos e aplicação rigorosa das normas de higiene e segurança do trabalho. Perfil atento, organizado e com postura preventiva para evitar retrabalhos e desperdícios no setor.`,
          targetField: 'summary'
        },
        {
          id: 304,
          title: `Resumo para Início de Carreira, Jovem Aprendiz ou Transição`,
          content: `Ideal para quem está começando na área: valoriza disposição física, facilidade para assimilar novos métodos operacionais e vontade genuína de crescer.`,
          tag: 'Primeiro Emprego / Transição',
          actionableSnippet: `Profissional em busca de oportunidade como ${role}, com forte motivação, energia e facilidade para aprender procedimentos operacionais e rotinas práticas. Comprometido(a) em cumprir ordens de serviço com pontualidade, respeitar a liderança e evoluir continuamente na empresa.`,
          targetField: 'summary'
        },
        {
          id: 305,
          title: `Resumo Focado em Atendimento ao Cliente e Boa Comunicação`,
          content: `Perfeito se a vaga de ${role} envolver contato direto com o público, clientes internos ou recepção de pessoas.`,
          tag: 'Atendimento & Relações Humanas',
          actionableSnippet: `${role} com facilidade de comunicação, postura gentil e foco total na satisfação de clientes e usuários. Experiência em acolher demandas com agilidade, solucionar dúvidas com cordialidade e manter um relacionamento saudável e cooperativo com colegas de todos os setores.`,
          targetField: 'summary'
        },
        {
          id: 306,
          title: `Resumo Focado em Resolução Prática de Imprevistos e Autonomia`,
          content: `Demonstra que você é um(a) profissional resolutivo(a), que toma iniciativas conscientes para que o fluxo de trabalho nunca pare.`,
          tag: 'Autonomia & Prontidão',
          actionableSnippet: `Profissional de ${role} proativo(a) e dinâmico(a), com facilidade para identificar prioridades e solucionar imprevistos cotidianos com agilidade. Histórico de autonomia na execução de tarefas, relacionamento transparente com a supervisão e foco constante em melhoria contínua.`,
          targetField: 'summary'
        },
        {
          id: 307,
          title: `Resumo com Ênfase em Metodologia 5S e Padronização`,
          content: `Chama a atenção de gerentes de operações ao demonstrar conhecimento de organização sistemática de ferramentas e ambientes.`,
          tag: 'Método 5S & Padronização',
          actionableSnippet: `Atuação profissional como ${role} orientada pela metodologia 5S e boas práticas de padronização. Habilidade em manter ferramentas organizadas, áreas limpas e estoques controlados, garantindo um ambiente produtivo, seguro e agradável para toda a equipe.`,
          targetField: 'summary'
        },
        {
          id: 308,
          title: `Resumo Sênior / Experiência Consolidada no Setor`,
          content: `Para quem já possui ampla bagagem prática na função e deseja destacar segurança, estabilidade e capacidade de treinar novos colegas.`,
          tag: 'Experiência Consolidada',
          actionableSnippet: `Profissional com trajetória consolidada na área de ${role}, dominando rotinas técnicas, procedimentos de manutenção e gestão de prioridades operacionais. Reconhecido(a) pela liderança pelo exemplo, maturidade no trato diário e capacidade de apoiar a integração de novos colaboradores.`,
          targetField: 'summary'
        }
      ];

    case 4:
      return [
        {
          id: 401,
          title: `Conquista com Redução de Desperdício e Otimização de Insumos`,
          content: `Demonstra responsabilidade com o orçamento da empresa e capacidade de gerenciar ferramentas e materiais sem desperdícios.`,
          tag: 'Economia & Eficiência',
          actionableSnippet: `• Otimizei a utilização de insumos e materiais de trabalho nas rotinas de ${role}, reduzindo perdas e retrabalhos em aproximadamente 15% ao longo do período.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 402,
          title: `Cumprimento Rigoroso de Prazos e Metas Diárias`,
          content: `Destaca assiduidade e capacidade de entregar 100% das demandas atribuídas pela liderança no tempo correto.`,
          tag: 'Cumprimento de Prazos',
          actionableSnippet: `• Cumpri com 100% de pontualidade os cronogramas e ordens de serviço diárias, garantindo a continuidade ininterrupta das operações do setor.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 403,
          title: `Implementação de Rotinas de Organização e Método 5S`,
          content: `Mostra que você transformou o espaço de trabalho em um local mais ágil, seguro e ordenado.`,
          tag: 'Organização 5S',
          actionableSnippet: `• Apliquei conceitos de organização 5S na conservação de ferramentas e armários de suprimentos, agilizando o acesso aos materiais necessários para a rotina diária.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 404,
          title: `Atendimento com Excelência e Agilidade nos Chamados`,
          content: `Valoriza a velocidade de resposta e a cordialidade no relacionamento com clientes e outros departamentos.`,
          tag: 'Atendimento & Rapidez',
          actionableSnippet: `• Atendi solicitações operacionais emergenciais com tempo médio de resposta reduzido, recebendo avaliações positivas de gestores e clientes internos.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 405,
          title: `Zero Acidentes e Conformidade com Normas de Segurança`,
          content: `Fundamental para funções práticas: atesta cuidado rigoroso com a integridade própria e dos companheiros de equipe.`,
          tag: 'Segurança & Zero Acidentes',
          actionableSnippet: `• Utilizei com rigor todos os Equipamentos de Proteção Individual (EPIs), mantendo índice zero de acidentes e conformidade estrita com normas regulamentadoras.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 406,
          title: `Apoio na Integração e Treinamento de Novos Colegas`,
          content: `Demonstra espírito de liderança pelo exemplo e disposição para transmitir procedimentos corretos da empresa.`,
          tag: 'Cooperação & Treinamento',
          actionableSnippet: `• Auxiliei a coordenação no acolhimento e repasse prático de rotinas básicas para novos colaboradores admitidos no setor de ${role}.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 407,
          title: `Controle Minucioso de Checklists e Relatórios Diários`,
          content: `Evidencia organização documental e garantia de que nenhum detalhe operacional passe despercebido.`,
          tag: 'Checklist & Controle',
          actionableSnippet: `• Realizei preenchimento diário de checklists operacionais e livros de ocorrência, assegurando transparência total na passagem de turno e controle de demandas.`,
          targetField: 'appendExperienceBullet'
        },
        {
          id: 408,
          title: `Atuação sob Pressão em Períodos de Alto Volume`,
          content: `Mostra estabilidade emocional e foco para manter a qualidade mesmo durante picos de movimento.`,
          tag: 'Resiliência Operacional',
          actionableSnippet: `• Mantive alto padrão de qualidade e atenção concentrada durante períodos de pico e alta demanda, assegurando a entrega das tarefas sem ocorrência de falhas.`,
          targetField: 'appendExperienceBullet'
        }
      ];

    case 5:
      return [
        {
          id: 501,
          title: `Curso Profissionalizante Prático — SENAI`,
          content: `Cursos do SENAI são amplamente reconhecidos no mercado brasileiro como selo de qualidade operacional e disciplina técnica para ${role}.`,
          tag: 'Qualificação SENAI',
          actionableSnippet: `Curso Profissionalizante de Capacitação Prática em ${role} — SENAI`,
          targetField: 'addCertification'
        },
        {
          id: 502,
          title: `Treinamento de Normas de Segurança e EPIs (NR-06)`,
          content: `Comprova que você tem conhecimento formal sobre o uso consciente de Equipamentos de Proteção Individual e preservação da saúde no trabalho.`,
          tag: 'Segurança do Trabalho',
          actionableSnippet: `Treinamento de Uso Correto e Conservação de EPIs (NR-06) — 8h`,
          targetField: 'addCertification'
        },
        {
          id: 503,
          title: `Metodologia 5S e Boas Práticas Operacionais`,
          content: `Certificação valorizada em empresas que prezam por padronização, limpeza sistemática e eliminação de desperdícios.`,
          tag: 'Método 5S',
          actionableSnippet: `Capacitação em Metodologia 5S e Boas Práticas de Organização no Trabalho`,
          targetField: 'addCertification'
        },
        {
          id: 504,
          title: `Atendimento ao Cliente e Relações Humanas no Trabalho`,
          content: `Destaque para profissionais que lidam com pessoas, colegas de outros setores ou público externo no dia a dia de ${role}.`,
          tag: 'Comunicação & Atendimento',
          actionableSnippet: `Atendimento ao Cliente, Cordialidade e Relações Interpessoais — SEBRAE/SENAC`,
          targetField: 'addCertification'
        },
        {
          id: 505,
          title: `Noções de Primeiros Socorros e Prevenção de Sinistros`,
          content: `Agrega enorme valor ao currículo demonstrando que você está preparado para agir com calma diante de imprevistos ou emergências.`,
          tag: 'Prevenção & Emergência',
          actionableSnippet: `Noções Básicas de Primeiros Socorros e Prevenção de Acidentes de Trabalho`,
          targetField: 'addCertification'
        },
        {
          id: 506,
          title: `Informática Básica e Ferramentas de Registro Digital`,
          content: `Indispensável mesmo para cargos operacionais, já que sistemas de ponto eletrônico, ordens de serviço e mensagens são digitais.`,
          tag: 'Tecnologia Básica',
          actionableSnippet: `Informática Básica (Windows, Navegação na Web e Preenchimento de Planilhas)`,
          targetField: 'addCertification'
        },
        {
          id: 507,
          title: `Gestão de Rotinas e Procedimentos Operacionais Padrão (POP)`,
          content: `Demonstra familiaridade com a leitura e execução estrita de roteiros técnicos padronizados estabelecidos pela gerência.`,
          tag: 'Padronização Técnica',
          actionableSnippet: `Treinamento em Procedimentos Operacionais Padrão (POP) e Controle de Qualidade`,
          targetField: 'addCertification'
        },
        {
          id: 508,
          title: `Comunicação Assertiva e Trabalho Colaborativo`,
          content: `Mostra inteligência emocional para evitar desentendimentos e fortalecer o trabalho conjunto na empresa.`,
          tag: 'Desenvolvimento Pessoal',
          actionableSnippet: `Comunicação Assertiva, Resolução de Conflitos e Trabalho em Equipe`,
          targetField: 'addCertification'
        }
      ];

    case 6:
      return [
        {
          id: 601,
          title: `Competência Técnica: Procedimentos Operacionais Padrão`,
          content: `Capacidade comprovada de seguir manuais de instruções e rotinas sem desvios de processo.`,
          tag: 'Hard Skill Estratégica',
          actionableSnippet: `Execução de Rotinas Técnicas e Procedimentos Operacionais Padrão (POP)`,
          targetField: 'addHardSkill'
        },
        {
          id: 602,
          title: `Competência Técnica: Controle e Conservação de Insumos`,
          content: `Rastreamento de materiais, conferência de itens e manutenção preventiva de ferramentas.`,
          tag: 'Hard Skill Prática',
          actionableSnippet: `Controle de Insumos, Ferramentas e Conservação de Equipamentos`,
          targetField: 'addHardSkill'
        },
        {
          id: 603,
          title: `Competência Técnica: Normas de Higiene e Segurança (EPIs)`,
          content: `Conhecimento prático das medidas de proteção e normas de segurança estabelecidas por lei.`,
          tag: 'Hard Skill Regulamentar',
          actionableSnippet: `Normas de Segurança do Trabalho e Utilização de EPIs (NR-06)`,
          targetField: 'addHardSkill'
        },
        {
          id: 604,
          title: `Competência Técnica: Organização e Metodologia 5S`,
          content: `Habilidade em manter postos de trabalho ordenados e livres de materiais desnecessários.`,
          tag: 'Hard Skill Organizacional',
          actionableSnippet: `Organização de Ambientes de Trabalho e Aplicação do Método 5S`,
          targetField: 'addHardSkill'
        },
        {
          id: 605,
          title: `Competência Técnica: Registro e Preenchimento de Checklists`,
          content: `Atenção no apontamento de ocorrências diárias e conferência detalhada de tarefas.`,
          tag: 'Hard Skill de Controle',
          actionableSnippet: `Preenchimento de Checklists Diários e Relatórios de Acompanhamento`,
          targetField: 'addHardSkill'
        },
        {
          id: 606,
          title: `Competência Comportamental: Assiduidade e Pontualidade`,
          content: `A qualidade número 1 mais valorizada por gerentes operacionais em todo o Brasil.`,
          tag: 'Soft Skill Essencial',
          actionableSnippet: `Pontualidade Rigorosa, Assiduidade e Compromisso com Horários`,
          targetField: 'addSoftSkill'
        },
        {
          id: 607,
          title: `Competência Comportamental: Cooperação e Trabalho em Equipe`,
          content: `Facilidade para manter um ambiente sadio e ajudar colegas em momentos de sobrecarga.`,
          tag: 'Soft Skill Interpessoal',
          actionableSnippet: `Trabalho em Equipe, Respeito e Postura Colaborativa`,
          targetField: 'addSoftSkill'
        },
        {
          id: 608,
          title: `Competência Comportamental: Proatividade e Resolução Rápida`,
          content: `Iniciativa para resolver pendências sem esperar que pequenos problemas se agravem.`,
          tag: 'Soft Skill de Atitude',
          actionableSnippet: `Proatividade, Agilidade e Resolução Prática de Problemas`,
          targetField: 'addSoftSkill'
        }
      ];

    case 7:
    default:
      return [
        {
          id: 701,
          title: `Apresentação Estratégica para a Seção "Sobre" do LinkedIn`,
          content: `Texto completo e caloroso em primeira pessoa para seu perfil na rede profissional mais importante do mundo.`,
          tag: 'Perfil LinkedIn',
          actionableSnippet: `Olá! Sou profissional com atuação na área de ${role}, focado(a) em exercer minhas atividades com total disciplina, pontualidade e excelência prática.\n\nPossuo sólida vivência em rotinas operacionais, organização de materiais e cumprimento de normas de segurança. Me destaco pelo relacionamento colaborativo com a equipe e constante vontade de aprimorar meus conhecimentos.\n\nEstou disponível para novas oportunidades de trabalho. Vamos conversar?`,
          targetField: 'copyText'
        },
        {
          id: 702,
          title: `Mensagem de Apresentação Educada para Envio do Currículo`,
          content: `Texto pronto para você colar no corpo do e-mail ou no WhatsApp ao se candidatar à vaga.`,
          tag: 'Abordagem de Recrutador',
          actionableSnippet: `Prezado(a) recrutador(a), encaminho em anexo meu currículo profissional para a vaga de ${role}. Possuo total disponibilidade de início e flexibilidade de horários. Agradeço desde já pela consideração e coloco-me à inteira disposição para entrevista. Atenciosamente.`,
          targetField: 'copyText'
        },
        {
          id: 703,
          title: `Padronização de Nome do Arquivo PDF`,
          content: `Facilite a vida do selecionador renomeando o arquivo com seu nome e a função pretendida antes do envio.`,
          tag: 'Organização de Envio',
          actionableSnippet: `Curriculo_${role.replace(/\s+/g, '_')}.pdf`,
          targetField: 'copyText'
        },
        {
          id: 704,
          title: `Verificação Final dos Dados de Contato`,
          content: `Revise com atenção se o número do celular com DDD possui WhatsApp ativo e se o e-mail não contém letras trocadas.`,
          tag: 'Revisão Crítica',
          actionableSnippet: `Confirme se o DDD e os 9 dígitos do WhatsApp estão atualizados e se o e-mail não possui caracteres invertidos.`,
          targetField: 'copyText'
        }
      ];
  }
}
