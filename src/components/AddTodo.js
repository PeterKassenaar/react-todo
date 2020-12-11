import React from 'react';

function AddTodo({todo, addTodo, editing, updateTodo, editTodo}) {
	return (
		<div>
			<input className="form-control-lg"
				   value={todo.title}
				   onChange={(e) => updateTodo(e)}
				   onKeyPress={e => {
					   if (e.key === 'Enter') {
						   editing ? editTodo(todo) : addTodo()
					   }
				   }}
				   type="text" placeholder="add item..."/>
			<button className="btn btn-success"
					onClick={() => editing ? editTodo(todo) : addTodo()}>
				{editing ? 'Update todo' : 'Add Todo'}
			</button>
		</div>
	);
}

export default AddTodo;
