export function pipeDuration(n) {
	let num = +n;
	let hours = num / 60;
	let rhours =
		String(Math.floor(hours)).length < 2
			? `0${String(Math.floor(hours))}`
			: String(Math.floor(hours));
	let minutes = (hours - rhours) * 60;
	let rminutes =
		String(Math.round(minutes)).length < 2
			? `0${String(Math.round(minutes))} `
			: String(Math.round(minutes));
	return `${rhours}:${rminutes}`;
}
