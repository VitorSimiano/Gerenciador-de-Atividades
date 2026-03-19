import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gerenciador de Tarefas",
  description: "Sistema de gerenciamento de tarefas para empresa",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="bg-slate-100 text-slate-900">
        {children}
      </body>
    </html>
  );
}