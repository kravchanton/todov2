import React, {useState} from 'react';
import {filterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    setFilter: (value: filterValuesType) => void
    addTask: (title: string) => void

}

export const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('')
    let addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}
                       onChange={(e) => setTitle(e.currentTarget.value)}
                       onKeyDown={(e) => {
                           if (e.key === 'Enter') {
                               addTask()
                           }
                       }}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {props.tasks.length > 0 ? props.tasks.map(t =>
                    <li>
                        <input type="checkbox" checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={() => props.removeTask(t.id)}>x</button>
                    </li>
                ) : "Tasks list is empty"}
            </ul>
            <div>
                <button onClick={() => props.setFilter('all')}>All</button>
                <button onClick={() => props.setFilter('active')}>Active</button>
                <button onClick={() => props.setFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}