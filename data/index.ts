import { Task, Project, ActivityLog } from '@/types';

export const INITIAL_TASKS: Task[] = [
  { id: 1, name: 'Criar tela de login', project: 'Website Redesign', prio: 'high', status: 'done', date: '28/03/2025', assign: 'AL' },
  { id: 2, name: 'Integração com Stripe', project: 'API Integração', prio: 'high', status: 'late', date: '20/03/2025', assign: 'VS' },
  { id: 3, name: 'Wireframes tela inicial', project: 'App Mobile', prio: 'med', status: 'done', date: '26/03/2025', assign: 'AL' },
  { id: 4, name: 'Configurar CI/CD pipeline', project: 'API Integração', prio: 'high', status: 'progress', date: '30/03/2025', assign: 'CM' },
  { id: 5, name: 'Design do sistema de cores', project: 'Website Redesign', prio: 'med', status: 'progress', date: '01/04/2025', assign: 'BS' },
  { id: 6, name: 'Testes unitários módulo auth', project: 'App Mobile', prio: 'high', status: 'late', date: '22/03/2025', assign: 'VS' },
  { id: 7, name: 'Dashboard de métricas', project: 'Dashboard Analytics', prio: 'med', status: 'progress', date: '05/04/2025', assign: 'RC' },
  { id: 8, name: 'Documentação da API REST', project: 'API Integração', prio: 'low', status: 'pending', date: '10/04/2025', assign: 'CM' },
];

export const PROJECTS: Project[] = [
  { name: 'Website Redesign', colorClass: 'tag-purple', progress: 72 },
  { name: 'App Mobile', colorClass: 'tag-blue', progress: 45 },
  { name: 'API Integração', colorClass: 'tag-amber', progress: 28 },
  { name: 'Dashboard Analytics', colorClass: 'tag-gray', progress: 60 },
];

export const PROJECT_NAMES = PROJECTS.map((p) => p.name);

export const ACTIVITY_LOGS: ActivityLog[] = [
  { id: 1, user: 'Ana Lima', action: 'concluiu', target: '"Wireframes tela inicial"', time: 'há 12 min', dotColor: '#059669' },
  { id: 2, user: 'Carlos Matos', action: 'adicionou nova atividade ao projeto', target: 'App Mobile', time: 'há 1 hora', dotColor: '#1a56db' },
  { id: 3, user: 'Vitor Simiano', action: 'atualizou prazo de', target: '"Integração com Stripe"', time: 'há 3 horas', dotColor: '#D97706' },
  { id: 4, user: 'Beatriz Souza', action: 'marcou', target: '"Testes unitários" como urgente', time: 'ontem', dotColor: '#DC2626' },
  { id: 5, user: 'Rafael Costa', action: 'comentou em', target: '"Design do sistema"', time: 'ontem', dotColor: '#7C3AED' },
];

export const PRIORITY_CONFIG = {
  high: { dotClass: 'bg-red-500', label: 'Alta', tagClass: 'tag-red' },
  med: { dotClass: 'bg-amber-500', label: 'Média', tagClass: 'tag-amber' },
  low: { dotClass: 'bg-green-500', label: 'Baixa', tagClass: 'tag-green' },
} as const;

export const STATUS_CONFIG = {
  pending:  { label: 'Pendente',     tagClass: 'tag-gray' },
  progress: { label: 'Em Andamento', tagClass: 'tag-blue' },
  done:     { label: 'Concluída',    tagClass: 'tag-green' },
  late:     { label: 'Atrasada',     tagClass: 'tag-red' },
} as const;

export const PROJECT_COLOR_MAP: Record<string, string> = {
  'Website Redesign': 'tag-purple',
  'App Mobile': 'tag-blue',
  'API Integração': 'tag-amber',
  'Dashboard Analytics': 'tag-gray',
};

export const TEAM_MEMBERS = ['VS', 'AL', 'CM', 'BS', 'RC'];