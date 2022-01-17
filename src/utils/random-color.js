export const randomColor = (start = 200, end = 250) =>
	`hsl(${start + end * Math.random()}, 80%, 90%)`;
