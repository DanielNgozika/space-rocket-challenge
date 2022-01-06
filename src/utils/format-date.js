export function formatDate(timestamp) {
	return new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	}).format(new Date(timestamp));
}

export function formatDateTime(timestamp) {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		timeZoneName: "short"
	}).format(new Date(timestamp));
}

export function formatLocalDateTime(dateString) {
	const months = {
		1: "January",
		2: "February",
		3: "March",
		4: "April",
		5: "May",
		6: "June",
		7: "July",
		8: "August",
		9: "September",
		10: "October",
		11: "November",
		12: "December"
	};

	const [date, time] = dateString.split("T");
	const [year, month, day] = date.split("-");
	const [hour, minute, second] = time.split(":");

	const gmtDateTime = new Date(dateString).toGMTString();
	const gmtHour = gmtDateTime.split(" ")[4].split(":")[0];
	const gmtHourCalcValue = gmtHour === "00" ? "24" : gmtHour;
	const gmtMinutes = gmtDateTime.split(" ")[4].split(":")[1];

	const gmtOffset =
		(parseInt(hour) * 60 +
			parseInt(minute) -
			(parseInt(gmtHourCalcValue) * 60 + parseInt(gmtMinutes))) /
		60;

	return `${months[month]} ${day}, ${year}, ${hour}:${minute}:${
		second.split("-")[0]
	} GMT${gmtOffset}`;
}
