import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

type addItemFormType = {
    addItem: (title: string) => void
    id?: string
}

export const AddItemForm = (props: addItemFormType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    let addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        }
        if(error != null){
            setError('Title is required')
        }


    }

    let onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return (
        <div>
            <TextField
                error={!!error}
                id="outlined-basic"
                label={error ? 'Title is required' : 'Enter title'}
                variant="outlined"
                value={title}
                onChange={onChangeHandler}
                onKeyDown={onKeyDownAddTask}
                size="small"

            />


            <IconButton aria-label="Add" sx={{"&:hover":{color: "blue"}}} onClick={addItem}>
                <AddIcon/>
            </IconButton>

        </div>
    )
}