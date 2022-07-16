import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    setFilter: (filter: string) => void

}

export const TodoList = (props: TodoListPropsType) => {


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t =>
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>x</button>
                    </li>
                )}
            </ul>
            <div>
                <button onClick={() => props.setFilter('all')}>All</button>
                <button onClick={() => props.setFilter('active')}>Active</button>
                <button onClick={() => props.setFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}