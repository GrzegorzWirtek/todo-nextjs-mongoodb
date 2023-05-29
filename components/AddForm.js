import style from '@/styles/AddForm.module.scss';
import { useState } from 'react';

export default function AddForm({
	addNewTask,
	addClassActive,
	setAddClassActive,
}) {
	const [task, setTask] = useState('');
	const [description, setDescription] = useState('');

	const clearInputs = () => {
		setTask('');
		setDescription('');
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setAddClassActive(false);
		const newTask = { task, description };
		if (!task.length || !description.length) return;
		addNewTask(newTask);
		clearInputs();
	};

	const handleCancel = () => {
		clearInputs();
		setAddClassActive(false);
	};

	return (
		<form
			className={`${style.add} ${addClassActive && style.add__active}`}
			onSubmit={handleSubmit}>
			<input
				className={style.add__input}
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				required
				placeholder='New task title'
			/>
			<textarea
				className={style.add__textarea}
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
				placeholder='Description'
				rows={6}
			/>
			<div>
				<button
					className={style.add__button}
					type='button'
					onClick={handleCancel}>
					Cancel
				</button>
				<button className={style.add__button} type='submit'>
					Submit
				</button>
			</div>
		</form>
	);
}
