import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';
import deleteTask from '@/utils/deleteTask';
import EditForm from '@/components/EditForm';
import { useState } from 'react';
import updateTask from '@/utils/updateTask';
import getTasks from '@/utils/getTasks';
import { useRouter } from 'next/router';

export default function TaskId({ data }) {
	const [taskData, setTaskData] = useState(data);
	const { _id, task, description, date } = taskData;
	const [formVisible, setFormVisible] = useState(false);
	const router = useRouter();

	const handleDelete = async (_id) => {
		const res = await deleteTask(_id);
		if (!res) return;
		// router.reload(window.location.pathname);
		router.push('/');
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

	return (
		<>
			{formVisible ? (
				<EditForm
					handleUpdateTask={handleUpdateTask}
					taskData={{ task, description }}
				/>
			) : (
				<div>
					<h2>{task}</h2>
					<p>{description}</p>
					<p>{date}</p>
					<button onClick={() => handleUpdate(_id)}>Edit</button>
					<button onClick={() => handleDelete(_id)}>Delete</button>
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

// export async function getStaticPaths() {
// 	await connectMongoDB();
// 	const data = await TaskModel.find();

// 	const paths = data.map((task) => {
// 		return {
// 			params: {
// 				id: task._id.toString(),
// 			},
// 		};
// 	});

// 	return {
// 		paths,
// 		fallback: false,
// 	};
// }

// export async function getStaticProps(context) {
// 	const { params } = context;

// 	await connectMongoDB();
// 	const data = await TaskModel.find({ _id: params.id });
// 	const taskData = JSON.parse(JSON.stringify(data))[0];

// 	return { props: { data: taskData } };
// }
