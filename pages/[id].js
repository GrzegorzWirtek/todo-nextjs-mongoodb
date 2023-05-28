import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';
import deleteTask from '@/utils/deleteTask';
import EditForm from '@/components/EditForm';
import ConfirmPopup from '@/components/ConfirmPopup/index.js';
import { useState } from 'react';
import updateTask from '@/utils/updateTask';
import getTasks from '@/utils/getTasks';
import { useRouter } from 'next/router';

export default function TaskId({ data }) {
	const [taskData, setTaskData] = useState(data);
	const [confirmPopup, setConfirmPopup] = useState(false);
	const { _id, task, description, date } = taskData;
	const [formVisible, setFormVisible] = useState(false);
	const router = useRouter();

	const cancelDelete = () => {
		setConfirmPopup(false);
	};

	const deleteThisTask = async () => {
		const res = await deleteTask(_id);
		if (!res) return;
		router.push('/');
		setConfirmPopup(false);
	};

	const handleDelete = () => {
		setConfirmPopup(true);
	};

	const handleUpdate = () => {
		setFormVisible(true);
	};

	const handleUpdateTask = async (updatedData) => {
		await updateTask({ _id, data: updatedData });
		const tasks = await getTasks();
		const updatedTask = tasks.find((task) => task._id === _id);
		setTaskData(updatedTask);
		setFormVisible(false);
	};

	const handleBackHome = () => {
		router.push('/');
	};

	return (
		<>
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
					taskData={{ task, description, date }}
				/>
			) : (
				<div>
					<h2>{task}</h2>
					<p>{description}</p>
					<p>{date}</p>
					<button onClick={() => handleUpdate(_id)}>Edit</button>
					<button onClick={handleDelete}>Delete</button>
					<button onClick={handleBackHome}>Back Home</button>
				</div>
			)}
		</>
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
