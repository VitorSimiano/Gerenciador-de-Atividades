import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold">Bem-vindo ao sistema</h1>
        <p className="text-slate-600">
          Gerencie tarefas, equipes e produtividade.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="/login"
            className="rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
          >
            Entrar
          </Link>

          <Link
            href="/dashboard"
            className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-200"
          >
            Ver dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}