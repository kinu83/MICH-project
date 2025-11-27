import { Link } from "@tanstack/react-router";
import styles from "./Home.module.css";

export function Home() {
  const date = new Date();
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.dateHeader}>
          {date.getFullYear()}年
          {String(date.getMonth() + 1).padStart(2, "0")}月
          {String(date.getDate()).padStart(2, "0")}日
        </div>
        <div className={styles.taskContainer}>
          <Link to="/tasks/create" className={styles.taskLinkButton}>
            <span>今日のタスクを入力する</span>
          </Link>
          <Link to="/tasks" className={`${styles.taskLinkButton} ${styles.taskLinkButtonSecondary}`}>
            <span>タスクを確認する</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
