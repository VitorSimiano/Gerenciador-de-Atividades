'use client';

import { Task } from '@/types';
import { PRIORITY_CONFIG, STATUS_CONFIG, PROJECT_COLOR_MAP } from '@/data';
import { Check } from 'lucide-react';

interface TaskRowProps {
  task: Task;
  onToggle: (id: number) => void;
}

export default function TaskRow({ task, onToggle }: TaskRowProps) {
  const prio = PRIORITY_CONFIG[task.prio];
  const status = STATUS_CONFIG[task.status];
  const projClass = PROJECT_COLOR_MAP[task.project] ?? 'tag-gray';
  const isDone = task.status === 'done';

  return (
    <div className="task-row" onClick={() => onToggle(task.id)}>
      {/* Checkbox */}
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(task.id); }}
        className={`task-check ${isDone ? 'done' : ''}`}
        aria-label={isDone ? 'Marcar como pendente' : 'Marcar como concluída'}
      >
        {isDone && <Check size={10} strokeWidth={3} color="white" />}
      </button>

      {/* Info */}
      <div className="task-info">
        <p className={`task-name ${isDone ? 'done' : ''}`}>{task.name}</p>
        <p className="task-meta">Prazo: {task.date}</p>
      </div>

      {/* Project tag */}
      <span className={`tag ${projClass}`}>{task.project}</span>

      {/* Status tag */}
      <span className={`tag ${status.tagClass}`}>{status.label}</span>

      {/* Priority */}
      <div className="prio">
        <div className={`prio-dot ${prio.dotClass}`} />
        <span style={{ color: 'var(--color-text-tertiary)' }}>{prio.label}</span>
      </div>

      {/* Assignee */}
      <div className="task-assignee">{task.assign}</div>
    </div>
  );
}