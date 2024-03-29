import React from 'react';
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
    RemoveTodolistAC
} from "./store/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/task-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";


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

function AppWithRedux() {
    //BLL
    const todoLisId_1 = v1()
    const todoLisId_2 = v1()

    let dispatch = useDispatch()

    let todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTask = (id: string, todoListId: string) => {
        dispatch(removeTaskAC(id, todoListId))
    }

    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todoListId))
    }
    let changeFilter = (value: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(todoListId, value))
    }
    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodolistAC(todoListId)
        dispatch(action)

    }

    const addTodoList = (title: string) => {
        const action = AddTodolistAC(title)
        dispatch(action)


    }

    const changeTaskTitle = (title: string, todoListId: string, id: string) => {
        dispatch(changeTaskTitleAC(title, todoListId, id))
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(ChangeTodolistTitleAC(title, todoListId))
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

export default AppWithRedux;
