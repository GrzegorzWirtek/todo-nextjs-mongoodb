import style from '@/styles/ConfirmPopup.module.scss';
import Button from './Button';

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
				<Button text={option1} nameOfClass={'btn__cancel'} fn={handleOption1} />
				<Button text={option2} nameOfClass={'btn__delete'} fn={handleOption2} />
			</div>
		</div>
	);
}
