import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {filterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


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
    changeTaskTitle: (title: string, todoListId: string, id: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

}

export const TodoList = (props: TodoListPropsType) => {
    let addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    let changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton aria-label="delete"  onClick={() => props.removeTodoList(props.id)}>
                    <DeleteIcon/>
                </IconButton>
            </h3>


            <AddItemForm addItem={addTask} id={props.id}/>
            <ul>

                {props.tasks.length > 0 ? props.tasks.map(t => {
                    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    let changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(title, props.id, t.id)
                    }
                    return (
                        <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>

                            <input type="checkbox" checked={t.isDone} onChange={changeTaskStatus}/>
                            <EditableSpan title={props.title} changeTitle={changeTaskTitle}/>
                            <Button onClick={() => props.removeTask(t.id, props.id)}>✖</Button>
                        </li>)
                }) : "Tasks list is empty"}

            </ul>
            <div>
                <Button
                    size="small"
                    variant={props.filter === 'all' ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('all', props.id)}>All
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'active' ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('active', props.id)}>Active
                </Button>
                <Button
                    size="small"
                    variant={props.filter === 'completed' ? "contained" : "outlined"}
                    onClick={() => props.changeFilter('completed', props.id)}>Completed
                </Button>
            </div>
        </div>
    )
}