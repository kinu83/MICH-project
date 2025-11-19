import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <div className={styles.dateHeader}>
          <span>20--年--月--日</span>
        </div>
        <div className={styles.taskContainer}>
          <button className={styles.taskButton}>
            <span>今日のタスクを入力する</span>
          </button>
          <button className={styles.taskButton}>
            <span>タスクを確認する</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
