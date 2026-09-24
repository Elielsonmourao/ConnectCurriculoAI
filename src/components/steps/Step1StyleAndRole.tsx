import React, { useState, useMemo } from 'react';
import { CVData, TemplateType, LinkedInRoleTemplate } from '../../types';
import { LINKEDIN_ROLE_TEMPLATES, createCustomRoleTemplate } from '../../data/linkedinDatabase';
import { LayoutGrid, Check, Search, Info, Plus, Sparkles, Filter } from 'lucide-react';

interface Step1Props {
  cvData: CVData;
  onChange: (data: Partial<CVData>) => void;
  selectedTemplateRole: LinkedInRoleTemplate;
  onSelectRoleTemplate: (role: LinkedInRoleTemplate) => void;
  onGenerateRoleAI?: (roleName: string, areaName?: string) => Promise<void> | void;
  isGeneratingRoleAI?: boolean;
}

const TEMPLATES: { id: TemplateType; title: string; desc: string; preview: string; badge: string }[] = [
  {
    id: 'm-coluna',
    title: 'Coluna Lateral (Moderno & Organizado)',
    desc: 'Distribui as informações em duas partes: contatos e habilidades na barra lateral e o histórico profissional na área principal. Excelente para leitura rápida.',
    preview: 'coluna',
    badge: 'Mais Escolhido'
  },
  {
    id: 'm-moderno',
    title: 'Moderno (Equilibrado & Elegante)',
    desc: 'Apresenta um cabeçalho de destaque no topo com o seu nome e divide o restante em seções bem delimitadas e legíveis.',
    preview: 'moderno',
    badge: 'Visual Executivo'
  },
  {
    id: 'm-ats',
    title: 'Clássico ATS (Simples & Direto)',
    desc: 'Estrutura tradicional sem colunas, altamente recomendada para cadastros em sites de empregos e sistemas de triagem automática de currículos.',
    preview: 'ats',
    badge: '100% Compatível com Robôs'
  }
];

const COLOR_PALETTES = [
  { name: 'Azul Corporativo', hex: '#005b82' },
  { name: 'Cinza Grafite', hex: '#2d3748' },
  { name: 'Verde Petróleo', hex: '#00875a' },
  { name: 'Azul Marinho Real', hex: '#1e3a8a' },
  { name: 'Bordô Clássico', hex: '#7f1d1d' },
  { name: 'Preto Clássico', hex: '#111827' },
];

export const Step1StyleAndRole: React.FC<Step1Props> = ({
  cvData,
  onChange,
  selectedTemplateRole,
  onSelectRoleTemplate,
  onGenerateRoleAI,
  isGeneratingRoleAI,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  // Categorias disponíveis
  const categories = useMemo(() => {
    const set = new Set<string>();
    LINKEDIN_ROLE_TEMPLATES.forEach(r => set.add(r.area));
    return ['Todas', ...Array.from(set)];
  }, []);

  // Filtragem dinâmica de cargos
  const filteredRoles = useMemo(() => {
    return LINKEDIN_ROLE_TEMPLATES.filter((role) => {
      const matchCategory = selectedCategory === 'Todas' || role.area === selectedCategory;
      const term = searchTerm.toLowerCase().trim();
      const matchSearch =
        !term ||
        role.roleName.toLowerCase().includes(term) ||
        role.area.toLowerCase().includes(term) ||
        role.description.toLowerCase().includes(term) ||
        role.commonKeywords.some(kw => kw.toLowerCase().includes(term));
      return matchCategory && matchSearch;
    });
  }, [searchTerm, selectedCategory]);

  const handleApplyCustomRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    const cleanRole = customRoleInput.trim();
    const customTemplate = createCustomRoleTemplate(cleanRole, 'Cargo Personalizado');
    onSelectRoleTemplate(customTemplate);
    onChange({
      targetRole: customTemplate.roleName,
      targetArea: customTemplate.area,
      roleHeadline: customTemplate.headlines[0] || `${customTemplate.roleName} | Profissional Dedicado a Resultados`
    });
    setCustomRoleInput('');
    setShowCustomInput(false);

    if (onGenerateRoleAI) {
      await onGenerateRoleAI(cleanRole, customTemplate.area);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ORIENTAÇÕES PARA O INÍCIO DO SEU CURRÍCULO */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-4 sm:p-5 text-slate-800 space-y-2">
        <div className="flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-700 shrink-0" />
          <h4 className="font-bold text-blue-950 text-sm">
            Orientações para o início do seu Currículo
          </h4>
        </div>
        <p className="text-xs text-slate-700 leading-relaxed">
          Nesta primeira etapa, você vai definir a base do seu currículo. Não se preocupe se você nunca fez um currículo antes:
        </p>
        <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
          <li>
            <strong>1. Modelo Visual:</strong> Escolha como seu currículo será organizado na folha. Você poderá trocar o modelo a qualquer instante.
          </li>
          <li>
            <strong>2. Cor de Destaque:</strong> Escolha uma cor sóbria e profissional para os títulos e linhas de destaque.
          </li>
          <li>
            <strong>3. Cargo ou Área:</strong> Escolha o cargo ou área em que você deseja trabalhar. O sistema vai preparar exemplos de textos, títulos e palavras-chave sob medida para essa função.
          </li>
        </ul>
      </div>

      {/* 1. ESCOLHA O MODELO VISUAL DA FOLHA */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
            Escolha o Modelo Visual da Folha
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Todos os modelos são limpos, legíveis e respeitam as regras do mercado de trabalho.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {TEMPLATES.map((tmpl) => {
            const isSelected = cvData.template === tmpl.id;
            return (
              <button
                key={tmpl.id}
                type="button"
                onClick={() => onChange({ template: tmpl.id })}
                className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  {/* Prévia visual esquemática */}
                  <div className="h-20 bg-slate-100 rounded-lg border border-slate-200/80 mb-3 overflow-hidden flex shadow-2xs">
                    {tmpl.preview === 'coluna' && (
                      <>
                        <div className="w-1/3 bg-slate-200/70 p-1.5 flex flex-col space-y-1 border-r border-slate-200">
                          <div className="w-5 h-5 rounded-full bg-slate-300 mx-auto" />
                          <div className="w-full h-1 bg-slate-300 rounded" />
                          <div className="w-3/4 h-1 bg-slate-300 rounded" />
                          <div className="w-full h-1 bg-slate-300 rounded mt-2" />
                        </div>
                        <div className="w-2/3 p-2 flex flex-col space-y-1.5">
                          <div className="w-3/4 h-2 bg-slate-400 rounded" />
                          <div className="w-full h-1 bg-slate-300 rounded" />
                          <div className="w-full h-1 bg-slate-200 rounded" />
                          <div className="w-4/5 h-1 bg-slate-200 rounded" />
                        </div>
                      </>
                    )}
                    {tmpl.preview === 'moderno' && (
                      <div className="w-full flex flex-col">
                        <div className="h-6 bg-slate-300/80 p-1 flex items-center justify-between px-2">
                          <div className="w-1/2 h-2 bg-slate-500 rounded" />
                          <div className="w-1/4 h-1.5 bg-slate-400 rounded" />
                        </div>
                        <div className="p-2 space-y-1 flex-1">
                          <div className="w-full h-1 bg-slate-300 rounded" />
                          <div className="w-full h-1 bg-slate-200 rounded" />
                          <div className="w-3/4 h-1 bg-slate-200 rounded" />
                        </div>
                      </div>
                    )}
                    {tmpl.preview === 'ats' && (
                      <div className="w-full p-2 bg-white flex flex-col justify-center space-y-1">
                        <div className="w-1/2 h-1.5 bg-slate-700 rounded mx-auto" />
                        <div className="w-3/4 h-1 bg-slate-300 rounded mx-auto" />
                        <div className="w-full h-0.5 bg-slate-200 my-0.5" />
                        <div className="w-full h-1 bg-slate-200 rounded" />
                        <div className="w-4/5 h-1 bg-slate-200 rounded" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{tmpl.title}</span>
                    {isSelected && <Check className="w-4 h-4 text-blue-600" />}
                  </div>
                  <span className="inline-block text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded mt-1 border border-blue-100">
                    {tmpl.badge}
                  </span>
                  <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                    {tmpl.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. COR DE DESTAQUE DO CURRÍCULO */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
            Cor de Destaque do Currículo
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Cores sóbrias transmitem maturidade e seriedade aos olhos dos recrutadores.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap pt-1">
          {COLOR_PALETTES.map((palette) => {
            const isSelected = cvData.primaryColor === palette.hex;
            return (
              <button
                key={palette.hex}
                type="button"
                onClick={() => onChange({ primaryColor: palette.hex })}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <span
                  className="w-4 h-4 rounded-full border border-black/10 shadow-2xs flex items-center justify-center text-white"
                  style={{ backgroundColor: palette.hex }}
                >
                  {isSelected && <Check className="w-2.5 h-2.5" />}
                </span>
                <span className="text-xs font-medium text-slate-700">{palette.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SELEÇÃO AMPLA E PESQUISA DE CARGOS */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">3</span>
              Selecione o seu Cargo ou Área de Atuação
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Temos dezenas de cargos catalogados com os termos mais valorizados pelos contratantes.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCustomInput(!showCustomInput)}
            className="text-xs font-semibold text-blue-700 hover:text-blue-900 flex items-center gap-1 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200"
          >
            <Plus className="w-3.5 h-3.5" />
            {showCustomInput ? 'Fechar campo manual' : 'Não encontrou? Digitar outro cargo'}
          </button>
        </div>

        {/* Campo para Digitar Cargo Manualmente se desejar */}
        {showCustomInput && (
          <form onSubmit={handleApplyCustomRole} className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 space-y-2.5 animate-in fade-in">
            <span className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-blue-600" />
              Cadastrar Cargo Personalizado
            </span>
            <p className="text-[11px] text-slate-600">
              Digite exatamente a função desejada. A inteligência do sistema formulará os textos para ela:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={customRoleInput}
                onChange={(e) => setCustomRoleInput(e.target.value)}
                placeholder="Ex: Auxiliar de Logística, Mecânico Industrial, Recepcionista..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-blue-500 outline-none bg-white font-medium"
              />
              <button
                type="submit"
                disabled={!customRoleInput.trim() || isGeneratingRoleAI}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer disabled:opacity-50 transition-colors flex items-center gap-1"
              >
                <span>{isGeneratingRoleAI ? 'Gerando...' : 'Aplicar'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Barra de Pesquisa de Cargos */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar por cargo, área ou palavra-chave (ex: 'Soldador', 'TI', 'Administrativo')..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:border-blue-500 outline-none transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Limpar
            </button>
          )}
        </div>

        {/* Filtros por Categoria / Área */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 text-[11px] font-medium flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3" /> Área:
          </span>
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grade de Cargos Disponíveis */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {filteredRoles.length > 0 ? (
            filteredRoles.map((role) => {
              const isSelected = selectedTemplateRole.id === role.id;
              return (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => {
                    onSelectRoleTemplate(role);
                    onChange({
                      targetRole: role.roleName,
                      targetArea: role.area,
                      roleHeadline: role.headlines[0] || `${role.roleName} | Profissional Qualificado`
                    });
                  }}
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-600/20 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <span className="text-xs font-bold text-slate-900 leading-snug">{role.roleName}</span>
                      {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
                    </div>
                    <span className="text-[10px] font-semibold text-blue-800/80 block mt-0.5">{role.area}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                    {role.description}
                  </p>
                </button>
              );
            })
          ) : (
            <div className="col-span-full py-6 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300 p-4">
              <p className="text-xs">Nenhum cargo encontrado com o termo "{searchTerm}".</p>
              <button
                type="button"
                onClick={() => {
                  setCustomRoleInput(searchTerm);
                  setShowCustomInput(true);
                }}
                className="mt-2 text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                Clique aqui para cadastrar "{searchTerm}" como seu cargo personalizado
              </button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
