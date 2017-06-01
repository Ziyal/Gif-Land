$(document).ready(function() {

    var topics = ["Disney", "Tacos", "Lindy Hop", "Excited", "Cheese", "Star Trek"];
    var favorites = [];

    // Gets and displays gifs for topic
    function displayGifs(){
        $("#all-gifs").empty();
        $("#topic-title").empty();

        $('#topic-title').append("<h2 class='topic-title'>"+$(this).attr("topic")+"</h2>")

        var topic = $(this).attr("topic");
        topic = topic.split(' ').join('+');
        var query = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC";

        $.ajax({
            method: "GET",
            url: query
        }).done(function(response){

            var results = response.data;

            for(var i = 0; i < 12; i++){
                var image = $("<img class='gif'>")
                image.attr("src", results[i].images.fixed_width_still.url)
                image.attr("src-gif", results[i].images.fixed_width.url)
                image.attr("gif-id", results[i].id)
                $('#all-gifs').append(image)
            }
        })
    }

    // Gets and displays a random gif
    function getRandom() {
        $("#all-gifs").empty();
        $("#topic-title").empty();

        $('#topic-title').append("<h2 class='topic-title'>Random</h2>")
        
        var query = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=g";

        $.ajax({
            method: "GET",
            url: query
        }).done(function(response){
            
            var image = $("<img class='gif'>")
            image.attr("src", response.data.image_url)
            $("#all-gifs").append(image);
        })
    }

    // Gets and displays trending gifs
    function trending() {
        $("#all-gifs").empty();
        $("#topic-title").empty();

        $('#topic-title').append("<h2 class='topic-title'>Trending</h2>")
        
        var query = "http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";

        $.ajax({
            method: "GET",
            url: query
        }).done(function(response){
            var results = response.data;

            for(var i = 0; i < 12; i++){
                var image = $("<img class='gif'>")
                image.attr("src", results[i].images.fixed_width_still.url)
                image.attr("src-gif", results[i].images.fixed_width.url)
                image.attr("gif-id", results[i].id)
                $('#all-gifs').append(image)
            }
        })
    }

    // Display larger verision of image on click
    $("#all-gifs").on("click", ".gif", function() {
        $("#all-gifs").empty();
        var gifId = $(this).attr("gif-id");

        var image = $("<img class='gif'>")
        image.attr("src", "https://media4.giphy.com/media/"+gifId+"/giphy-downsized.gif")

        var favButton = $("<br><button id='btn-fav' class='btn btn-danger' gif-id='"+gifId+"'>Add Favorite</button>")

        $('#all-gifs').append(image, favButton)
        
    })


    // Adds gif to favorites
    $("#all-gifs").on("click", "#btn-fav", function() {
        var gifId = $(this).attr("gif-id");

        var image = $("<img class='gif'>")
        image.attr("src", "https://media4.giphy.com/media/"+gifId+"/200w_s.gif")
        image.attr("src-gif", "https://media4.giphy.com/media/"+gifId+"/200w.gif")
        image.attr("gif-id", gifId)
        favorites.push(image)

        $("#all-gifs").append("<br><h2 class='fav-added'>Successfuly added!</h2>");


    })
    
    // Displays all favorites
    function displayFavorites() {
        if(favorites.length === 0){
            $('#all-gifs').append("<h2 class='no-favs'>You don't have any favorites yet!</h2>")

        } else {
            $("#all-gifs").empty();
            $("#topic-title").empty();

            $('#topic-title').append("<h2 class='topic-title'>Favorites</h2>")

            for(var imgUrl = 0; imgUrl < favorites.length; imgUrl++){
                $('#all-gifs').append(favorites[imgUrl])
            }

        }
    }

    // Animates on hover
    $("#all-gifs").on("mouseenter", ".gif", function() {
        var moving = $(this).attr("src-gif")
        var still = $(this).attr("src")
        $(this).attr("src", moving);
        $(this).attr("src-gif", still);
    });  

    // Changes to still image after hover
    $("#all-gifs").on("mouseleave", ".gif", function() {
        var moving = $(this).attr("src")
        var still = $(this).attr("src-gif")
        $(this).attr("src", still);
        $(this).attr("src-gif", moving);
    });    

    // Displays all buttons
    function buttons(){
        $("#buttons").empty();

        for(var i = 0; i < topics.length; i++) {
            var button = $("<button>");
            button.addClass("gif-btn")
            button.addClass("btn")
            button.addClass("btn-info")
            button.addClass("btn-block")
            button.attr("topic", topics[i])
            button.text(topics[i])
            $("#buttons").append(button)
        }
    }

    // Adds new favorite topic to list/buttons
    $("#add_submit").on("click", function(event){
        if( $('#add_text').length){
            event.preventDefault();
            var newFavorite = $("#add_text").val().trim();
            topics.push(newFavorite);
            buttons();
        }
    })

    // Displays gifs once button is clicked
    $(document).on("click", ".gif-btn", displayGifs);
    $(document).on("click", ".random-btn", getRandom);
    $(document).on("click", ".trending-btn", trending);
    $(document).on("click", ".favorites-btn", displayFavorites);
    

    // Displays buttons
    buttons();
});