import { useState } from 'react';
import getDate from '@/utils/getDate';

export default function EditForm({ handleUpdateTask, taskData }) {
	const {
		task: taskProps,
		description: descriptionProps,
		date: dateProps,
	} = taskData;
	const [task, setTask] = useState(taskProps);
	const [description, setDescription] = useState(descriptionProps);

	const handleSubmit = (e) => {
		e.preventDefault();
		const changesMade =
			taskProps !== task || descriptionProps !== description ? true : false;
		const date = changesMade ? `${getDate()} (Edited)` : dateProps;
		const data = { task, description, date };
		handleUpdateTask(data);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				required
			/>
			<input
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<button type='submit'>Submit</button>
		</form>
	);
}
