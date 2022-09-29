import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";


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
    let [filter, setFilter] = useState<filterValuesType>('all')


    return (
        <div className="App">
            {todoLists.map(t => {
                let tasksForTodoList = tasks[t.id]

                if (filter === 'active') {
                    tasksForTodoList = tasks[t.id].filter(t => t.isDone === false)

                }
                if (filter === 'completed') {
                    tasksForTodoList = tasks[t.id].filter(t => t.isDone === true)

                }
                return (
                    <TodoList key={t.id}
                              id={t.id}
                              title={t.title}
                              tasks={tasksForTodoList}
                              removeTask={removeTask}
                              setFilter={setFilter}
                              addTask={addTask}
                              filter={filter}
                              changeTaskStatus={changeTaskStatus}
                    />
                )
            })
            }

        </div>
    );
}

export default App;
