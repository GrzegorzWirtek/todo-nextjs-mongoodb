import style from '@/styles/Task.module.scss';
import Button from './Button';
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
				<Button
					type='button'
					text={'Cancel'}
					nameOfClass={'btn__cancel'}
					nameOfSubclass={'btn__edit'}
					fn={handleCancel}
				/>
				<Button
					type='submit'
					text={'Save changes'}
					nameOfClass={'btn__submit'}
					nameOfSubclass={'btn__edit'}
				/>
			</div>
		</form>
	);
}
