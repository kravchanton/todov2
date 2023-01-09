import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    id: string
    title: string
    filter: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeFilter: (value: filterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void

}

export const TodoList = (props: TodoListPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim(), props.id)
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
        setError(null)
    }


    return (
        <div>
            <h3>{props.title}
                <button onClick={() => props.removeTodoList(props.id)}>✖</button>
            </h3>
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

                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                            <span>{t.title}</span>
                            <button onClick={() => props.removeTask(t.id, props.id)}>✖</button>
                        </li>)
                }) : "Tasks list is empty"}

            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('all', props.id)}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('active', props.id)}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => props.changeFilter('completed', props.id)}>Completed
                </button>
            </div>
        </div>
    )
}