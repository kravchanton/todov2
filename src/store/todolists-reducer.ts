import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType

export type RemoveTodolistType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistType = ReturnType<typeof AddTodolistAC>
export type ChangeTodolistTitleType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}
export type ChangeTodolistFilterType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}


export const todolistsReducer = (state: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(t => t.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodo: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }
            return [...state, newTodo]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        }
        default:
            throw new Error("Error")
    }

}

export const RemoveTodolistAC = (todolistId: string)  => {
    return {type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const AddTodolistAC = (title: string)  => {
    return {type: 'ADD-TODOLIST', title, todolistId: v1()} as const
}
export const ChangeTodolistTitleAC = (id: string, title: string) : ChangeTodolistTitleType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) : ChangeTodolistFilterType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}