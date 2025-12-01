import { Link } from "@tanstack/react-router";
import styles from "./Home.module.css";
import { DateHeader } from "../shared/DateHeader";

export function Home() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.dateHeader}>
          <DateHeader />
        </div>
        <div className={styles.taskContainer}>
          <Link to="/tasks/create" className={styles.taskLinkButton}>
            <span>今日のタスクを入力する</span>
          </Link>
          <Link
            to="/tasks"
            className={`${styles.taskLinkButton} ${styles.taskLinkButtonSecondary}`}
          >
            <span>タスクを確認する</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
