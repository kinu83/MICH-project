import { DateHeader } from "../../shared/DateHeader";
import { ChevronRight } from "../../shared/icons/ChevronRight";
import { ChevronLeft } from "../../shared/icons/ChevronRight copy";
import { Plus } from "../../shared/icons/Plus";
import { XMark } from "../../shared/icons/XMark";
import styles from "./TaskList.module.css";

const EXAMPLE_TASKS = [
  { id: 1, title: "タスク1" },
  { id: 2, title: "タスク2" },
  { id: 3, title: "タスク3" },
  { id: 4, title: "タスク4" },
];

export const TaskList = () => {
  return (
    <div className={styles.taskList}>
      <div className={styles.taskListContainer}>
        <div>
          <DateHeader />
        </div>
        <div className={styles.taskListInner}>
          <span className={styles.taskListInputTitle}>今日のタスクは？</span>
          <TaskListItems />
          <button className={styles.taskListAddTaskButton}>
            <span className={styles.taskListAddTaskButtonIcon}>
              <Plus />
            </span>
            タスクを追加
          </button>
          <div className={styles.taskListNavigationButtonGroup}>
            <button
              className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonPrev}`}
            >
              <span className={styles.taskListNavigationButtonIcon}>
                <ChevronLeft />
              </span>
              戻る
            </button>
            <button
              className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonNext}`}
            >
              次へ
              <span className={styles.taskListNavigationButtonIcon}>
                <ChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskListItems = () => {
  return (
    <ul className={styles.taskListItems}>
      {EXAMPLE_TASKS.map((task) => (
        <li key={task.id} className={styles.taskListItem}>
          <div className={styles.taskListItemInner}>{task.title}</div>
          <button type="button" className={styles.taskItemDeleteButton}>
            <span>
              <XMark />
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
};
