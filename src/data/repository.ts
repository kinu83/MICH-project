import { mock } from "./mock";
import type { AppStorage, Task } from "./types";

const STORAGE_KEY = "app-storage";

export const initStorage = (): AppStorage => {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mock));
  }
  return JSON.parse(localStorage.getItem(STORAGE_KEY)!);
};

export const repository = {
  getTask: (key: string, id: number) => {
    // TODO
  },
  listTasks: (key: string): Task[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw);
    return data[key]?.tasks || [];
  },
  addTask: (key: string, task: Task): void => {
    // TODO
  },
  updateTask: (key: string, task: Task): void => {
    // TODO
  },
  deleteTask: (key: string, id: number): void => {
    // TODO
  },
};
