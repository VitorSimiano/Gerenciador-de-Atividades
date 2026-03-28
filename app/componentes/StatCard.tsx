import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: number;
  sub: string;
  iconBgClass: string;
  valueColor?: string;
  icon: ReactNode;
}

export default function StatCard({ label, value, sub, iconBgClass, valueColor, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${iconBgClass}`}>{icon}</div>
      <p className="stat-label">{label}</p>
      <p className="stat-value" style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </p>
      <p className="stat-sub">{sub}</p>
    </div>
  );
}