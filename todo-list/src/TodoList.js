import React from 'react';
import TodoItem from './TodoItem';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoList({ todos, onToggleComplete, onEdit, onDelete }) {
    return (
        <ul className="list-group mt-3">
            {todos.map((todo, index) => (
                <TodoItem
                    key={index}
                    todo={todo}
                    onToggle={() => onToggleComplete(index)}
                    onEdit={() => onEdit(index)}
                    onDelete={() => onDelete(index)}
                />
            ))}
        </ul>
    );
}

export default TodoList;
