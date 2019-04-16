$(document).ready(function() {

    $(".save-button").on("click", function(event) {

        var savedArticle = $(this).data("id");

        console.log(savedArticle)
    })


});