import axios from 'axios';
import getDate from './getDate';

const addTask = async (newTask) => {
	const { task, description } = newTask;
	const date = getDate();
	const createdTask = { task, description, date };
	try {
		const res = await axios.post('/api/tasks', createdTask);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default addTask;
