"use strict";
const line = require("@line/bot-sdk");
const config = require("./const");
const client = new line.Client(config);
const addUser = require("./store");
var sendMessage = () => {
  // 'Ubfcbff3466d011fa291050bb5cd73c0c'
  client.pushMessage("Cda80a04d303abb785fe21a9c2b706a8e", {
    type: "flex",
    altText: "這是商品介紹",
    contents: {
      type: "bubble",
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "好棒棒電鍋"
          },
          {
            type: "button",
            action: {
              type: "message",
              label: "+1",
              text: "我要一組好棒棒電鍋"
            },
            style: "primary",
            color: "#0000ff"
          }
        ]
      }
    }
  });
};
// sendMessage();
async function handle(event) {
  //make sure +1
  if (
    event.source &&
    event.source.groupId &&
    event.message &&
    event.message.text === "我要一組好棒棒電鍋"
  ) {
    let p = await client.getProfile(event.source.userId);
    //save data
    await addUser(event.source.userId);
    return { type: "text", text: `好的，${p.displayName} 一組` };
  }
  return { type: "text", text: event.message.text };
}

module.exports = handle;
