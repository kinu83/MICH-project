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

const HOURS = Array.from({ length: 25 }, (_, i) => i);
const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export const PageStep = {
  AllTasks: 1,
  TaskDetail: 2,
  TaskTime: 3,
  TotalTaskTime: 4
} as const;

export const TaskList = () => {
  const [currentPage, setCurrentPage] = useState<number>(PageStep.AllTasks);

  function handleClickNextButton() {
    if (currentPage === PageStep.TotalTaskTime) return;
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
        <div className={styles.taskListPanel}>
          <div className={styles.taskListContent}>
            {currentPage === PageStep.AllTasks && <TaskListItems />}
            {currentPage === PageStep.TaskDetail && <TaskListDetails />}
            {currentPage === PageStep.TaskTime && <TaskTime />}
            {currentPage === PageStep.TotalTaskTime && <TotalTaskTime />}
          </div>
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

const TaskTime = () => {
  const [taskTimes, setTaskTimes] = useState<Record<number, number>>(
    Object.fromEntries(
      EXAMPLE_TASKS.map((task) => [task.id, 0])
    )
  );

  const updateTaskTime = (taskId: number, type: "hour" | "minute", value: number) => {
    const totalMinutes = taskTimes[taskId];
    const hour = Math.floor(totalMinutes / 60);
    const minute = totalMinutes % 60;

    setTaskTimes((prev) => ({
      ...prev,
      [taskId]: type === "hour" ? value * 60 + minute : hour * 60 + value,
    }));
  };

  return (
    <>
      <span className={styles.taskListInputTitle}>各タスクの予想時間は？</span>
      <ul className={styles.taskListItems}>
        {EXAMPLE_TASKS.map((task) => {
          const totalMinutes = taskTimes[task.id];
          const hour = Math.floor(totalMinutes / 60);
          const minute = totalMinutes % 60;

          return (
            <li key={task.id} className={styles.taskListItem}>
              <div className={styles.taskListItemInner}>
                {task.title}
              </div>

              <div className={styles.taskTimeRight}>
                <select
                  className={styles.taskTimeSelect}
                  value={hour}
                  onChange={(e) =>
                    updateTaskTime(task.id, "hour", Number(e.target.value))
                  }
                >
                  {HOURS.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <span className={styles.taskTimeUnit}>h</span>

                <select
                  className={styles.taskTimeSelect}
                  value={minute}
                  onChange={(e) =>
                    updateTaskTime(task.id, "minute", Number(e.target.value))
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

const TotalTaskTime = () => {
  const [totalMinutes, setTotalMinutes] = useState(360);

  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const barWidth = `${(totalMinutes / (24 * 60)) * 100}%`;
  const updateTotalTime = (type: "hour" | "minute", value: number) => {
    setTotalMinutes(type === "hour" ? value * 60 + minute : hour * 60 + value)
  };

  return (
    <>
      <span className={styles.taskListInputTitle}>今日のタスクにかけられる時間は？</span>
      <div className={styles.totalTaskTimeInput}>
        <select
          className={styles.taskTimeSelect}
          value={hour}
          onChange={(e) =>
            updateTotalTime("hour", Number(e.target.value))
          }
        >
          {HOURS.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>
        <span className={styles.taskTimeUnit}>h</span>

        <select
          className={styles.taskTimeSelect}
          value={minute}
          onChange={(e) =>
            updateTotalTime("minute", Number(e.target.value))
          }
        >
          {MINUTES.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <span className={styles.taskTimeUnit}>m</span>
      </div>

      <div className={styles.totalTaskTimeBarWrapper}>
        <div className={styles.totalTaskTimeBar}>
          <div className={styles.totalTaskTimeBarFill} style={{ width: barWidth }} />
        </div>

        <div className={styles.totalTaskTimeScale}>
          <span>0</span>
          <span>6</span>
          <span>12</span>
          <span>18</span>
          <span>24</span>
        </div>
      </div>
    </>
  );
};