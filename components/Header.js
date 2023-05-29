import style from '@/styles/Header.module.scss';

export default function Header() {
	return (
		<header className={style.header}>
			<h1 className={style.header__title}>TO DO LIST</h1>
		</header>
	);
}
