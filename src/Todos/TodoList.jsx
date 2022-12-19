import React, { useEffect, useState } from 'react';
import TodoService from '../Services/TodoService';
import TodoItem from './TodoItem';
import './todolist.css'

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({text: ''});

    useEffect(() => {
        async function fetchTodos() {
            const response = await TodoService.getActual();
            setTodos(response.data);
        }
        fetchTodos();
    }, []);

    const addTodo = async (event) => {
        event.preventDefault();
        if (newTodo) {
            let model = JSON.stringify(newTodo, null, 2);
            const response = await TodoService.addNewTodo(model);
            setTodos([...todos, response.data]);
            setNewTodo({text: ''});
        }
    }

    const archiveTodo = async (e, todo) => {
        e.preventDefault();
        await TodoService.setArchived(todo.id);
        todo.isArchived = true;
        setTodos(todos.filter(t => !t.isArchived));
    }

    return (
        <div className='todo-container'>
            <div>new item:</div>
            <form className='mini-form' onSubmit={addTodo}>
                <input
                    type='text'
                    placeholder='type text'
                    value={newTodo.text}
                    onChange={e => setNewTodo({text: e.target.value}) }
                    className='add-input'
                />
                <button className='add-button' type='submit'>Add</button>
            </form>
            <div className='list-title'>current items:</div>
            {
                todos.length === 0 &&
                <div>no todos yet</div>
            }
            {
                todos.map(todo => 
                <div
                    key={todo.id}
                    className='todo-item'
                >
                    {todos.indexOf(todo) + 1}. <TodoItem todo={todo} itemId={todos.indexOf(todo) + 1}/>
                    <button className='archive-button' onClick={e => archiveTodo(e, todo)}>Archive</button>
                </div>)
            }
        </div>
    );
};

export default TodoList;