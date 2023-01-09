import React, {KeyboardEvent, useState} from "react";

export type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}


export const EditableSpan = (props: EditableSpanType) => {


    let [title, setTitle] = useState(props.title)
    let [editMode, setEditMode] = useState(false)
    let saveChange = () => {
        setEditMode(false)
        props.changeTitle(title)

    }
    let onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            saveChange()
        }
    }



    return (
        <>
            {editMode ?
                <input type="text" value={title} onKeyDown={onKeyDownAddTask} onChange={e => setTitle(e.currentTarget.value)} onBlur={saveChange}
                       autoFocus={true}/> :
                <span onDoubleClick={e => setEditMode(true)}>{title}</span>
            }

        </>
    )
}