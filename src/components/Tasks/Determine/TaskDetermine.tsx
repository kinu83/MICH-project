import { DateHeader } from "../../shared/DateHeader";
import styles from "./TaskDetermine.module.css";
import { ChevronRight } from "../../shared/icons/ChevronRight";
import { ChevronLeft } from "../../shared/icons/ChevronRight copy";
import { useNavigate } from "@tanstack/react-router";

type Task = {
    id: number;
    name: string;
    taskTimes: number;
};

const mockTasks: Task[] = [
    { id: 1, name: "タスク1", taskTimes: 100 },
    { id: 2, name: "タスク2", taskTimes: 10 },
    { id: 3, name: "タスク3", taskTimes: 45 },
    { id: 4, name: "タスク4", taskTimes: 75 },
];

const totalMinutes = 180;

function formatMinutesToHourText(minutes: number) {
    const safeMinutes = Math.max(0, Math.round(minutes));
    const hours = Math.floor(safeMinutes / 60);
    const minites = safeMinutes % 60;
    return `${hours}h${minites}m`;
}

function getComment(allMinutes: number, workMinutes: number) {

    const ratio = allMinutes / workMinutes;

    if (ratio <= 0.7) return "今日はゆっくり作業できそうです";
    if (ratio <= 0.95) return "無理のないペースで進められそうです";
    if (ratio <= 1.05) return "今日はちょうど良い作業量です";
    if (ratio <= 1.2) return "今日は1.1倍頑張りましょう";
    if (ratio <= 1.35) return "今日は1.25倍頑張りましょう";
    if (ratio <= 1.6) return "今日は1.5倍頑張りましょう";

    return "今日はかなり詰まっているので優先順位を見直しましょう";
}

function getAdjustedTaskMinutes(tasks: Task[], workMinutes: number) {
    const allMinutes = tasks.reduce((sum, task) => sum + task.taskTimes, 0);

    const ratio = workMinutes / allMinutes;

    let adjusted = tasks.map((task) => ({
        ...task,
        suggestedMinutes: Math.max(5, Math.floor(task.taskTimes * ratio)),
    }));

    const currentSum = adjusted.reduce((sum, task) => sum + task.suggestedMinutes, 0);
    let diff = workMinutes - currentSum;

    let index = 0;
    while (diff !== 0 && adjusted.length > 0) {
        const target = adjusted[index % adjusted.length];

        if (diff > 0) {
            target.suggestedMinutes += 1;
            diff -= 1;
        } else if (diff < 0 && target.suggestedMinutes > 5) {
            target.suggestedMinutes -= 1;
            diff += 1;
        }

        index += 1;

        if (index > 10000) {
            break;
        }
    }

    return adjusted;
}

export const TaskDetermine = () => {
    const navigate = useNavigate();

    function handleClickChangeButton() {
        navigate({ to: "/tasks/create" });
    }

    function handleClickSaveButton() {
        navigate({ to: "/tasks" });
    }

    function handleClickGoogleCalenderButton() {
        // Googleカレンダー保存
    }

    const allMinutes = mockTasks.reduce((sum, task) => sum + task.taskTimes, 0);
    const adjustedTasks = getAdjustedTaskMinutes(mockTasks, totalMinutes);
    const comment = getComment(allMinutes, totalMinutes);
    const shouldAdjust = allMinutes > totalMinutes;

    return (
        <div className={styles.taskDetermine}>
            <div className={styles.taskDetermineContainer}>
                <DateHeader />

                <div className={styles.taskDeterminePanel}>
                    <div className={styles.taskDetermineContent}>
                        <h2 className={styles.comment}>{comment}</h2>

                        <div className={styles.taskDetermineItems}>
                            {adjustedTasks.map((task) => (
                                <div key={task.id} className={styles.taskDetermineItem}>
                                    <div className={styles.taskDetermineItemRow}>
                                        <span className={styles.taskDetermineTaskName}>{task.name}</span>

                                        <div className={styles.taskDetermineTimeGroup}>
                                            <span className={styles.taskDetermineOriginalTime}>
                                                {formatMinutesToHourText(task.taskTimes)}
                                            </span>

                                            {shouldAdjust && (
                                                <>
                                                    <span className={styles.taskDetermineArrow}>▶</span>
                                                    <span className={styles.taskDetermineSuggestedTime}>
                                                        {formatMinutesToHourText(task.suggestedMinutes)}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    <div className={styles.taskDetermineItemBorder} />
                                </div>
                            ))}
                        </div>

                        <div className={styles.summaryBox}>
                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>合計時間</span>
                                <span className={styles.summaryValue}>
                                    {formatMinutesToHourText(allMinutes)}
                                </span>
                            </div>

                            <div className={styles.summaryRow}>
                                <span className={styles.summaryLabel}>作業時間</span>
                                <span className={styles.summaryValue}>
                                    {formatMinutesToHourText(totalMinutes)}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.taskDetermineNavigationButtonGroup}>
                        <button
                            type="button"
                            className={`${styles.taskDetermineNavigationButton} ${styles.taskDetermineNavigationButtonPrev}`}
                            onClick={handleClickChangeButton}
                        >
                            <span className={styles.taskDetermineNavigationButtonIcon}>
                                <ChevronLeft />
                            </span>
                            ToDoを変更
                        </button>

                        <button
                            type="button"
                            className={`${styles.taskDetermineNavigationButton} ${styles.taskDetermineNavigationButtonMiddle}`}
                            onClick={handleClickGoogleCalenderButton}
                        >
                            Googleカレンダーに保存
                        </button>

                        <button
                            type="button"
                            className={`${styles.taskDetermineNavigationButton} ${styles.taskDetermineNavigationButtonNext}`}
                            onClick={handleClickSaveButton}
                        >
                            ToDoを保存
                            <span className={styles.taskDetermineNavigationButtonIcon}>
                                <ChevronRight />
                            </span>
                        </button>
                    </div>

                    <div className={styles.taskDetermineBackLayer} />
                </div>
            </div>
        </div>
    );
};