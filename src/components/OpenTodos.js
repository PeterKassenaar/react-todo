import React from 'react';

const OpenTodos = ({todos, toggleComplete, deleteTodo, editTodo}) => {

	return (
		todos.filter(t => !t.done).length > 0 &&
		<>
			<h2>Open todos: </h2>
			<ul className="list-group">
				{todos.map((todo, index) => (
					!todo.done ?
						<li className="list-group-item" key={index}>
							<label>
								<input type="checkbox"
									   checked={todo.done}
									   onChange={() => toggleComplete(todo)}
								/>
								&nbsp;
								{todo.title}
								&nbsp;
								<span className="small text-muted">
									({ new Date(todo.date.seconds * 1000).toLocaleDateString('nl-NL')})
								</span>
							</label>
							<button
								onClick={() => deleteTodo(todo)}
								className="btn btn-danger btn-sm float-right">
								Delete
							</button>
							<button
								className="btn btn-outline-info btn-sm float-right"
								onClick={() => {editTodo(todo)}}>
								Edit
							</button>
						</li>
						: null
				))}
			</ul>
		</>
	);
}

export default OpenTodos;
