import React from 'react';

function AddTodo({todo, addTodo, updateTodo}) {
    return (
        <div>
            <input className="form-control-lg"
                   value={todo.title}
                   onChange={(e) => updateTodo(e)}
                   onKeyPress={e => {
                       if (e.key === 'Enter'){
                           addTodo(e)
                       }
                   }}
                   type="text" placeholder="add item..."/>
            <button className="btn btn-success" onClick={() => addTodo()}>Add Todo</button>
        </div>
    );
}

export default AddTodo;
