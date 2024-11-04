import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoInput({ inputValue, setInputValue, onAdd }) {
    return (
        <div className="input-group mb-3">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Add a new task"
                className="form-control"
            />
            <button onClick={onAdd} className="btn btn-primary">
                Add
            </button>
        </div>
    );
}

export default TodoInput;
