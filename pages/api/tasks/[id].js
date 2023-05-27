import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';

export default async function handler(req, res) {
	const {
		method,
		query: { id: _id },
	} = req;

	switch (method) {
		case 'GET':
			{
				try {
					await connectMongoDB();
					const task = await TaskModel.find({ _id });
					res.status(200).send(task);
				} catch (err) {
					console.log(err);
					res.status(400).send({ err, message: 'Something went wrong' });
				}
			}
			break;
		case 'DELETE':
			{
				try {
					await connectMongoDB();
					const tasks = await TaskModel.deleteOne({ _id });
					await res.revalidate('/');
					res.send(tasks);
				} catch (err) {
					console.log(err);
					res.status(400).send({ err, message: 'Something went wrong' });
				}
			}
			break;
	}
}
