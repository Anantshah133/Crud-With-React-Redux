export const addTodo = (todo) => ({
    type: "ADD_TODO",
    payload: todo,
});

export const removeTodo = (todoId) => ({
    type: "REMOVE_TODO",
    payload: todoId,
});

export const editTodo = (id, text) => ({
    type: 'EDIT_TODO',
    payload: { id, text },
});