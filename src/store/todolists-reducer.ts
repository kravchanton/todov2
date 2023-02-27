import {useState} from "react";
import {TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType

type RemoveTodolistType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
type AddTodolistType = {
    type : 'ADD-TODOLIST',
    title: string
}
type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}



export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all"
            }
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        default:
            throw new Error("Error")
    }

}