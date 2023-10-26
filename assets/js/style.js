//Code doesn't run until page is finished rendering all elements
$(document).ready(function () {

	//For dayJs time display
	const displayDate = () => {
		const currentDate = dayjs().format("MMMM D, YYYY");
		$("#currentDay").html(currentDate);
	};
	displayDate();

	var number = "random";
	var factNumber = "";

	// Function to fetch and display data for a given number and type
	function fetchDataAndDisplay(type) {
		var apiUrl = `http://numbersapi.com/${number}/${type}?json`;

		fetch(apiUrl)
			.then((response) => {
				// Checks for response errors
				if (!response.ok) {
					throw new Error(
						`Failed to fetch data. Status code: ${response.status}`
					);
				}
				return response.json();
			})
			.then((data) => {
				var infoBox = document.querySelector(".infoBox");
				infoBox.innerHTML = "";

				// Creates new div containing data information in text format for the user to see
				var info = document.createElement("div");
				info.classList.add(`info${number}`);
				info.innerHTML = `<p>${data.text}</p>`;
				infoBox.appendChild(info);

				// Getting the number value pulled from the api call
				factNumber = data.number;
			})
			// Checks for errors and displays them in the console if any are found
			.catch((error) => {
				console.error(error);
			});
	}

	// Date button on-click event function
	$("#date").on("click", function () {
		var type = "date";
		fetchDataAndDisplay(type);
	});

	// Trivia button on-click event function
	$("#trivia").on("click", function () {
		var type = "trivia";
		fetchDataAndDisplay(type);
	});

	//Save button on-click event function
	$(".save").on("click", function () {
			var numberClass = $(`.info${number}`).attr("class");
			var saveText = $("#userFact").val();
			localStorage.setItem(numberClass, saveText);
			$("tbody").append(`<tr><td> ${factNumber}: ${saveText} </td></tr>`);
			$("#userFact").val(""); 
	});

	$(".inputNumber").on("click", function () {
		var numberClass = $(`.info${number}`).attr("class");
		var savedText = localStorage.getItem(numberClass);
		if (savedText !== null) {
			$(`.info${number}`).find$("#userFact").val(savedText);
			$("tbody").append(`<tr><td> ${factNumber} ${savedText} </td></tr>`);
			$("#userFact").val("");
		}
	});

	const saveButton = document.getElementById("save");
	const favDialog = document.getElementById("saveDialog");

	saveButton.addEventListener("click", () => {
		favDialog.showModal();
	});

     //On click, infoBox will clear, data from table will display, and repeat clicks will be disabled 
  $('tbody').on('click', 'td:not(.disabled)', function () {
    $('.infoBox').html('');
    var rowData = $(this).text();

    $('.infoBox').append(rowData);

    $(this).addClass("disabled");
  });

  //Button will clear infoBox when clicked
  $('#clear').on('click', function () {
    $('tr').remove();
  });

});
