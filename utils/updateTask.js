import axios from 'axios';
import getDate from './getDate';

const updateTask = async ({ _id, data }) => {
	getDate();
	const { task, description } = data;
	try {
		const res = await axios.put(`/api/tasks/${_id}`, {
			_id,
			task,
			description,
			date: `${getDate()} (Edited)`,
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default updateTask;
