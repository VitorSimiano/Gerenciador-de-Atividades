'use client';

import React from 'react';
import { useState } from 'react';
import { Task, Status } from '@/types';
import { INITIAL_TASKS } from '@/data';
import AppSidebar from '@/app/componentes/layout/AppSidebar';
import StatCard from '@/app/componentes/StatCard';
import TaskList from '@/app/componentes/TaskList';
import ProjectProgress from '@/app/componentes/ProjectProgress';
import ActivityFeed from '@/app/componentes/ActivityFeed';
import NewTaskModal from '@/app/componentes/NewTaskModal';
import { Search, Plus, CheckCircle2, Clock, AlertCircle, ListChecks } from 'lucide-react';

type Page = 'dashboard' | 'atividades';
type FilterType = 'all' | Status;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [page, setPage] = useState<Page>('dashboard');
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'progress').length;
  const late = tasks.filter((t) => t.status === 'late').length;
  const pending = tasks.filter((t) => t.status !== 'done').length;

  function toggleTask(id: number) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, status: t.status === 'done' ? 'pending' : 'done' } : t
      )
    );
  }

  function addTask(data: Omit<Task, 'id' | 'status'>) {
    const newTask: Task = { ...data, id: Date.now(), status: 'pending' };
    setTasks((prev) => [newTask, ...prev]);
  }

  return (
    <div className="app-root">
      <AppSidebar activePage={page} onNavigate={setPage} pendingCount={pending} />

      <div className="main">
        {/* Topbar */}
        <header className="topbar">
          <h1 className="topbar-title">
            {page === 'dashboard' ? 'Dashboard' : 'Atividades'}
          </h1>
          <div className="search-box">
            <Search size={14} color="var(--color-text-tertiary)" />
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

        {/* Content */}
        <main className="content">
          {/* Stats */}
          <div className="stats-grid">
            <StatCard
              label="Total de Atividades"
              value={total}
              sub="este mês"
              iconBgClass="icon-blue"
              icon={<ListChecks size={16} color="#1a56db" />}
            />
            <StatCard
              label="Concluídas"
              value={done}
              sub="nos últimos 7 dias"
              iconBgClass="icon-green"
              valueColor="#059669"
              icon={<CheckCircle2 size={16} color="#059669" />}
            />
            <StatCard
              label="Em Andamento"
              value={inProgress}
              sub="em progresso"
              iconBgClass="icon-amber"
              valueColor="#D97706"
              icon={<Clock size={16} color="#D97706" />}
            />
            <StatCard
              label="Atrasadas"
              value={late}
              sub="requerem atenção"
              iconBgClass="icon-red"
              valueColor="#DC2626"
              icon={<AlertCircle size={16} color="#DC2626" />}
            />
          </div>

          {/* Task list */}
          <TaskList
            tasks={tasks}
            onToggle={toggleTask}
            filter={filter}
            onFilterChange={setFilter}
            search={search}
            onSearchChange={setSearch}
          />

          {/* Bottom panels */}
          <div className="bottom-grid">
            <ProjectProgress />
            <ActivityFeed />
          </div>
        </main>
      </div>

      {/* Modal */}
      <NewTaskModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addTask} />
    </div>
  );
}