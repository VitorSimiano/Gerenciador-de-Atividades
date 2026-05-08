import { Task } from '@/types';

// In-memory store — simula um banco de dados
let tasks: Task[] = [
  { id: 1, name: 'Criar tela de login', project: 'Website Redesign', prio: 'high', status: 'done', date: '28/03/2025', assign: 'AL' },
  { id: 2, name: 'Integração com Stripe', project: 'API Integração', prio: 'high', status: 'late', date: '20/03/2025', assign: 'VS' },
  { id: 3, name: 'Wireframes tela inicial', project: 'App Mobile', prio: 'med', status: 'done', date: '26/03/2025', assign: 'AL' },
  { id: 4, name: 'Configurar CI/CD pipeline', project: 'API Integração', prio: 'high', status: 'progress', date: '30/03/2025', assign: 'CM' },
  { id: 5, name: 'Design do sistema de cores', project: 'Website Redesign', prio: 'med', status: 'progress', date: '01/04/2025', assign: 'BS' },
  { id: 6, name: 'Testes unitários módulo auth', project: 'App Mobile', prio: 'high', status: 'late', date: '22/03/2025', assign: 'VS' },
  { id: 7, name: 'Dashboard de métricas', project: 'Dashboard Analytics', prio: 'med', status: 'progress', date: '05/04/2025', assign: 'RC' },
  { id: 8, name: 'Documentação da API REST', project: 'API Integração', prio: 'low', status: 'pending', date: '10/04/2025', assign: 'CM' },
];

let nextId = 9;

export function getAllTasks(): Task[] {
  return [...tasks];
}

export function getTaskById(id: number): Task | undefined {
  return tasks.find((t) => t.id === id);
}

export function createTask(data: Omit<Task, 'id' | 'status'>): Task {
  const task: Task = { ...data, id: nextId++, status: 'pending' };
  tasks.unshift(task);
  return task;
}

export function updateTask(id: number, data: Partial<Omit<Task, 'id'>>): Task | null {
  const idx = tasks.findIndex((t) => t.id === id);
  if (idx === -1) return null;
  tasks[idx] = { ...tasks[idx], ...data };
  return tasks[idx];
}

export function deleteTask(id: number): boolean {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}