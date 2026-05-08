'use client';

import React from 'react';
import { LayoutDashboard, CheckSquare, FolderOpen, Calendar, Users, Settings } from 'lucide-react';

type Page = 'dashboard' | 'atividades';

interface SidebarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  pendingCount: number;
}

const NAV_ITEMS = [
  { id: 'dashboard' as Page, label: 'Dashboard', Icon: LayoutDashboard },
  { id: 'atividades' as Page, label: 'Atividades', Icon: CheckSquare, badge: true },
];

const OTHER_ITEMS = [
  { label: 'Projetos', Icon: FolderOpen },
  { label: 'Calendário', Icon: Calendar },
  { label: 'Equipe', Icon: Users },
];

export default function Sidebar({ activePage, onNavigate, pendingCount }: SidebarProps) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <span className="logo-text">TaskFlow</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <p className="nav-section-label">Menu</p>

        {NAV_ITEMS.map(({ id, label, Icon, badge }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`nav-item w-full text-left ${activePage === id ? 'active' : ''}`}
          >
            <Icon size={16} />
            {label}
            {badge && pendingCount > 0 && (
              <span className="nav-badge">{pendingCount}</span>
            )}
          </button>
        ))}

        {OTHER_ITEMS.map(({ label, Icon }) => (
          <button key={label} className="nav-item w-full text-left">
            <Icon size={16} />
            {label}
          </button>
        ))}

        <p className="nav-section-label" style={{ marginTop: '8px' }}>Configurações</p>
        <button className="nav-item w-full text-left">
          <Settings size={16} />
          Configurações
        </button>
      </nav>

      {/* User */}
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="avatar">VS</div>
          <div>
            <p className="user-name">Vitor Simiano</p>
            <p className="user-role">Administrador</p>
          </div>
        </div>
      </div>
    </aside>
  );
}