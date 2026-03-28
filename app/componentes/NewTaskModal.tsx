'use client';

import { useState, useEffect, useRef } from 'react';
import { Priority, Task } from '@/types';
import { PROJECT_NAMES, TEAM_MEMBERS } from '@/data';
import { X } from 'lucide-react';

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Omit<Task, 'id' | 'status'>) => void;
}

export default function NewTaskModal({ open, onClose, onAdd }: NewTaskModalProps) {
  const [name, setName] = useState('');
  const [project, setProject] = useState(PROJECT_NAMES[0]);
  const [prio, setPrio] = useState<Priority>('med');
  const [date, setDate] = useState('');
  const [assign, setAssign] = useState(TEAM_MEMBERS[0]);
  const [error, setError] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setName('');
      setError(false);
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  function handleSubmit() {
    if (!name.trim()) { setError(true); return; }
    const parts = date.split('-');
    const formatted = parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : '';
    onAdd({ name: name.trim(), project, prio, date: formatted, assign });
    onClose();
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={handleBackdrop}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 id="modal-title" className="modal-title" style={{ margin: 0 }}>Nova Atividade</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)', display: 'flex' }}>
            <X size={18} />
          </button>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-name">Nome da atividade *</label>
          <input
            ref={nameRef}
            id="task-name"
            className="form-input"
            placeholder="Ex: Criar tela de login"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(false); }}
            style={error ? { borderColor: '#DC2626' } : undefined}
          />
          {error && <p style={{ fontSize: '11px', color: '#DC2626', marginTop: '4px' }}>Campo obrigatório</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-project">Projeto</label>
            <select id="task-project" className="form-select" value={project} onChange={(e) => setProject(e.target.value)}>
              {PROJECT_NAMES.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="task-prio">Prioridade</label>
            <select id="task-prio" className="form-select" value={prio} onChange={(e) => setPrio(e.target.value as Priority)}>
              <option value="low">Baixa</option>
              <option value="med">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-date">Prazo</label>
            <input id="task-date" type="date" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="task-assign">Responsável</label>
            <select id="task-assign" className="form-select" value={assign} onChange={(e) => setAssign(e.target.value)}>
              {TEAM_MEMBERS.map((m) => <option key={m}>{m}</option>)}
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Criar Atividade</button>
        </div>
      </div>
    </div>
  );
}