import { mock } from "./mock";
import type { AppStorage, Task } from "./types";

export const initStorage = (): AppStorage => {
  const raw = localStorage.getItem("app-storage");
  if (!raw) {
    localStorage.setItem("app-storage", JSON.stringify(mock));
  }
  return JSON.parse(localStorage.getItem("app-storage")!);
};

export const repository = {
  getTask: (key: string, id: number) => {
    // TODO
  },
  listTasks: (key: string): Task[] => {
    const raw = localStorage.getItem("app-storage");
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
