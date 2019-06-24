const { promisify } = require("util");
const fetch = require("node-fetch");
const { parseString } = require("xml2js");
const cheerio = require("cheerio");

const parseXml = promisify(parseString);

const mediumRssUrl = "https://medium.com/feed/@Swiip_51904";

const getImage = content => {
  const $ = cheerio.load(content);
  return $("img").attr("src");
};

exports.handler = async () => {
  const rssResquest = await fetch(mediumRssUrl);
  const rssContent = await rssResquest.text();
  const rssParsed = await parseXml(rssContent);
  const rssItems = rssParsed.rss.channel[0].item;
  const itemsPromises = rssItems.map(async rssItem => ({
    title: rssItem.title[0],
    link: rssItem.link[0],
    description: rssItem.category.join(", "),
    date: rssItem.pubDate[0],
    image: getImage(rssItem["content:encoded"][0])
  }));
  const items = await Promise.all(itemsPromises);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(items)
  };
};
