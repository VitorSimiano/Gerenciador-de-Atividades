import { NextRequest, NextResponse } from 'next/server';
import { getTaskById, updateTask, deleteTask } from '@/app/lib/db';
import { UpdateTaskSchema } from '@/app/lib/schemas';

type Params = { params: Promise<{ id: string }> };

// GET /api/tasks/:id
export async function GET(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const task = getTaskById(Number(id));

  if (!task) {
    return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });
  }

  return NextResponse.json({ data: task });
}

// PATCH /api/tasks/:id — atualiza parcialmente (status, nome, etc.)
export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await req.json();

    const parsed = UpdateTaskSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: 'Dados inválidos',
          issues: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const updated = updateTask(Number(id), parsed.data);

    if (!updated) {
      return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });
    }

    return NextResponse.json({ data: updated });
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

// DELETE /api/tasks/:id
export async function DELETE(_req: NextRequest, { params }: Params) {
  const { id } = await params;
  const deleted = deleteTask(Number(id));

  if (!deleted) {
    return NextResponse.json({ error: 'Tarefa não encontrada' }, { status: 404 });
  }

  return NextResponse.json({ message: 'Tarefa removida com sucesso' });
}