import axios from 'axios';

const getTasks = async () => {
	try {
		const { data } = await axios.get('/api/tasks');
		return data;
	} catch (err) {
		console.log(err);
	}
};

export default getTasks;
