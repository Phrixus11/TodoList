import {TaskType} from "./TodolistItem.tsx";

type TaskListPropsType = {
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeTaskStatus: (id: string, newIsDoneStatus: boolean) => void
}

export const TaskList = ({tasks, deleteTask, changeTaskStatus}: TaskListPropsType) => {

        const tasksList = tasks.length === 0 ?
            <span>Ваш список пуст</span> :
            <ul>
                {tasks.map(t => {
                    const TaskClass = t.isDone ? "task-done" : "task"
                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}/>
                            <span className={TaskClass}>{t.title}</span>
                            <button onClick={() => deleteTask(t.id)}>x</button>
                        </li>
                    )
                })
                }
            </ul>


        return <> {tasksList}  </>
    }
;

