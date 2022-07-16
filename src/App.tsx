import React, {useState} from 'react';
import './App.css';
import {TaskType, TodoList} from "./TodoList";

function App() {


    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'JS', isDone: false},
    ])
    const removeTask = (id: number) => {
        tasks = tasks.filter(t => t.id !== id)
        setTasks(tasks)
    }

    let [filter, setFilter] = useState('all')
    let tasksForTodoList = tasks

    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)

    }
    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)

    }


    return (
        <div className="App">
            <TodoList title={'Learn'} tasks={tasksForTodoList} removeTask={removeTask} setFilter={setFilter}/>
        </div>
    );
}

export default App;
