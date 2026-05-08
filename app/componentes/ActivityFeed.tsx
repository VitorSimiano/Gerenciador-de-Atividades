import { ACTIVITY_LOGS } from '@/data';

export default function ActivityFeed() {
  return (
    <div className="panel">
      <h3 className="panel-title">Atividade Recente</h3>
      {ACTIVITY_LOGS.map(({ id, user, action, target, time, dotColor }) => (
        <div className="activity-item" key={id}>
          <div className="activity-dot" style={{ background: dotColor }} />
          <div>
            <p className="activity-text">
              <strong>{user}</strong> {action} {target}
            </p>
            <p className="activity-time">{time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}