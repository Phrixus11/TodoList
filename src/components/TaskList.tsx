import {TaskType} from "./TodolistItem.tsx";

type TaskListPropsType = {
    tasks: TaskType[]
}

export const TaskList = ({tasks}: TaskListPropsType) => {

        const tasksList = tasks.length === 0 ?
            <span>Ваш список пуст</span> :
            <ul>
                {tasks.map(t => {
                    return (
                        <li>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })
                }
            </ul>


        return <> {tasksList}  </>
    }
;

