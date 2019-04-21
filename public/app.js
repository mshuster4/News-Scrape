$(document).ready(function() {

   var articleContainer = $(".article-container");

  $(document).on("click", ".save", handleArticleSave);
  $(document).on("click", ".scrape-new", handleArticleScrape);
  $(document).on("click", ".btn.delete", handleArticleDelete);

  $(document).on("click", ".btn.comments", handleArticleComments);
  $(document).on("click", ".btn.comment-save", handleCommentSave);
  $(document).on("click", ".btn.comment-delete", handleCommentDelete);


  $(".clear").on("click", handleArticleClear);

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
    
      initHomePage();
    });
  }

  function initHomePage() {
    // Run an AJAX request for any unsaved headlines
    $.get("/api/articles?saved=false").then(function(data) {

      location.reload();
    });

  }

  function initSavedPage() {
    $.get("/api/articles?saved=true").then(function(data) {
     
     location.reload();
    });

  }


  function handleArticleSave() {
    // This function is triggered when the user wants to save an article
    var articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;
    $.ajax({
      method: "PUT",
      url: "/api/articles/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // This will reload the entire list of articles
        initHomePage();
      }
    });
  }

  function handleArticleScrape() {
    // This function handles the user clicking any "scrape new article" buttons
    $.get("/api/fetch").then(function(data) {
    
      initHomePage();
    });
  }

  function renderCommentsList(data) {
    // This function handles rendering comment list
    var commentsToRender = [];
    var currentComment;
    if (!data.comments.length) {
      // If we have no notes, just display a message explaining this
      currentComment = $("<li class='list-group-item'>No Comments for this article yet.</li>");
      commentsToRender.push(currentComment);
    } else {
      for (var i = 0; i < data.comments.length; i++) {
        currentComment = $("<li class='list-group-item comment'>")
          .text(data.comments[i].commentText)
          .append($("<button class='btn btn-danger comment-delete'>x</button>"));
        currentComment.children("button").data("_id", data.comments[i]._id);
        commentsToRender.push(currentComment);
      }
    }
    // Now append the notesToRender to the note-container inside the note modal
    $(".comments-container").append(commentsToRender);
  }



  function handleArticleComments(event) {
    // This function handles opening the notes modal and displaying our notes
    // We grab the id of the article to get notes for from the card element the delete button sits inside
    var currentArticle = $(this)
      .parents(".card")
      .data();

    // Grab any notes with this headline/article id
    $.get("/api/comments/" + currentArticle._id).then(function(data) {
      // Constructing our initial HTML to add to the notes modal
      var modalText = $("<div class='container-fluid text-center'>").append(
        $("<h4>").text("Comments For Article: " + currentArticle._id),
        $("<hr>"),
        $("<ul class='list-group comments-container'>"),
        $("<textarea placeholder='New Comment' rows='4' cols='60'>"),
        $("<button class='btn btn-success comment-save'>Save Comment</button>")
      );
      // Adding the formatted HTML to the note modal
      bootbox.dialog({
        message: modalText,
        closeButton: true
      });
      var commentData = {
        _id: currentArticle._id,
        comments: data || []
      };
      // Adding some information about the article and article notes to the save button for easy access
      // When trying to add a new note
      $(".btn.comment-save").data("article", commentData);
      // renderNotesList will populate the actual note HTML inside of the modal we just created/opened
      renderCommentsList(commentData);
    });
  }

  function handleCommentSave() {
    // This function handles what happens when a user tries to save a new note for an article
    // Setting a variable to hold some formatted data about our note,
    // grabbing the note typed into the input box
    var commentData;
    var newComment = $(".bootbox-body textarea")
      .val()
      .trim();
    // If we actually have data typed into the note input field, format it
    // and post it to the "/api/notes" route and send the formatted noteData as well
    if (newComment) {
      commentData = { _articleId: $(this).data("article")._id, commentText: newComment };
      $.post("/api/comments", commentData).then(function() {
        // When complete, close the modal
        bootbox.hideAll();
      });
    }
  }

  function handleCommentDelete() {
    // This function handles the deletion of comments

    var commentToDelete = $(this).data("_id");

    $.ajax({
      url: "/api/comments/" + commentToDelete,
      method: "DELETE"
    }).then(function() {
      // When done, hide the modal
      bootbox.hideAll();
    });
  }

   function handleArticleDelete() {
    // This function handles deleting articles/headlines
    // We grab the id of the article to delete from the card element the delete button sits inside
    var articleToDelete = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();
    // Using a delete method here just to be semantic since we are deleting an article/headline
    $.ajax({
      method: "DELETE",
      url: "/api/articles/" + articleToDelete._id
    }).then(function(data) {
      // If this works out, run initPage again which will re-render our list of saved articles
      if (data.ok) {
        initSavedPage();
      }
    });
  }

  function handleArticleClear() {
    $.get("api/clear").then(function() {
      articleContainer.empty();
      initHomePage();
    });
  }

    
});