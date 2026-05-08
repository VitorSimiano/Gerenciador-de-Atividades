export type Priority = 'high' | 'med' | 'low';
export type Status = 'pending' | 'progress' | 'done' | 'late';

export interface Task {
  id: number;
  name: string;
  project: string;
  prio: Priority;
  status: Status;
  date: string;
  assign: string;
  description?: string;
}

export interface Project {
  name: string;
  colorClass: string;
  progress: number;
}

export interface ActivityLog {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  dotColor: string;
}