import React, {useReducer, useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Card, CardContent, Container, IconButton, Toolbar, Typography} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import {Menu} from '@mui/icons-material';
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/task-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [todoLisId: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoLisId_1 = v1()
    const todoLisId_2 = v1()

    /*    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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

        })*/

    let [todoLists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todoLisId_1, title: "What to learn today", filter: "all"},
        {id: todoLisId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
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
        dispatchToTasks(removeTaskAC(id, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todoListId))
    }
    let changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatchToTodolists(ChangeTodolistFilterAC(todoListId, value))
    }
    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    const changeTaskTitle = (title: string, todoListId: string, id: string) => {
        dispatchToTasks(changeTaskTitleAC(title, todoListId, id))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodolists(ChangeTodolistTitleAC(title, todoListId))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TodoLists
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <Grid
                    container
                    sx={{m: 1}}>
                    <Card sx={{minWidth: 27}}>
                        <CardContent>
                            <AddItemForm addItem={addTodoList}/>
                        </CardContent>
                    </Card>

                </Grid>
                <Grid container>
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
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodoListTitle={changeTodoListTitle}
                                />
                            )
                        })
                    }
                </Grid>

            </Container>

        </div>
    )
}

export default App;
