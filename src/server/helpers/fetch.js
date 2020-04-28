const https = require("https");

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
