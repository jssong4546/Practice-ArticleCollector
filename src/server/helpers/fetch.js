/* eslint-disable no-console */
const https = require("https");
// const request = require("request");
// const fetch = require("node-fetch");

async function retrieveArticle(url) {
  // TODO: retrieve the html string from given url and return as promise
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let body = "";
      res.on("data", (chunk) => {
        body += chunk.toString();
      });
      res.on("end", () => {
        resolve(body);
      });
      res.on("error", (err) => {
        reject(err);
      });
    });
  });
}

module.exports = {
  retrieveArticle,
};
