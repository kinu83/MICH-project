import { DateHeader } from "../../shared/DateHeader";
import { ChevronRight } from "../../shared/icons/ChevronRight";
import { ChevronLeft } from "../../shared/icons/ChevronRight copy";
import { Plus } from "../../shared/icons/Plus";
import { XMark } from "../../shared/icons/XMark";
import styles from "./TaskList.module.css";
import { useState } from "react";

// mock data
const EXAMPLE_TASKS = [
  { id: 1, title: "タスク1", detail: "これはタスク1これはタスク1これはタスク1これはタスク1これはタスク1" },
  { id: 2, title: "タスク2", detail: "これはタスク2これはタスク2これはタスク2これはタスク2これはタスク2" },
  { id: 3, title: "タスク3", detail: "これはタスク3これはタスク3これはタスク3これはタスク3これはタスク3" },
  { id: 4, title: "タスク4", detail: "これはタスク4これはタスク4これはタスク4これはタスク4これはタスク4" },
];

export const PageStep = {
  AllTasks: 1,
  TaskDetail: 2,
} as const;

export const TaskList = () => {
  const [currentPage, setCurrentPage] = useState <number>(PageStep.AllTasks);

  function handleClickNextButton() {
    if (currentPage === PageStep.TaskDetail) return;
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
          {currentPage === 1 && <TaskListItems />}
          {currentPage === 2 && <TaskListDetails />}
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
            {currentPage === 2 && (<button
              type="button"
              className={`${styles.taskListNavigationButton} ${styles.taskListNavigationButtonPrev}`}
              onClick={handleClickNextButton}
            >
              スキップ
            </button>)}
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
  const [ taskPosition, setTaskPosition ] = useState(1);

  function handleClickNextTask (){
    if (taskPosition === EXAMPLE_TASKS.length) return;
    setTaskPosition((prev) => prev + 1);
  }

  function handleClickPrevTask (){
    if (taskPosition === 1) return;
    setTaskPosition((prev) => prev - 1);
  }

  return (
    <>
      <span className={styles.taskListInputTitle}>タスクの詳細は？</span>
      <div className={styles.taskListDetailTaskPlate}>
        {
          taskPosition !== 1 &&
          <button 
            className={`${styles.taskNationButton} ${styles.prevBtn}`}
            onClick={handleClickPrevTask}
          />
        }
        <div className={styles.taskListDetailTaskName}>{EXAMPLE_TASKS.find(t => t.id === taskPosition)?.title}</div>
        {
          taskPosition !== EXAMPLE_TASKS.length &&
          <button
            className={`${styles.taskNationButton} ${styles.nextBtn}`}
            onClick={handleClickNextTask}
          />
        }
      </div>
      <div>
        <textarea
          value={EXAMPLE_TASKS.find(t => t.id === taskPosition)?.detail}
          placeholder="ここに詳細を入力してください..."
          rows={7}
          cols={40}
        />
      </div>
    </>
  );
}
