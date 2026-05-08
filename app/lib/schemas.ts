import { z } from 'zod';

export const TaskSchema = z.object({
  name: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  project: z.string().min(1, 'Selecione um projeto'),
  prio: z.enum(['high', 'med', 'low'], {
    errorMap: () => ({ message: 'Selecione uma prioridade válida' }),
  }),
  date: z
    .string()
    .min(1, 'Informe o prazo')
    .refine((val) => !isNaN(Date.parse(val)), { message: 'Data inválida' }),
  assign: z.string().min(1, 'Selecione um responsável'),
  description: z.string().max(500, 'Descrição muito longa').optional(),
});

export type TaskFormData = z.infer<typeof TaskSchema>;

export const UpdateTaskSchema = TaskSchema.partial().extend({
  status: z.enum(['pending', 'progress', 'done', 'late']).optional(),
});

export type UpdateTaskData = z.infer<typeof UpdateTaskSchema>;