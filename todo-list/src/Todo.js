import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        document.title = "Todo List";
    }, []);

    const addOrUpdateTodo = () => {
        if (inputValue.trim() === '') return;

        if (editIndex !== null) {
            const updatedTodos = todos.map((todo, index) =>
                index === editIndex ? { ...todo, text: inputValue } : todo
            );
            setTodos(updatedTodos);
            setEditIndex(null); // Reset edit mode
        } else {
            setTodos([...todos, { text: inputValue, completed: false }]);
        }

        setInputValue(''); // Clear input after adding/updating
    };

    const toggleComplete = (index) => {
        const updatedTodos = todos.map((todo, i) =>
            i === index ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
    };

    const deleteTodo = (index) => {
        // Show confirmation dialog
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        
        // Proceed with deletion if the user confirms
        if (confirmDelete) {
            const newTodos = todos.filter((_, i) => i !== index);
            setTodos(newTodos);
    
            // If in edit mode and deleting the edited task, clear input and reset edit mode
            if (editIndex === index) {
                setInputValue('');  // Clear the input field
                setEditIndex(null); // Reset edit mode
            }
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Todo List</h1>
            <TodoInput
                inputValue={inputValue}
                setInputValue={setInputValue}
                onAdd={addOrUpdateTodo}
                editIndex={editIndex}
                setEditIndex={setEditIndex}
            />
            <TodoList
                todos={todos}
                onToggleComplete={toggleComplete}
                onEdit={(index) => {
                    setEditIndex(index); // Set index for edit
                    setInputValue(todos[index].text); // Populate input with existing text
                }}
                onDelete={deleteTodo}
            />
        </div>
    );
}

export default Todo;
