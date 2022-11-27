// Escape function preventing XSS attack
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function (tweets) {
  // Posts appear in reverse chronological order
  const htmlTweets = tweets.reverse().map((tweet) => {
    // Calls createTweetElement for each tweet
    return createTweetElement(tweet);
  });
  // Takes return value and appends it to the tweets container
  $("#tweets-container").prepend(htmlTweets);
};

const createTweetElement = function (tweet) {
  const { user, content, created_at } = tweet;

  // Injects tweet variables into template markup for a tweet
  const $tweet = $(`<article>
    <header>
      <div>
        <img alt="Avatar" src="${user.avatars}">
      </div>
      <span class="tweet-username">${user.name}</span>
      <span><a href="">${user.handle}</a></span>
    </header>

    <div>
      <p>${escape(content.text)}</p>
    </div>
    <footer>
      <time>${timeago.format(created_at, "en_US")}</time>
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

const dispatchError = (message) => {
  $(".error-message").slideUp();
  $(".error-message").html(message);
  $(".error-message").slideDown();
};

const onTweetSuccess = (response) => {
  $("#new-tweet-form textarea").val("");
  $(".counter").val("140");
  renderTweets([response]);
};

const onTweetError = () => {
  dispatchError("Something went wrong!");
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
  $(".error-message").hide();
  // Ajax request to submit the create tweet form
  $("#new-tweet-form").submit(function (event) {
    // Stops default behaviour of submitting and reloading the page
    event.preventDefault();

    const maxCharCount = 140;
    const charLength = $(this).find("#tweet-text").val().length;

    if (!charLength) {
      dispatchError("Please write tweet");
    } else if (charLength > maxCharCount) {
      dispatchError("Over character limit");
    } else {
      // Turns a set of form data into a query string. This serialized data should be sent to the server in the data field of the AJAX POST request
      const tweetData = $(this).serialize();
      $.ajax({
        url: "tweets",
        type: "POST",
        data: tweetData,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: onTweetSuccess,
        error: onTweetError,
      });
    }
  });
});
