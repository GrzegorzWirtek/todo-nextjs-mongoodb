import Link from 'next/link';

const Task = ({ data: { _id, task, date } }) => {
	return (
		<div className='task-min'>
			<h2>{task}</h2>
			<p>{date}</p>
			<Link href={`/${_id}`}>Open</Link>
			<button>Delete</button>
		</div>
	);
};

export default Task;
