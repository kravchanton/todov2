import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
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
    changeTaskStatus: (id: string, isDone: boolean) => void

}

export const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }


    }

    let onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title}

                       onChange={onChangeHandler}

                       onKeyDown={onKeyDownAddTask}
                       className={error ? 'error' : ''}
                />
                <button onClick={addTask}>+</button>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>

                {props.tasks.length > 0 ? props.tasks.map(t => {
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeTaskStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id)}>✖</button>
                        </li>)
                }) : "Tasks list is empty"}

            </ul>
            <div>
                <button onClick={() => props.setFilter('all')}>All</button>
                <button onClick={() => props.setFilter('active')}>Active</button>
                <button onClick={() => props.setFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}