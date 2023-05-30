import style from '@/styles/Button.module.scss';

export default function Button({
	type,
	nameOfClass,
	nameOfSubclass,
	text,
	fn,
}) {
	return (
		<button
			type={type}
			className={`${style[nameOfClass]} ${style[nameOfSubclass]}`}
			onClick={fn}>
			{text}
		</button>
	);
}
