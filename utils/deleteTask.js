import axios from 'axios';

const deleteTask = async (_id) => {
	try {
		const res = await axios.delete(`/api/tasks/${_id}`);
		return res;
	} catch (err) {
		console.log(err);
	}
};

export default deleteTask;
