// this function will get all the text saved in the textarea back after refreshing page
function getStorage(key) {
    var value = localStorage.getItem(key);
    if (value) {
        $(`#text${key}`).text(value);
    }
}
// this is to get the columns and rows ready before anything on the page 
$(document).ready(function() {
    // selecting id currentDay and change the text to the date from moment.js
    $("#currentDay").text(moment().format("dddd, MMMM Do"));
    // creating rows and columns with a for loop 
    for (let i = 9; i < 18; i++) {
        // creating a row
        var row = $(`<div data-time=${i} id='${i}' class="row">`);
        // creating a column
        var col1 = $('<div class="col-sm-2"> <p class="hour">' + pmAM(i) + '</p>');
        //creating column 2
        var col2 = $(`<div class="col-sm-8 past"><textarea  id=text${i} class="tasks" placeholder="Add event here..."></textarea>`);
        //creating column 3
        var col3 = $(`<div class="col-sm-2"><button class="saveBtn" id=${i}><i class="fas fa-save"></i></button>`)
        // appending col to row
        row.append(col1);
        row.append(col2);
        row.append(col3);
        //  adding rows to container
        $(".container").append(row);
        // resizing the saveBtn
         $(".saveBtn").height(70).width(70);
         // resizing id tasks 
         $(".tasks").height(50).width (700);
        // getting local storage"text"
        getStorage(i);
        
    }
    // this function is to set the time to be 12 hours format not 24 hours
    function pmAM(hours) {
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        return hours + ampm;
    }
    pmAM();

    // this is the saveBTn event listener, when click it will save whats in this description text area into local storage
    var saveBtn = $('.saveBtn');
    saveBtn.on('click', function() {
        var taskId = $(this).attr('id');
        var tasksText = $(this).parent().siblings().children('.tasks').val();
        localStorage.setItem(taskId, tasksText);
    });
});
//  function to update the colors by past, present and future
    function timedColors() {
    var currentTime = new Date().getHours();
    for (var i = 9; i < 18; i++) {
          if ($(`#${i}`).data("time") == currentTime) {
            $(`#text${i}`).addClass("present");
        } else if (currentTime < $(`#${i}`).data("time")) {
            $(`#text${i}`).addClass("future");
        }
    }
}
// setting a function that will update the color depending of the time if its pass, present or future and call the timedColors function
setInterval(function() {
    timedColors();
}, 1000);


