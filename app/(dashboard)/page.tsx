import StatCard from "./StatCard";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600">
          Visão geral do desempenho da equipe.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Tarefas concluídas" value="24" />
        <StatCard title="Tarefas pendentes" value="8" />
        <StatCard title="Membros ativos" value="12" />
      </div>
    </section>
  );
}