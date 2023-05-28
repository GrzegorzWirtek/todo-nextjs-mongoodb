import { useRouter } from 'next/router';

const Task = ({ handleDelete, data: { _id, task, date } }) => {
	const router = useRouter();
	const handleDetails = () => {
		router.push({ pathname: `/${_id}` });
	};

	return (
		<div className='task-min'>
			<h2>{task}</h2>
			<p>{date}</p>
			<button onClick={handleDetails}>Details</button>
			<button onClick={() => handleDelete(_id)}>Delete</button>
		</div>
	);
};

export default Task;
