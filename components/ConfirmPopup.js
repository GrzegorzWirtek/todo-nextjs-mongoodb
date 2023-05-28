export default function ConfirmPopup({
	title,
	option1,
	option2,
	handleOption1,
	handleOption2,
}) {
	return (
		<div>
			<p>{title}</p>
			<button onClick={handleOption1}>{option1}</button>
			<button onClick={handleOption2}>{option2}</button>
		</div>
	);
}
