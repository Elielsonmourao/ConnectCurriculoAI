import { CVData } from '../types';

export const BLANK_CV_DATA: CVData = {
  template: 'm-coluna',
  primaryColor: '#005b82',
  showAIBadge: false,
  targetRole: 'Assistente Administrativo',
  targetArea: 'Administração & Gestão',
  fullName: '',
  roleHeadline: '',
  email: '',
  phone: '',
  location: '',
  linkedinUrl: '',
  portfolioUrl: '',
  photoUrl: '',
  summary: '',
  experiences: [
    {
      id: 'exp-1',
      role: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      fieldOfStudy: '',
      completionYear: new Date().getFullYear().toString(),
      status: 'Concluído',
    },
  ],
  certifications: [],
  hardSkills: [],
  softSkills: [],
  languages: [
    {
      id: 'lang-1',
      language: 'Português',
      level: 'Nativo',
    },
  ],
};
