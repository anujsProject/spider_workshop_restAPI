/*-------------- 

This is just for showing how caching improves response time drastically.

---------------*/

const express = require("express");

const app = express();

const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const test = async (req, res) => {
  const ETag = "randomId-1";
  console.log(req.headers);
  if (req.headers["if-none-match"] === ETag) {
    return res.status(304).json("");
  }

  await timeout(3000);
  res.set("ETag", ETag);
  res.send("Hi I am Anuj Sharma, and this data needs to be cached");
};

app.get("/data", test);

app.listen(4000, () => {
  console.log("App listening on port 4000...");
});
