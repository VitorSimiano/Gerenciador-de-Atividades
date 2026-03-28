'use client';

import { Task } from '@/types';
import { PRIORITY_CONFIG, STATUS_CONFIG, PROJECT_COLOR_MAP } from '@/data';
import { Check, Trash2 } from 'lucide-react';

interface TaskRowProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskRow({ task, onToggle, onDelete }: TaskRowProps) {
  const prio = PRIORITY_CONFIG[task.prio];
  const status = STATUS_CONFIG[task.status];
  const projClass = PROJECT_COLOR_MAP[task.project] ?? 'tag-gray';
  const isDone = task.status === 'done';

  return (
    <div className="task-row">
      <button
        onClick={() => onToggle(task.id)}
        className={`task-check ${isDone ? 'done' : ''}`}
        aria-label={isDone ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {isDone && <Check size={10} color="white" />}
      </button>

      <div className="task-info">
        <p className={`task-name ${isDone ? 'done' : ''}`}>{task.name}</p>
        <p className="task-meta">Prazo: {task.date}</p>
      </div>

      <span className={`tag ${projClass}`}>{task.project}</span>
      <span className={`tag ${status.tagClass}`}>{status.label}</span>

      <div className="prio">
        <div className={`prio-dot ${prio.dotClass}`} />
        <span style={{ color: 'var(--text-3)' }}>{prio.label}</span>
      </div>

      <div className="task-assignee">{task.assign}</div>

      <button
        onClick={() => onDelete(task.id)}
        className="icon-btn delete-btn"
        aria-label="Remover tarefa"
        title="Remover"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
}