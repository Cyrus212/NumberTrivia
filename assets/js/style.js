//Code doesnt run until page is finished rendering all elements 
$(document).ready(function() {

//For dayJs time display 
const displayDate = () => {
    const currentDate = dayjs().format('MMMM D, YYYY')
    $('#currentDay').html(currentDate);
}
displayDate();

})