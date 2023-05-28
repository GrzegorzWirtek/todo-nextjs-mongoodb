export default function getDate() {
	const date = new Date();
	const dateString = date.toLocaleString();
	return dateString;
}
