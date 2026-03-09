export interface AppStorage {
  [key: string]: {
    tasks: Task[];
  };
}

export interface Task {
  id: number;
  title: string;
  detail: string;
}
