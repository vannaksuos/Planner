// this function will get all the key from local storage
function getLocalStorage(key) {
    let value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
// this is to get the colums and rows ready before anything on the page 
$(document).ready(function() {
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    for (let i = 9; i < 18; i++) {
        // creating a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        // creating a column
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + pmAM(i) + '</p>');
        //creating column 2
        var col2 = $(`<div class="col-sm-8 past"><textarea id=text${i} class="tasks" placeholder="Add event here..."></textarea>`);
        //creating column 3
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        // appending col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);
        //  adding rows to container
        $(".container").append(row);
        getLocalStorage(i);
    }

    function pmAM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
    pmAM();

    // this is the saveBTn event listener, when click it will save whats in this description text area
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function() {
        let eventId = $(this).attr('id');
        let eventText = $(this).parent().siblings().children('.tasks').val();
        localStorage.setItem(eventId, eventText);
    });
});
// create a function to update the colors by past present and future
    function timedColors() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
        console.log(currentTime, $(`#${i}`).data("time"));
        if ($(`#${i}`).data("time") == currentTime) {
            $(`#text${i}`).addClass("present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass("future");
        }
    }
}
// setting a function that will update the color depending of the time if its pass present or future and call the timedColors function
setInterval(function() {
    timedColors();
}, 1000);




