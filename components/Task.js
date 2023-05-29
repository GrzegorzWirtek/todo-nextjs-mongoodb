import style from '@/styles/Task.module.scss';
import { useRouter } from 'next/router';
import Image from 'next/image';
import deleteImg from '@/public/delete.svg';

const Task = ({
	handleDelete,
	setSpinnerVisible,
	data: { _id, task, date },
}) => {
	const router = useRouter();

	const handleClick = (e) => {
		if (e.target.tagName === 'BUTTON' || e.target.tagName === 'IMG') {
			return handleDelete(_id);
		}
		setSpinnerVisible(true);
		router.push({ pathname: `/${_id}` });
	};

	return (
		<div className={style.task} onClick={handleClick}>
			<h2 className={style.task__title}>{task}</h2>
			<p className={style.task__date}>{date}</p>
			<button className={style.task__delete}>
				<Image
					className={style.task__img}
					src={deleteImg}
					priority
					alt='delete'
					width='auto'
					height='auto'
				/>
			</button>
		</div>
	);
};

export default Task;
