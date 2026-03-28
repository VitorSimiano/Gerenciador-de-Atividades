import { NextRequest, NextResponse } from 'next/server';
import { getAllTasks, createTask } from '@/lib/db';
import { TaskSchema } from '@/lib/schemas';

// GET /api/tasks — lista todas as tarefas
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const search = searchParams.get('search')?.toLowerCase();

  let tasks = getAllTasks();

  if (status && status !== 'all') {
    tasks = tasks.filter((t) => t.status === status);
  }

  if (search) {
    tasks = tasks.filter(
      (t) =>
        t.name.toLowerCase().includes(search) ||
        t.project.toLowerCase().includes(search)
    );
  }

  return NextResponse.json({ data: tasks, total: tasks.length });
}

// POST /api/tasks — cria nova tarefa
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validação com Zod
    const parsed = TaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { date, ...rest } = parsed.data;

    // Converte data de YYYY-MM-DD para DD/MM/YYYY
    const parts = date.split('-');
    const formattedDate =
      parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : date;

    const task = createTask({ ...rest, date: formattedDate });

    return NextResponse.json({ data: task }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}