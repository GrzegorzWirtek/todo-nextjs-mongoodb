import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';
import deleteTask from '@/utils/deleteTask';
import { useRouter } from 'next/router';

export default function TaskId({ data: { _id, task, description, date } }) {
	const router = useRouter();
	const handleDelete = async (_id) => {
		const res = await deleteTask(_id);

		if (!res) return;
		router.push('/');
	};

	return (
		<div>
			<h2>{task}</h2>
			<p>{description}</p>
			<p>{date}</p>
			<button onClick={() => handleDelete(_id)}>Delete</button>
		</div>
	);
}

export async function getStaticPaths() {
	await connectMongoDB();
	const data = await TaskModel.find();

	const paths = data.map((task) => {
		return {
			params: {
				id: task._id.toString(),
			},
		};
	});

	return {
		paths,
		fallback: true,
	};
}

export async function getStaticProps(context) {
	const { params } = context;

	await connectMongoDB();
	const data = await TaskModel.find({ _id: params.id });
	const taskData = JSON.parse(JSON.stringify(data))[0];

	return { props: { data: taskData } };
}
