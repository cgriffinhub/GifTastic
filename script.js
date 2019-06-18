// array of existing films
var topics = ['Robocop','Back to the Future','Leon The Professional','Hellraiser','Braveheart','Akira','City of God'];

// Append clickable button to idsplay gifs under each movie
function addToArray() {
    $("#button-group").html('');
	for (var i = 0; i < topics.length; i++) {
	movie_choice = topics[i];
        $("#button-group").append('<button class="btn btn-success movie" data-movie="' + movie_choice + '">' + movie_choice + '</button>' );
	}
}

// click function to add search input value to array
$('#add-movie').on('click',function(){
	topics.push($("#movie").val());
	addToArray();
    });


  // Event listener for all button elements
    $("body").on("click",'.movie', function() {
	$("#gifs-appear-here").html("");
      // In this case, the "this" keyword refers to the button that was clicked
      var movie = $(this).attr("data-movie");
	  
	console.log(movie);
      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        movie + "&api_key=eJqC9pDv2guco19nLg1IAQt4W4Idvdw0&limit=10";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
			console.log(results);
          // Looping over every result item
          for (var i = 0; i < results.length; i++) {
			
            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<li class='gif-container list-inline-item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var movieImage = $("<img class='gif'>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              var movieImageSrc = movieImage.attr("src", results[i].images.fixed_height.url.replace(/\.gif/i, "_s.gif"));
			  
              // Appending the paragraph and movieImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(movieImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").append(gifDiv);
            }
          }
        });
    });


// click function to play/pause gif
$('body').on('click', '.gif', function() {
    var src = $(this).attr("src");
  if($(this).hasClass('animate')){
     //stop
     $(this).attr('src', src.replace(/\.gif/i, "_s.gif"))
     $(this).removeClass('animate');
  } else {
    //play
    $(this).addClass('animate');
    $(this).attr('src', src.replace(/\_s.gif/i, ".gif"))
  }
});

// call function to append clickable buttons to idsplay gifs under each movie
addToArray();
