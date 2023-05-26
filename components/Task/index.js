import Link from 'next/link';
// import deleteTask from '@/utils/deleteTask';

const Task = ({ handleDelete, data: { _id, task, date } }) => {
	return (
		<div className='task-min'>
			<h2>{task}</h2>
			<p>{date}</p>
			<Link href={`/${_id}`}>Open</Link>
			<button onClick={() => handleDelete(_id)}>Delete</button>
		</div>
	);
};

export default Task;
