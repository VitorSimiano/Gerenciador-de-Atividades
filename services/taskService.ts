import { Task, Status } from '@/types';
import { TaskFormData } from '@/app/lib/schemas';

const BASE = '/api/tasks';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  issues?: Record<string, string[]>;
}

// GET /api/tasks
export async function fetchTasks(params?: {
  status?: Status | 'all';
  search?: string;
}): Promise<Task[]> {
  const url = new URL(BASE, window.location.origin);
  if (params?.status && params.status !== 'all') url.searchParams.set('status', params.status);
  if (params?.search) url.searchParams.set('search', params.search);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Erro ao buscar tarefas');
  const json = await res.json();
  return json.data as Task[];
}

// POST /api/tasks
export async function createTask(
  data: TaskFormData
): Promise<ApiResponse<Task>> {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (!res.ok) return { error: json.error, issues: json.issues };
  return { data: json.data };
}

// PATCH /api/tasks/:id
export async function updateTask(
  id: number,
  data: Partial<Omit<Task, 'id'>>
): Promise<ApiResponse<Task>> {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  if (!res.ok) return { error: json.error };
  return { data: json.data };
}

// DELETE /api/tasks/:id
export async function deleteTask(id: number): Promise<boolean> {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  return res.ok;
}