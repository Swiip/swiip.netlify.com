const { promisify } = require("util");
const Twit = require("twit");

const twitter = new Twit({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  strictSSL: true
});

const get = promisify(twitter.get.bind(twitter));

const getImage = result => {
  let image = null;
  if (result.entities && result.entities.media) {
    const photo = result.entities.media.find(media => media.type === "photo");
    image = photo.media_url_https;
  }
  if (image === null) {
    image = result.user.profile_image_url_https;
  }
  return image;
};

exports.handler = async () => {
  const results = await get("statuses/user_timeline");
  const mapped = results.map(result => ({
    title: null,
    image: getImage(result),
    date: new Date(result.created_at),
    link: `https://twitter.com/swiip/status/${result.id_str}`,
    description: result.text
  }));
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mapped)
  };
};
