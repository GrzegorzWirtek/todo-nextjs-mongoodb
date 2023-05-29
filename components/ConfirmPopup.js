import style from '@/styles/ConfirmPopup.module.scss';

export default function ConfirmPopup({
	title,
	option1,
	option2,
	handleOption1,
	handleOption2,
}) {
	return (
		<div className={style.confirm}>
			<div className={style.confirm__box}>
				<p className={style.confirm__title}>{title}</p>
				<button className={style.confirm__btn} onClick={handleOption1}>
					{option1}
				</button>
				<button className={style.confirm__btn} onClick={handleOption2}>
					{option2}
				</button>
			</div>
		</div>
	);
}
