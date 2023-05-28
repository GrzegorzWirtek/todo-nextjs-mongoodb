import {
	spinner,
	spinner__path,
	spinner__svg,
} from '@/styles/Spinner.module.scss';

export default function Spinner() {
	return (
		<div>
			<div className={spinner}>
				<svg className={spinner__svg} viewBox='0 0 50 50'>
					<circle
						className={spinner__path}
						cx='25'
						cy='25'
						r='20'
						fill='none'
						strokeWidth='5'></circle>
				</svg>
			</div>
		</div>
	);
}
