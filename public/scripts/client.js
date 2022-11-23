/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function(tweets) {
  // Loops through tweets
  const htmlTweets = tweets.map((tweet) => {
    // Calls createTweetElement for each tweet
    return createTweetElement(tweet);
  });
  // Takes return value and appends it to the tweets container
  $("#tweets-container").append(htmlTweets);
};

const createTweetElement = function(tweet) {
  const { user, content, created_at } = tweet;

  const $tweet = $(`<article>
    <header>
      <div>
        <img alt="Avatar" src="${user.avatars}">
      </div>
      <span class="tweet-username">${user.name}</span>
      <span><a href="">${user.handle}</a></span>
    </header>

    <div>
      <p>${content.text}</p>
    </div>
    <footer>
      <time>${timeago.format(created_at, 'en_US')}</time>
      <nav>
        <button type="button">
          <span class="sr-only">Flag</span>
          <i class="fa-solid fa-flag"></i>
        </button>
        <button type="button" class="retweet">
          <span class="sr-only">Retweet</span>
          <i class="fa-solid fa-retweet"></i>
        </button>
        <button type="button" class="like">
          <span class="sr-only">Like</span>
          <i class="fa-solid fa-heart"></i>
        </button>
      </nav>
    </footer>
    </article>
  `);

  return $tweet;
};

// jQuery needs to be run inside .ready
$(document).ready(function () {
  // Load tweet with GET
  const loadtweets = () => {
    $.ajax("/tweets", { method: "GET" }).then((tweets) => {
      renderTweets(tweets);
    });
  };

  loadtweets();
  // Ajax request to submit the create tweet form
  $("#new-tweet-form").submit(function(event) {
    // Stops default behaviour of submitting and reloading the page
    event.preventDefault();

    const maxCharCount = 140;
    const charLength = $(this).find("#tweet-text").val().length;

    if (!charLength) {
      return alert("Please write Tweet");
    } else if (charLength > maxCharCount) {
      return alert("Over character limit");
    } else {
      // Turns a set of form data into a query string. This serialized data should be sent to the server in the data field of the AJAX POST request
      const tweetData = $(this).serialize();
      $.ajax({
        url: "tweets",
        type: "POST",
        data: tweetData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(response) {
          renderTweets([response]);
        },
        error: function() {
          alert("Something went wrong! Failed to tweet.");
        }
      });
    }
  });
});
