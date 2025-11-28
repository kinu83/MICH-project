import styles from "./DateHeader.module.css";

export const DateHeader = () => {
  const date = new Date();

  return (
    <div className={styles.dateHeader}>
      {date.getFullYear()}年{String(date.getMonth() + 1).padStart(2, "0")}月
      {String(date.getDate()).padStart(2, "0")}日
    </div>
  );
};
