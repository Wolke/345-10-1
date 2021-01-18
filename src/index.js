"use strict";
const line = require("@line/bot-sdk");
const express = require("express");
const config = require("./const");
const handle = require("./main");
const path = require("path");
const { getStoreList } = require("./store");

// create LINE SDK config from env variables

// create LINE SDK client
const client = new line.Client(config);
// create Express app
// about Express itself: https://expressjs.com/
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use("/")
// app.get("/", (req, rep) => {
//   rep.end("hello!!");
// });
app.get("/", function (req, res) {
  console.log("req.query", req.query);
  res.sendFile(path.join(__dirname + "/../public/index.html"));
});
app.get("/store-list.html", async (req, rep) => {
  console.log("req.query", req.query);
  let { region } = req.query;

  let list = await getStoreList(region);
  rep.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
  rep.end(`<html>
  <head>
  <title>
    門市列表
  </title>
  </head>
  <body>
  
  ${list.map((i) => `<li>${i.name} ${i.tel}</li>`)}
  
  </body>
  
  </html>`);
});

app.get("/store-list", async (req, rep) => {
  let list = await getStoreList();
  rep.json(list);
});

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post("/callback", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// exports.handler = async (req, res) =>
//   line.middleware(config)(req, res, () => {
//     console.log("req.body", JSON.stringify(req.body));
//     Promise.all(req.body.events.map(handleEvent))
//       .then((result) => {
//         console.log(result);
//         return res.json(result);
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).end();
//       });
//   });

// event handler
async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    // ignore non-text-message event

    return Promise.resolve(null);
  }

  // create a echoing text message
  // const echo = { type: "text", text: await handle(event.message.text) };
  const echo = await handle(event);
  // console.log(echo);

  // use reply API
  return client.replyMessage(event.replyToken, echo);
}

// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
