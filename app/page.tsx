'use client';

import { useState, useEffect, useCallback } from 'react';
import { Task, Status } from '@/types';
import Sidebar from '../componentes/Sidebar';
import StatCard from '../componentes/StatCard';
import TaskList from '../componentes/TaskList';
import ProjectProgress from '../componentes/ProjectProgress';
import ActivityFeed from '../componentes/ActivityFeed';
import NewTaskModal from '../componentes/NewTaskModal';
import { fetchTasks, updateTask, deleteTask } from '@/services/taskService';
import { Search, Plus, CheckCircle2, Clock, AlertCircle, ListChecks, Loader2 } from 'lucide-react';

type Page = 'dashboard' | 'atividades';
type FilterType = 'all' | Status;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState<Page>('dashboard');
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch {
      setError('Não foi possível carregar as tarefas.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const total      = tasks.length;
  const done       = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'progress').length;
  const late       = tasks.filter((t) => t.status === 'late').length;
  const pending    = tasks.filter((t) => t.status !== 'done').length;

  async function toggleTask(id: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus: Status = task.status === 'done' ? 'pending' : 'done';
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: newStatus } : t));
    const result = await updateTask(id, { status: newStatus });
    if (result.error) {
      setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: task.status } : t));
    }
  }

  async function removeTask(id: number) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    const ok = await deleteTask(id);
    if (!ok) loadTasks();
  }

  function handleAdd(task: Task) {
    setTasks((prev) => [task, ...prev]);
  }

  return (
    <div className="app-root">
      <Sidebar activePage={page} onNavigate={setPage} pendingCount={pending} />

      <div className="main">
        <header className="topbar">
          <h1 className="topbar-title">
            {page === 'dashboard' ? 'Dashboard' : 'Atividades'}
          </h1>
          <div className="search-box">
            <Search size={14} color="var(--text-3)" />
            <input
              placeholder="Buscar atividades..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
            <Plus size={14} strokeWidth={2.5} />
            Nova Atividade
          </button>
        </header>

        <main className="content">
          {loading && (
            <div className="loading-state">
              <Loader2 size={22} className="spin" color="var(--blue)" />
              <span>Carregando atividades...</span>
            </div>
          )}

          {!loading && error && (
            <div className="alert-error" style={{ marginBottom: 0 }}>
              {error}
              <button className="btn" style={{ marginLeft: '12px', padding: '4px 10px', fontSize: '12px' }} onClick={loadTasks}>
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !error && (
            <>
              <div className="stats-grid">
                <StatCard label="Total de Atividades" value={total} sub="este mês" iconBgClass="icon-blue" icon={<ListChecks size={16} color="#1a56db" />} />
                <StatCard label="Concluídas" value={done} sub="nos últimos 7 dias" iconBgClass="icon-green" valueColor="#059669" icon={<CheckCircle2 size={16} color="#059669" />} />
                <StatCard label="Em Andamento" value={inProgress} sub="em progresso" iconBgClass="icon-amber" valueColor="#D97706" icon={<Clock size={16} color="#D97706" />} />
                <StatCard label="Atrasadas" value={late} sub="requerem atenção" iconBgClass="icon-red" valueColor="#DC2626" icon={<AlertCircle size={16} color="#DC2626" />} />
              </div>

              <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={removeTask}
                filter={filter}
                onFilterChange={setFilter}
                search={search}
                onSearchChange={setSearch}
              />

              <div className="bottom-grid">
                <ProjectProgress />
                <ActivityFeed />
              </div>
            </>
          )}
        </main>
      </div>

      <NewTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={handleAdd} />
    </div>
  );
}