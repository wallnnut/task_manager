export function converter(data) {
	return data.hours * 3600 + data.minutes * 60 + data.seconds;
}
