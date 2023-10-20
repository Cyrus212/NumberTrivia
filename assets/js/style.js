//Code doesn't run until page is finished rendering all elements
$(document).ready(function () {
	//For dayJs time display
	const displayDate = () => {
		const currentDate = dayjs().format("MMMM D, YYYY");
		$("#currentDay").html(currentDate);
	};
	displayDate();

	var number = "random";

	// Function to fetch and display data for a given number and type
	function fetchDataAndDisplay(type) {
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
				var infoBox = document.querySelector(".infoBox");
				infoBox.innerHTML = "";

				var info = document.createElement("div");
				info.classList.add(`info${number}`);
				info.innerHTML = `<p>${data}</p>`;
				infoBox.appendChild(info);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	$("#date").on("click", function () {
		var type = "date";
		fetchDataAndDisplay(type);
	});

	$("#trivia").on("click", function () {
		var type = "trivia";
		fetchDataAndDisplay(type);
	});

	$(".submit").on("click", function () {
    var numberClass = $(`.info${number}`).attr("class");
  });
});
