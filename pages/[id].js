import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';

export default function TaskId({ data: { task, description, date } }) {
	return (
		<div>
			<h2>{task}</h2>
			<p>{description}</p>
			<p>{date}</p>
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
		fallback: false,
	};
}

export async function getStaticProps(context) {
	const { params } = context;

	await connectMongoDB();
	const data = await TaskModel.find({ _id: params.id });
	const taskData = JSON.parse(JSON.stringify(data))[0];

	return { props: { data: taskData } };
}
