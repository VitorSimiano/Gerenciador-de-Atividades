'use client';

import { useState, useEffect, useRef } from 'react';
import { Task, Priority } from '@/types';
import { TaskSchema, TaskFormData } from '../lib/schemas';
import { PROJECT_NAMES, TEAM_MEMBERS } from '@/data';
import { createTask } from '@/services/taskService';
import { X, Loader2 } from 'lucide-react';

interface NewTaskModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (task: Task) => void;
}

type FieldErrors = Partial<Record<keyof TaskFormData, string>>;

const EMPTY: TaskFormData = {
  name: '',
  project: PROJECT_NAMES[0],
  prio: 'med',
  date: '',
  assign: TEAM_MEMBERS[0],
  description: '',
};

export default function NewTaskModal({ open, onClose, onAdd }: NewTaskModalProps) {
  const [form, setForm] = useState<TaskFormData>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      const today = new Date().toISOString().split('T')[0];
      setForm({ ...EMPTY, date: today });
      setErrors({});
      setApiError('');
      setTimeout(() => nameRef.current?.focus(), 50);
    }
  }, [open]);

  function set<K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit() {
    const parsed = TaskSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const [key, msgs] of Object.entries(parsed.error.flatten().fieldErrors)) {
        fieldErrors[key as keyof TaskFormData] = msgs?.[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    setApiError('');

    try {
      const result = await createTask(parsed.data);

      if (result.error || result.issues) {
        if (result.issues) {
          const fieldErrors: FieldErrors = {};
          for (const [key, msgs] of Object.entries(result.issues)) {
            fieldErrors[key as keyof TaskFormData] = Array.isArray(msgs) ? msgs[0] : msgs;
          }
          setErrors(fieldErrors);
        } else {
          setApiError(result.error ?? 'Erro ao criar tarefa');
        }
        return;
      }

      if (result.data) {
        onAdd(result.data);
        onClose();
      }
    } catch {
      setApiError('Não foi possível conectar ao servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }

  function handleBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget && !loading) onClose();
  }

  if (!open) return null;

  return (
    <div className="modal-overlay open" onClick={handleBackdrop}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 id="modal-title" className="modal-title" style={{ margin: 0 }}>Nova Atividade</h2>
          <button onClick={onClose} disabled={loading} className="icon-btn" aria-label="Fechar">
            <X size={18} />
          </button>
        </div>

        {apiError && (
          <div className="alert-error" role="alert">{apiError}</div>
        )}

        <div className="form-group">
          <label className="form-label" htmlFor="task-name">Nome da atividade *</label>
          <input
            ref={nameRef}
            id="task-name"
            className={`form-input ${errors.name ? 'input-error' : ''}`}
            placeholder="Ex: Criar tela de login"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            disabled={loading}
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="task-desc">
            Descrição <span style={{ color: 'var(--text-3)' }}>(opcional)</span>
          </label>
          <textarea
            id="task-desc"
            className={`form-input ${errors.description ? 'input-error' : ''}`}
            placeholder="Descreva a atividade..."
            value={form.description}
            onChange={(e) => set('description', e.target.value)}
            disabled={loading}
            rows={2}
            style={{ resize: 'vertical', fontFamily: 'inherit' }}
          />
          {errors.description && <p className="field-error">{errors.description}</p>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-project">Projeto *</label>
            <select
              id="task-project"
              className={`form-select ${errors.project ? 'input-error' : ''}`}
              value={form.project}
              onChange={(e) => set('project', e.target.value)}
              disabled={loading}
            >
              {PROJECT_NAMES.map((p) => <option key={p}>{p}</option>)}
            </select>
            {errors.project && <p className="field-error">{errors.project}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-prio">Prioridade *</label>
            <select
              id="task-prio"
              className={`form-select ${errors.prio ? 'input-error' : ''}`}
              value={form.prio}
              onChange={(e) => set('prio', e.target.value as Priority)}
              disabled={loading}
            >
              <option value="low">Baixa</option>
              <option value="med">Média</option>
              <option value="high">Alta</option>
            </select>
            {errors.prio && <p className="field-error">{errors.prio}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="task-date">Prazo *</label>
            <input
              id="task-date"
              type="date"
              className={`form-input ${errors.date ? 'input-error' : ''}`}
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              disabled={loading}
            />
            {errors.date && <p className="field-error">{errors.date}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="task-assign">Responsável *</label>
            <select
              id="task-assign"
              className={`form-select ${errors.assign ? 'input-error' : ''}`}
              value={form.assign}
              onChange={(e) => set('assign', e.target.value)}
              disabled={loading}
            >
              {TEAM_MEMBERS.map((m) => <option key={m}>{m}</option>)}
            </select>
            {errors.assign && <p className="field-error">{errors.assign}</p>}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn" onClick={onClose} disabled={loading}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loading}>
            {loading
              ? <><Loader2 size={14} className="spin" /> Criando...</>
              : 'Criar Atividade'
            }
          </button>
        </div>
      </div>
    </div>
  );
}