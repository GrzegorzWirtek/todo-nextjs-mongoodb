import { useState } from 'react';

export default function EditForm({ handleUpdateTask, taskData }) {
	const { task: taskProps, description: descriptionProps } = taskData;
	const [task, setTask] = useState(taskProps);
	const [description, setDescription] = useState(descriptionProps);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { task, description };
		handleUpdateTask(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
			/>
			<input
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
