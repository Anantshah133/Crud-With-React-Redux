import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo, removeTodo, editTodo } from "./redux/actions";
import "./App.css";

const App = ({ todos, addTodo, removeTodo, editTodo }) => {
    const [newTodo, setNewTodo] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    const handleAddTodo = () => {
        if (newTodo.trim() !== "") {
            if (editMode) {
                editTodo({
                    id: editTodoId,
                    text: newTodo,
                });
                setEditMode(false);
                setEditTodoId(null);
            } else {
                addTodo({
                    id: Date.now(),
                    text: newTodo,
                });
            }
            setNewTodo("");
        }
    };

    const handleRemoveTodo = (id) => {
        if (!editMode) {
            removeTodo(id);
        }
    };

    const handleEditTodo = (id, text) => {
        setEditMode(true);
        setEditTodoId(id);
        setNewTodo(text);
    };

    return (
        <div className="App">
            <h1 className="mb-5">To Do List with CRUD</h1>
            <div className="todo-container">
                <div className="todo-form">
                    <input type="text" placeholder={editMode ? "Edit To Do" : "Add a new To Do"} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
                    <button onClick={handleAddTodo} className="btn btn-primary">
                        {editMode ? "Edit" : "Add"}
                    </button>
                </div>
                <ul className="todo-list">
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <span className="w-75 text-start fw-bold">{todo.text}</span>
                            <div className="btn-group gap-2">
                                <button className="action-btn bg-success rounded-circle" onClick={() => handleEditTodo(todo.id, todo.text)} disabled={editMode}><i class="ri-pencil-line"></i></button>
                                <button className="action-btn bg-danger rounded-circle" onClick={() => handleRemoveTodo(todo.id)} disabled={editMode}><i class="ri-delete-bin-line"></i></button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    todos: state.todos,
});

const mapDispatchToProps = {
    addTodo,
    removeTodo,
    editTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);