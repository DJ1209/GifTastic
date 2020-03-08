// ========================================================
$(document).ready(function() {
    var topics = ['Dog', 'Cat', 'Monkey', 'Fish', 'Cow', 'Elephant', 'Donkey', 'Bird'];

    //  create topics array buttons
    function buttonExpress() {
        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('expression btn btn-secondary');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }
    buttonExpress();


    //on button click
    $(document).on('click', '.expression', function() {

            var animal = $(this).html();
            console.log(animal);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
            // console.log(queryURL);
            $.ajax({ url: queryURL, method: 'GET' })
                .done(function(response) {
                    // grabs the data
                    var results = response.data;
                    // console.log(results);
                    //empties the div before adding more gifs
                    $('#expressView').empty();
                    //loops through the data
                    for (var j = 0; j < results.length; j++) {
                        var imageView = results[j].images.fixed_height.url;
                        var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  

                        var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still).attr('class', 'card-img-top');
                        expressImage.attr('data-state', 'still');
                        // $('#expressView').append(expressImage);
                        expressImage.on('click', playGif);

                        var rating = results[j].rating;

                        let imgCard = `
                        <div class="col-md-4 col-xs-6">
                            <div class="card` + j + `" style="width: 18rem;">` +
                            `<div class="card-body">
                                    <h5 class="card-title"> Rating: ` + rating + `</h5>                            
                                </div>
                            </div>
                        </div>`;





                        $('#expressView').append(imgCard);
                        $('.card' + j).prepend(expressImage);

                        // pulling the rating

                        // console.log(rating);
                        // var displayRated = $('<p>').text("Rating: " + rating);
                        // $('#expressView').prepend(displayRated);

                    } //for loop






                }); // done response

            function playGif() {
                var state = $(this).attr('data-state');
                console.log(state);
                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }

            } //on click express

        }) // document on click




    //adding new button
    $(document).on('click', '#addExpress', function() {
        if ($('#express-input').val().trim() == '') {
            alert('please add animal');
        } else {
            var animal = $('#express-input').val().trim();
            topics.push(animal);
            $('#express-input').val('');
            buttonExpress();
            return false;

        }

    });



}); //document ready