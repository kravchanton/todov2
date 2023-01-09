import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";



export type filterValuesType = 'all' | 'active' | 'completed'
type TodoListType = {
    id: string
    title: string
    filter: filterValuesType
}
type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
type TasksStateType = {
    [todoLisId: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoLisId_1 = v1()
    const todoLisId_2 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
            {id: todoLisId_1, title: "What to learn today", filter: "all"},
            {id: todoLisId_2, title: "What to buy", filter: "all"},
        ]
    )
    const [tasks, setTasks] = useState<TasksStateType>({
        [todoLisId_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: false},
            {id: v1(), title: 'JS', isDone: false},
        ],
        [todoLisId_2]: [
            {id: v1(), title: 'beer', isDone: true},
            {id: v1(), title: 'milk', isDone: false},
            {id: v1(), title: 'meat', isDone: false},
        ],

    })


    const removeTask = (id: string, todoListId: string) => {
        let todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id)
        setTasks({...tasks})
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === id ? {...t, isDone: isDone} : t)})
    }
    let changeFilter = (value: filterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(t => t.id === todoListId ? {...t, filter: value} : t))

    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(t => t.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodoList = (title: string) => {

        let newTodoListId = v1()
        let newTodoList: TodoListType = {id: newTodoListId, title, filter: 'all'}
        setTodoLists([newTodoList, ...todoLists])
        setTasks({[newTodoListId]:[], ...tasks})
    }


    return (
        <div className="App">
            <AddItemForm addItem={addTodoList} />
            {
                todoLists.map(t => {

                    let tasksForTodoList = tasks[t.id]

                    if (t.filter === 'active') {
                        tasksForTodoList = tasks[t.id].filter(t => t.isDone === false)

                    }
                    if (t.filter === 'completed') {
                        tasksForTodoList = tasks[t.id].filter(t => t.isDone === true)

                    }
                    return (
                            <TodoList key={t.id}
                                      id={t.id}
                                      title={t.title}
                                      tasks={tasksForTodoList}
                                      removeTask={removeTask}
                                      removeTodoList={removeTodoList}
                                      changeFilter={changeFilter}
                                      addTask={addTask}
                                      filter={t.filter}
                                      changeTaskStatus={changeTaskStatus}
                            />
                )
                })
            }
        </div>
    )
}

export default App;
