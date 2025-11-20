import { Link } from "@tanstack/react-router";
import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.dateHeader}>
          <span>20--年--月--日</span>
        </div>
        <div className={styles.taskContainer}>
          <Link to="/tasks/create" className={styles.taskLinkButton}>
            <span>今日のタスクを入力する</span>
          </Link>
          <Link to="/tasks" className={styles.taskLinkButton}>
            <span>タスクを確認する</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
