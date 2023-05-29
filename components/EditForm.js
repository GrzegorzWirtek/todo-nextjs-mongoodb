import style from '@/styles/Task.module.scss';
import { useState, useRef, useEffect } from 'react';
import getDate from '@/utils/getDate';

export default function EditForm({
	handleUpdateTask,
	setFormVisible,
	taskData,
}) {
	const {
		task: taskProps,
		description: descriptionProps,
		date: dateProps,
	} = taskData;
	const [task, setTask] = useState(taskProps);
	const [description, setDescription] = useState(descriptionProps);
	const inputRef = useRef();
	const textareaRef = useRef();

	useEffect(() => {
		setInputSelect();
	}, []);

	const setInputSelect = () => {
		inputRef.current.select();
	};

	const setTextareaSelect = () => {
		textareaRef.current.select();
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const changesMade =
			taskProps !== task || descriptionProps !== description ? true : false;
		const date = changesMade ? `${getDate()} (Edited)` : dateProps;
		const data = { task, description, date };
		handleUpdateTask(data);
	};

	const handleCancel = () => {
		setFormVisible(false);
	};

	return (
		<form className={style.details__task} onSubmit={handleSubmit}>
			<input
				className={style.details__title}
				type='text'
				value={task}
				onChange={(e) => setTask(e.target.value)}
				required
				ref={inputRef}
				onFocus={setInputSelect}
			/>
			<textarea
				className={style.details__description}
				rows={8}
				type='text'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
				ref={textareaRef}
				onFocus={setTextareaSelect}
			/>
			<div className={style.details__buttons}>
				<button className={style.details__btnedit} type='submit'>
					Save changes
				</button>
				<button
					className={style.details__btnedit}
					type='button'
					onClick={handleCancel}>
					Cancel
				</button>
			</div>
		</form>
	);
}
