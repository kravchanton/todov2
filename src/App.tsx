import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";



export type filterValuesType = 'all' | 'active' | 'completed'
function App() {


    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'JS', isDone: false},
    ]);
    const removeTask = (id: string) => {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title, isDone: false}
        setTasks([newTask,...tasks])
    }
    const changeTaskStatus = (id: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === id ? {...t, isDone: isDone} : t))
    }
    let [filter, setFilter] = useState<filterValuesType>('all')
    let tasksForTodoList = tasks

    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)

    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)

    }


    return (
        <div className="App">
            <TodoList title={'Learn'}
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      setFilter={setFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />

        </div>
    );
}

export default App;
