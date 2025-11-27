import { Link } from "@tanstack/react-router";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.dateHeader}>
          {new Date().getFullYear()}年
          {String(new Date().getMonth() + 1).padStart(2, "0")}月
          {String(new Date().getDate()).padStart(2, "0")}日
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
