export type TemplateType = 'm-coluna' | 'm-moderno' | 'm-ats';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  fieldOfStudy: string;
  completionYear: string;
  status: 'Concluído' | 'Em andamento' | 'Trancado';
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string; // e.g., 'Nativo', 'Fluente (C2)', 'Avançado (C1)', 'Intermediário (B2)', 'Básico (A2)'
}

export interface CVData {
  // Passo 1: Estilo & Configuração
  template: TemplateType;
  primaryColor: string;
  showAIBadge: boolean;
  targetRole: string;
  targetArea: string;

  // Passo 2: Dados Pessoais
  fullName: string;
  roleHeadline: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  portfolioUrl: string;
  photoUrl: string;

  // Passo 3: Resumo
  summary: string;

  // Passo 4: Experiência
  experiences: ExperienceItem[];

  // Passo 5: Formação & Certificações
  education: EducationItem[];
  certifications: CertificationItem[];

  // Passo 6: Habilidades & Idiomas
  hardSkills: string[];
  softSkills: string[];
  languages: LanguageItem[];
}

export interface LinkedInRoleTemplate {
  id: string;
  roleName: string;
  area: string;
  description: string;
  headlines: string[];
  summaries: string[];
  experienceBullets: string[];
  hardSkills: string[];
  softSkills: string[];
  certifications: string[];
  linkedinAbout: string;
  commonKeywords: string[];
  stepTips?: Record<number, string>;
  isAiGenerated?: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

export interface ATSCheckResult {
  score: number;
  status: 'excelente' | 'bom' | 'precisa-melhorar';
  checks: {
    id: string;
    label: string;
    passed: boolean;
    recommendation: string;
    weight: number;
  }[];
}
