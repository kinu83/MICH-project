import { DateHeader } from "../../shared/DateHeader";
import { ChevronRight } from "../../shared/icons/ChevronRight";
import { ChevronLeft } from "../../shared/icons/ChevronRight copy";
import { Plus } from "../../shared/icons/Plus";
import { XMark } from "../../shared/icons/XMark";
import styles from "./TaskList.module.css";
import { useState } from "react";

// mock data
const EXAMPLE_TASKS = [
  {
    id: 1,
    title: "タスク1",
    detail: "これはタスク1これはタスク1これはタスク1これはタスク1これはタスク1",
  },
  {
    id: 2,
    title: "タスク2",
    detail: "これはタスク2これはタスク2これはタスク2これはタスク2これはタスク2",
  },
  {
    id: 3,
    title: "タスク3",
    detail: "これはタスク3これはタスク3これはタスク3これはタスク3これはタスク3",
  },
  {
    id: 4,
    title: "タスク4",
    detail: "これはタスク4これはタスク4これはタスク4これはタスク4これはタスク4",
  },
];

export const PageStep = {
  AllTasks: 1,
  TaskDetail: 2,
  TaskTime: 3,
} as const;

export const TaskList = () => {
  const [currentPage, setCurrentPage] = useState<number>(PageStep.AllTasks);

  function handleClickNextButton() {
    if (currentPage === PageStep.TaskTime) return;
    setCurrentPage((prev) => prev + 1);
  }

  function handleClickReturnButton() {
    if (currentPage === PageStep.AllTasks) return;
    setCurrentPage((prev) => prev - 1);
  }

  return (
    <div className={styles.taskList}>
      <div className={styles.taskListContainer}>
        <DateHeader />
        <div className={styles.taskListInner}>
          {currentPage === PageStep.AllTasks && <TaskListItems />}
          {currentPage === PageStep.TaskDetail && <TaskListDetails />}
          {currentPage === PageStep.TaskTime && <TaskTime />}
          <div className={styles.taskListNavigationButtonGroup}>
            <button
              type="button"
              className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonPrev}`}
              onClick={handleClickReturnButton}
            >
              <span className={styles.taskListNavigationButtonIcon}>
                <ChevronLeft />
              </span>
              戻る
            </button>
            {currentPage === 2 && (
              <button
                type="button"
                className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonPrev}`}
                onClick={handleClickNextButton}
              >
                スキップ
              </button>
            )}
            <button
              type="button"
              className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonNext}`}
              onClick={handleClickNextButton}
            >
              次へ
              <span className={styles.taskListNavigationButtonIcon}>
                <ChevronRight />
              </span>
            </button>
            <div className={styles.taskListInnerBackLayer} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskListItems = () => {
  return (
    <>
      <span className={styles.taskListInputTitle}>今日のタスクは？</span>
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
      <button className={styles.taskListAddButton}>
        <span className={styles.taskListAddButtonIcon}>
          <Plus />
        </span>
        タスクを追加
      </button>
    </>
  );
};

const TaskListDetails = () => {
  const [taskPosition, setTaskPosition] = useState(1);

  function handleClickNextTask() {
    if (taskPosition === EXAMPLE_TASKS.length) return;
    setTaskPosition((prev) => prev + 1);
  }

  function handleClickPrevTask() {
    if (taskPosition === 1) return;
    setTaskPosition((prev) => prev - 1);
  }

  return (
    <>
      <span className={styles.taskListInputTitle}>タスクの詳細は？</span>
      <div className={styles.taskListDetailTaskPlate}>
        {taskPosition !== 1 && (
          <button
            className={`${styles.taskNationButton} ${styles.prevBtn}`}
            onClick={handleClickPrevTask}
          />
        )}
        <div className={styles.taskListDetailTaskName}>
          {EXAMPLE_TASKS.find((t) => t.id === taskPosition)?.title}
        </div>
        {taskPosition !== EXAMPLE_TASKS.length && (
          <button
            className={`${styles.taskNationButton} ${styles.nextBtn}`}
            onClick={handleClickNextTask}
          />
        )}
      </div>
      <div>
        <textarea
          className={styles.taskListDetailInput}
          value={EXAMPLE_TASKS.find((t) => t.id === taskPosition)?.detail}
          placeholder="ここに詳細を入力してください..."
          rows={7}
          cols={40}
        />
      </div>
    </>
  );
};

type TimeValue = { h: number; m: number };

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 12 }, (_, i) => i * 5);

const TaskTime = () => {
  const [taskTimes, setTaskTimes] = useState<Record<number, TimeValue>>(
    Object.fromEntries(
      EXAMPLE_TASKS.map((t) => [t.id, { h: 0, m: 0 }])
    )
  );

  const updateTime = (taskId: number, key: "h" | "m", value: number) => {
    setTaskTimes((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], [key]: value },
    }));
  };

  return (
    <>
      <span className={styles.taskListInputTitle}>タスクの予想時間は？</span>
      <ul className={styles.taskListItems}>
        {EXAMPLE_TASKS.map((task) => {
          const time = taskTimes[task.id];

          return (
            <li key={task.id} className={styles.taskListItem}>
              <div className={styles.taskListItemInner}>
                {task.title}
              </div>

              <div className={styles.taskTimeRight}>
                <select
                  className={styles.taskTimeSelect}
                  value={time.h}
                  onChange={(e) =>
                    updateTime(task.id, "h", Number(e.target.value))
                  }
                >
                  {HOURS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className={styles.taskTimeUnit}>h</span>

                <select
                  className={styles.taskTimeSelect}
                  value={time.m}
                  onChange={(e) =>
                    updateTime(task.id, "m", Number(e.target.value))
                  }
                >
                  {MINUTES.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <span className={styles.taskTimeUnit}>m</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};