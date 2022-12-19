import React, { useState } from 'react';
import TodoService from '../Services/TodoService';

const TodoItem = ({todo}) => {
    const [isDone, setIsDone] = useState(todo.isDone);
    const changeIsDone = async (e) => {
        if (e.target.checked) {
            await TodoService.setDone(todo.id);
            setIsDone(true);
        }
        else {
            await TodoService.setUndone(todo.id);
            setIsDone(false);
        }
    }

    return (
        <span
            onClick={e => changeIsDone(e)}
        >
            <input
                id={todo.id}
                type='checkbox'
                className='check-done'
                checked={isDone}
                readOnly
            />
            <label
                htmlFor={todo.id}
                className='label-check-done'
            >
                {todo.text}
            </label>
        </span>
    );
};

export default TodoItem;