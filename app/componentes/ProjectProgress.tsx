import { PROJECTS } from '@/data';

const FILL_COLORS: Record<string, string> = {
  'Website Redesign': '#1a56db',
  'App Mobile': '#059669',
  'API Integração': '#D97706',
  'Dashboard Analytics': '#7C3AED',
};

const TEXT_COLORS: Record<string, string> = {
  'Website Redesign': '#1a56db',
  'App Mobile': '#059669',
  'API Integração': '#D97706',
  'Dashboard Analytics': '#7C3AED',
};

export default function ProjectProgress() {
  return (
    <div className="panel">
      <h3 className="panel-title">Progresso por Projeto</h3>
      {PROJECTS.map(({ name, progress }) => (
        <div className="progress-item" key={name}>
          <div className="progress-header">
            <span className="progress-label">{name}</span>
            <span className="progress-pct" style={{ color: TEXT_COLORS[name] }}>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%`, background: FILL_COLORS[name] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}