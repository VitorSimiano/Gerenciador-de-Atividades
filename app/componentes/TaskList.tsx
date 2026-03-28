'use client';

import { Task, Status } from '@/types';
import TaskRow from './TaskRow';

type FilterType = 'all' | Status;

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  filter: FilterType;
  onFilterChange: (f: FilterType) => void;
  search: string;
  onSearchChange: (s: string) => void;
}

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendente', value: 'pending' },
  { label: 'Em Andamento', value: 'progress' },
  { label: 'Concluída', value: 'done' },
  { label: 'Atrasada', value: 'late' },
];

export default function TaskList({ tasks, onToggle, filter, onFilterChange, search, onSearchChange }: TaskListProps) {
  const filtered = tasks.filter((t) => {
    const matchFilter = filter === 'all' || t.status === filter;
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.project.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section>
      <div className="section-header">
        <h2 className="section-title">Atividades Recentes</h2>
        <div className="filters">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => onFilterChange(value)}
              className={`filter-chip ${filter === value ? 'active' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="tasks-list">
        {filtered.length === 0 ? (
          <p style={{ padding: '24px', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '13px' }}>
            Nenhuma atividade encontrada
          </p>
        ) : (
          filtered.map((task) => (
            <TaskRow key={task.id} task={task} onToggle={onToggle} />
          ))
        )}
      </div>
    </section>
  );
}