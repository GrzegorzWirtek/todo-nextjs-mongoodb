import { connectMongoDB } from '@/libs/mongodb/Connect';
import TaskModel from '@/libs/mongodb/TaskModel';

export default async function handler(req, res) {
	const { method, body } = req;

	switch (method) {
		case 'GET':
			{
				try {
					await connectMongoDB();
					const tasks = await TaskModel.find();
					res.status(200).send(tasks);
				} catch (err) {
					console.log(err);
					res.status(400).send({ err, message: 'Something went wrong' });
				}
			}
			break;
		case 'POST':
			{
				const { task } = body;

				try {
					await connectMongoDB();
					TaskModel.create({ task }).then((data) => {
						res.status(201).send(data);
					});
				} catch (err) {
					console.log(err);
					res.status(400).send({ err, message: 'Something went wrong' });
				}
			}
			break;
	}
}
