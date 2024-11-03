import React, { useState, useEffect } from 'react';
import './Todo.css'; // Make sure to import the CSS file

function Todo() {
    const [inputValue, setInputValue] = useState('');
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        document.title = "Todo List"; // Change browser tab title
    }, []);

    const addTodo = () => {
        if (inputValue.trim() === '') return;

        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, index) =>
                index === editIndex ? { ...todo, text: inputValue } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null);
        } else {
            setTodos([...todos, { text: inputValue, completed: false }]);
        }

        setInputValue('');
    };

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (index) => {
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);
        // Reset edit state if the deleted todo is currently being edited
        if (editIndex === index) {
            setEditIndex(null);
            setInputValue(''); // Clear the input if we're deleting the currently edited task
        }
    };

    return (
        <div className="container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Add a new task"
                    className="input-field"
                />
            </div>
            <button onClick={addTodo} className="add-button">
                {editIndex !== null ? 'Update' : 'Add'}
            </button>
            <ul>
                {todos.map((todo, index) => (
                    <li key={index} className={todo.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleComplete(index)}
                            className="checkbox"
                        />
                        <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                            {todo.text}
                        </span>
                        <div className="todo-buttons">
                            <button onClick={() => {
                                setEditIndex(index);
                                setInputValue(todo.text);
                            }}>Edit</button>
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
