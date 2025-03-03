import {TaskType} from "./TodolistItem.tsx";

type TaskListPropsType = {
    tasks: TaskType[]
    deleteTask: (id: number) => void
}

export const TaskList = ({tasks, deleteTask}: TaskListPropsType) => {

        const tasksList = tasks.length === 0 ?
            <span>Ваш список пуст</span> :
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={()=>deleteTask(t.id)}>x</button>
                        </li>
                    )
                })
                }
            </ul>


        return <> {tasksList}  </>
    }
;

