/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text: "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

const renderTweets = function(tweets) {
  // loops through tweets
  const htmlTweets = tweets.map((tweet) => {
    // calls createTweetElement for each tweet
    return createTweetElement(tweet);
  });
  // takes return value and appends it to the tweets container
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
      <time>${created_at}</time>
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

renderTweets(data);
