import style from '@/styles/AddForm.module.scss';
import { useState } from 'react';
import Button from './Button';

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
				<Button
					type='button'
					text={'Cancel'}
					fn={handleCancel}
					nameOfClass={'btn__cancel'}
				/>
				<Button type='submit' text={'Submit'} nameOfClass={'btn__submit'} />
			</div>
		</form>
	);
}
