//Code doesn't run until page is finished rendering all elements
$(document).ready(function () {
	//For dayJs time display
	const displayDate = () => {
		const currentDate = dayjs().format("MMMM D, YYYY");
		$("#currentDay").html(currentDate);
	};
	displayDate();

	var number = 1893; // Set as user number input
	var type = "math";
	var apiUrl = `http://numbersapi.com/${number}/${type}`;

	fetch(apiUrl)
		.then((response) => {
			if (!response.ok) {
				throw new Error(
					`Failed to fetch data. Status code: ${response.status}`
				);
			}
			return response.text();
		})
		.then((data) => {
			console.log(data); // Print the fact
		})
		.catch((error) => {
			console.error(error);
		});
});
