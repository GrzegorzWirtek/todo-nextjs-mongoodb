import style from '@/styles/Task.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import undo from '@/public/undo.svg';
import edit from '@/public/edit.svg';
import deleteImg from '@/public/delete.svg';
import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';
import deleteTask from '@/utils/deleteTask';
import updateTask from '@/utils/updateTask';
import getTasks from '@/utils/getTasks';
import EditForm from '@/components/EditForm';
import ConfirmPopup from '@/components/ConfirmPopup.js';
import Spinner from '@/components/Spinner';

export default function TaskId({ data }) {
	const [taskData, setTaskData] = useState(data);
	const [confirmPopup, setConfirmPopup] = useState(false);
	const { _id, task, description, date } = taskData;
	const [formVisible, setFormVisible] = useState(false);
	const [spinnerVisible, setSpinnerVisible] = useState(false);
	const router = useRouter();

	const cancelDelete = () => {
		setConfirmPopup(false);
	};

	const deleteThisTask = async () => {
		setSpinnerVisible(true);
		const res = await deleteTask(_id);
		if (!res) return;
		router.push('/');
	};

	const handleDelete = () => {
		setConfirmPopup(true);
	};

	const handleUpdate = () => {
		setFormVisible(true);
	};

	const handleUpdateTask = async (updatedData) => {
		setSpinnerVisible(true);
		await updateTask({ _id, data: updatedData });
		const tasks = await getTasks();
		const updatedTask = tasks.find((task) => task._id === _id);
		setTaskData(updatedTask);
		setFormVisible(false);
		setSpinnerVisible(false);
	};

	const handleBackHome = () => {
		setSpinnerVisible(true);
		router.push('/');
	};

	return (
		<div className={style.details}>
			{spinnerVisible && <Spinner />}
			{confirmPopup && (
				<ConfirmPopup
					title='Are you sure you want to delete this task?'
					option1={'Cancel'}
					option2={'Delete'}
					handleOption1={cancelDelete}
					handleOption2={deleteThisTask}
				/>
			)}
			{formVisible ? (
				<EditForm
					handleUpdateTask={handleUpdateTask}
					setFormVisible={setFormVisible}
					taskData={{ task, description, date }}
				/>
			) : (
				<div className={style.details__task}>
					<h2 className={style.details__title}>{task}</h2>
					<p className={style.details__description}>{description}</p>
					<p className={style.details__date}>{date}</p>
					<div className={style.details__buttons}>
						<button
							className={style.details__btn}
							onClick={() => handleUpdate(_id)}>
							<Image
								className={style.details__img}
								src={edit}
								alt='edit'
								priority={true}
								loading='eager'
							/>
						</button>
						<button className={style.details__btn} onClick={handleDelete}>
							<Image
								className={style.details__img}
								src={deleteImg}
								alt='delete'
								priority={true}
								loading='eager'
							/>
						</button>
						<button className={style.details__btn} onClick={handleBackHome}>
							<Image
								className={style.details__img}
								src={undo}
								alt='back'
								priority={true}
								loading='eager'
							/>
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export async function getServerSideProps(context) {
	const {
		params: { id },
	} = context;
	await connectMongoDB();
	const data = await TaskModel.find({ _id: id });
	const taskData = JSON.parse(JSON.stringify(data))[0];

	return {
		props: {
			data: taskData,
		},
	};
}
