# TaskFlow — Gerenciador de Atividades

Sistema de gerenciamento de atividades e projetos construído com **Next.js 15**, **TypeScript** e **CSS puro**.

## Estrutura do projeto

```
├── app/
│   ├── globals.css      # Todos os estilos globais e de componentes
│   ├── layout.tsx       # Root layout com metadata
│   └── page.tsx         # Página principal (Dashboard)
├── components/
│   ├── ActivityFeed.tsx # Feed de atividade recente da equipe
│   ├── NewTaskModal.tsx # Modal para criar nova atividade
│   ├── ProjectProgress.tsx # Barras de progresso por projeto
│   ├── Sidebar.tsx      # Barra lateral com navegação
│   ├── StatCard.tsx     # Card de estatística individual
│   ├── TaskList.tsx     # Lista de atividades com filtros
│   └── TaskRow.tsx      # Linha individual de atividade
├── data/
│   └── index.ts         # Dados iniciais e constantes
├── types/
│   └── index.ts         # Tipagens TypeScript
└── tsconfig.json        # Configuração TypeScript com alias @/*
```

## Funcionalidades

- ✅ **Dashboard** com cards de estatísticas (total, concluídas, em andamento, atrasadas)
- ✅ **Lista de atividades** com filtro por status e busca em tempo real
- ✅ **Criar nova atividade** via modal com validação
- ✅ **Marcar como concluída** clicando no círculo da tarefa
- ✅ **Progresso por projeto** com barras animadas
- ✅ **Feed de atividade recente** da equipe
- ✅ **Sidebar** com navegação e perfil do usuário
- ✅ **Badge** de tarefas pendentes no menu
- ✅ Totalmente tipado com TypeScript

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

Acesse [http://localhost:3000](http://localhost:3000).

## Como substituir no projeto existente

Copie os arquivos seguindo a mesma estrutura de pastas para dentro do seu projeto. O arquivo `globals.css` **substitui** o existente em `app/globals.css`. O `tsconfig.json` pode ser mesclado com o existente (garanta que `@/*` esteja mapeado para `"./*"`).

## Dependências adicionais

```bash
npm install lucide-react
```
