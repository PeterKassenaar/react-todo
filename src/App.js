import React, {useState, useEffect} from 'react'
// firebase stuff
import firebase from './firebase';

// our components
import OpenTodos from "./components/OpenTodos";
import DoneTodos from "./components/DoneTodos";
import AddTodo from "./components/AddTodo";
import FirebaseError from './components/FirebaseError';

// CSS style for done todos
const done = {
	textDecoration: 'line-through',
	color: 'lightgrey'
}

const App = () => {

	// This is the 'smart' component. It holds the state and the logic
	const emptyTodo = {
		title: '',
		done: false,
		date: new Date()
	}
	const [todo, setTodo] = useState(emptyTodo)
	const [todos, setTodos] = useState([])
	const [showDone, setShowDone] = useState(true)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [editing, setEditing] = useState(false)
	const [sortOrder, setSortOrder] = useState('desc')

	// Firestore reference - the ref that we perform our CRUD-functions on
	const ref = firebase.firestore().collection('todos')

	// Getting the todo's using realtime firebase .snapshot()
	const getTodos = () => {
		setLoading(true);
		ref.orderBy('date', sortOrder)
			.onSnapshot(querySnapshot => {
				const items = querySnapshot.docs.map(document => {
					return {
						id: document.id,
						...document.data()
					}
				});
				// update component state
				setTodos(items);
				setLoading(false);
			})
	}

	// OnMounted - get todos collection from firebase, using the useEffect() hook
	useEffect(() => {
		getTodos()
	}, [])

	// Functions/methods on the Todo app
	const addTodo = () => {
		ref
			.doc()
			.set(todo)
			.catch(err => handleError(err))
		setTodo(emptyTodo)
	}

	const updateTodo = e => {
		// update the local state in the textbox - no changes to Firestore!
		setTodo({...todo, title: e.target.value})
	}

	// Delete a todo from Cloud Firestore
	const deleteTodo = todo => {
		ref
			.doc(todo.id)
			.delete()
			.catch(err => handleError(err))
	}

	// Edit a todo an save to Cloud Firestore
	const editTodo = todo => {
		if (editing) {
			ref
				.doc(todo.id)
				.update(todo)
				.catch(err => handleError(err))
			setTodo(emptyTodo)
			setEditing(false);
		} else {
			setEditing(true)
			setTodo(todo)
		}
	}

	// Setting a todo done to true | false
	const toggleComplete = todo => {
		todo.done = !todo.done;
		// setTodos([...todos])//local
		ref.doc(todo.id)
			.update(todo)
			.catch(err => handleError(err))
	}

	// Toggle visibility of done todos. Just local - no changes to cloud Firestore!
	const toggleShowDoneTodos = () => {
		setShowDone(!showDone)
	}

	// Sorting the list of todos (locally)
	const changeSortOrder = direction => {
		todos.reverse() // Todo: more elegant function for sorting on date field
		setSortOrder(direction)
	}

	// Handle errors
	const handleError = err => {
		console.log('Error adding todo!:: ', err)
		setError(true)
	}
	//********************
	// The User Interface
	//********************
	if (loading) {
		return (
			<>
				<h2>Loading...</h2>
				<p>One moment please. Spin-spin-spin</p>
			</>
		)
	}
	if (error) {
		return <FirebaseError error={error}/>
	}
	return (
		<div className="container">
			<h1>React Todo-app</h1>
			{/*Create a controlled component to add the item */}
			<AddTodo todo={todo}
					 addTodo={addTodo}
					 editing={editing}
					 editTodo={editTodo}
					 updateTodo={updateTodo}/>

			{/* Show or hide done todos */}
			<div>
				<label>
					<input type="checkbox"
						   checked={showDone}
						   onChange={toggleShowDoneTodos}
					/>&nbsp;
					Show done Todos
				</label>
				&nbsp; |
				{/* Set order of items */}
				{/*Sort order:*/}
				{/*<label>*/}
				{/*	<select className="form-control"*/}
				{/*			value={sortOrder}*/}
				{/*			onChange={(e) => changeSortOrder(e.target.value)}>*/}
				{/*		<option value="asc">ascending</option>*/}
				{/*		<option value="desc">descending</option>*/}
				{/*	</select>*/}
				{/*</label>*/}
			</div>

			{/*Render open todos*/}
			{
				<OpenTodos todos={todos}
						   deleteTodo={deleteTodo}
						   editTodo={editTodo}
						   toggleComplete={toggleComplete}/>
			}

			{/*Render done todos*/}
			{
				showDone &&
				<DoneTodos toggleComplete={toggleComplete}
						   deleteTodo={deleteTodo}
						   done={done}
						   todos={todos}/>
			}
		</div>
	)
}
export default App;
