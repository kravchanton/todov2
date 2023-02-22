import Button from "@mui/material/Button";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";


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
        } else {
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
            <input value={title}
                   onChange={onChangeHandler}

                   onKeyDown={onKeyDownAddTask}
                   className={error ? 'error' : ''}
            />
            <Button variant="outlined" onClick={addItem}>+</Button>
            <Button style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}/>

            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}