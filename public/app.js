$(document).ready(function() {

    $("#scrape").on("click", function() {
       $.ajax({
           method: "GET",
           url: "/articles"
       })
       .then(function(data) {
           $('body').html(data);
       })
    
    });

    $(".save-button").on("click", function() {
        var id = $(this).data("id");
       
    })

});