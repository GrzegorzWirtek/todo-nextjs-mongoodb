import axios from 'axios';

const updateTask = async ({ _id, data }) => {
	const { task, description } = data;
	try {
		const res = await axios.put(`/api/tasks/${_id}`, {
			_id,
			task,
			description,
			date: '12/12/2021',
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default updateTask;
