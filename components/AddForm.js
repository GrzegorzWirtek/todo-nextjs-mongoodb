import { useState } from 'react';

export default function AddForm({ addNewTask }) {
	const [task, setTask] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		const newTask = { task, description };
		if (!task.length || !description.length) return;
		addNewTask(newTask);
		setTask('');
		setDescription('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				required
				placeholder='Title'
			/>
			<textarea
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
				placeholder='Description'
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
