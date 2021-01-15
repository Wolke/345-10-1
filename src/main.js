const { addUser } = require("./store");
async function handle(event) {
  if (
    event.source.groupId &&
    event.message &&
    event.message.text === "我要一組好棒棒電鍋"
  ) {
    //adduser
    let p = await client.getProfile(event.source.userId);
    await addUser(p);
    return { type: "text", text: `好的 ${p.displayName} 一組` };
  }
  return { type: "text", text: event.message.text };
}

module.exports = handle;
const line = require("@line/bot-sdk");
const config = require("./const");
const client = new line.Client(config);
const sendMessage = async () => {
  client.pushMessage("Cfa4fddd4826dedf56e10a99212a69977", {
    type: "flex",
    altText: "商品說明",
    contents: {
      type: "bubble",
      hero: {
        type: "image",
        url:
          "https://upload.wikimedia.org/wikipedia/commons/d/dc/Tatung_TAC-10L-SI_20151020.jpg",
        size: "full",
        aspectRatio: "20:13",
        aspectMode: "cover"
      },
      body: {
        type: "box",
        layout: "vertical",
        contents: [
          {
            type: "text",
            text: "好棒棒電鍋",
            weight: "bold",
            size: "xl"
          },
          {
            type: "box",
            layout: "vertical",
            margin: "lg",
            spacing: "sm",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text:
                      "1.11人份電鍋 2.外鍋材質為鋁質，內鍋、外/內鍋蓋、蒸盤均為SUS304不鏽鋼材質 3.保溫開關設計，免拔插頭 4.雙重被覆電源線，雙重安全保護 5.煮飯/粥、蒸、滷、燉多用途 6.11人份電鍋，最大煮飯量(生米)：1.98公升",
                    wrap: true,
                    color: "#666666",
                    size: "sm",
                    flex: 5
                  }
                ]
              }
            ]
          }
        ]
      },
      footer: {
        type: "box",
        layout: "vertical",
        spacing: "sm",
        contents: [
          {
            type: "button",
            style: "primary",
            height: "sm",
            action: {
              type: "message",
              label: "+1",
              text: "我要一組好棒棒電鍋"
            },
            color: "#ff0000"
          },
          {
            type: "spacer",
            size: "sm"
          }
        ],
        flex: 0
      }
    }
  });
};
// sendMessage();
