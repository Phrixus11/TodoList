import {TaskType} from "./TodolistItem.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type TaskListPropsType = {
    tasks: TaskType[]
    deleteTask: (id: string) => void
    changeTaskStatus: (taskId: string, newIsDoneStatus: boolean) => void
    changeTaskTitle: (id: string, title: string) => void
}

export const TaskList = ({tasks, deleteTask, changeTaskStatus,changeTaskTitle}: TaskListPropsType) => {

        const tasksList = tasks.length === 0 ?
            <span>Ваш список пуст</span> :
            <ul>
                {tasks.map(t => {
                    const TaskClass = t.isDone ? "task-done" : "task"
                    const changeTaskTitleHandler = (title: string) => {
                        changeTaskTitle(t.id,title,)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox"
                                   checked={t.isDone}
                                   onChange={(e) => changeTaskStatus(t.id, e.currentTarget.checked)}/>
                            <EditableSpan title={t.title} classes={TaskClass} changeTitleHandler={changeTaskTitleHandler}/>
                            {/*<span className={TaskClass}>{t.title}</span>*/}
                            <button onClick={() => deleteTask(t.id)}>x</button>
                        </li>
                    )
                })
                }
            </ul>


        return <> {tasksList}  </>
    }
;

