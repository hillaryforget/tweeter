// Wait until document has finished loading
$(document).ready(function() {
  // Search for anything with the id text-tweet, and listen for any incoming input
  $("#tweet-text").on("input", function(e) {
    // Whenever new characters are entered, calculating the remaining characters until the 140 character limit
    const charsRemaining = 140 - e.target.value.length;
    // If they are past the 140 char limit, set the text to red
    // Else, set the text to the default colour (may have been red before but should be reset)
    if (charsRemaining < 0) {
      $(".counter").addClass("text-red");
    
    } else {
      $(".counter").removeClass("text-red");
    }

    // Finally, set the html of the counter to the number of characters remaining
    $(".counter").html(charsRemaining);
  });
});
