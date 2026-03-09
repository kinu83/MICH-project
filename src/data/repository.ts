import { mock } from "./mock";
import type { AppStorage, Task } from "./types";

const STORAGE_KEY = "app-storage";

export class Repository {
  storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  public initStorage(): void {
    const raw = this.storage.getItem(STORAGE_KEY);
    if (!raw) {
      this.storage.setItem(STORAGE_KEY, JSON.stringify(mock));
    }
  }

  public getTask(key: string, id: number) {
    // TODO
  }

  public listTasks(key: string): Task[] {
    const raw = this.storage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw) as AppStorage;
    return data[key]?.tasks || [];
  }

  public addTask(key: string, task: Task): void {
    // TODO
  }

  public updateTask(key: string, task: Task): void {
    // TODO
  }

  public deleteTask(key: string, id: number): void {
    // TODO
  }
}
