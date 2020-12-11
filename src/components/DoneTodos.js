import React from 'react';

const DoneTodos = ({todos, toggleComplete, deleteTodo, done}) => {

	return (
		todos.filter(t => t.done).length > 0 &&
		<>
			<h2>Done: </h2>
			<ul className="list-group">
				{todos.map((todo, index) => (
					todo.done ?
						<li className="list-group-item" key={index}>
							<label>
								<input type="checkbox"
									   checked={todo.done}
									   onChange={() => toggleComplete(todo)}
								/>
								&nbsp;
								<span style={todo.done ? done : null}>
                                    {todo.title}
									&nbsp;
									<span className="small text-muted">
										({new Date(todo.date.seconds * 1000).toLocaleDateString('nl-NL')})
									</span>
                                    </span>
							</label>
							<button
								onClick={() => deleteTodo(todo)}
								className="btn btn-danger btn-sm float-right">
								Delete
							</button>
						</li>
						: null
				))}
			</ul>
		</>
	);
}

export default DoneTodos;
