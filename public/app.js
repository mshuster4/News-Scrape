$(document).ready(function() {

    $("#scrape").on("click", function() {
       $.ajax({
           method: "GET",
           url: "/scrape"
       })
       .then(function(data) {
           $('body').html(data);
       })
    
    });

});