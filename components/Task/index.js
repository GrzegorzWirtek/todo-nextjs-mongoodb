import Link from 'next/link';
import axios from 'axios';

const Task = ({ data: { _id, task, date } }) => {
	const handleDelete = async () => {
		axios
			.delete(`/api/tasks/${_id}`)
			.then(() => {
				console.log('delted sucesfully');
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='task-min'>
			<h2>{task}</h2>
			<p>{date}</p>
			<Link href={`/${_id}`}>Open</Link>
			<button onClick={handleDelete}>Delete</button>
		</div>
	);
};

export default Task;
