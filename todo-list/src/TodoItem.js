import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
    return (
        <li className={`list-group-item d-flex justify-content-between align-items-center ${todo.completed ? 'list-group-item-success' : ''}`}>
            <div className="form-check">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={onToggle}
                    className="form-check-input"
                />
                <label className={`form-check-label ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                    {todo.text}
                </label>
            </div>
            <div>
                <button className="btn btn-warning btn-sm me-2" onClick={onEdit}>
                    Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </li>
    );
}

export default TodoItem;
