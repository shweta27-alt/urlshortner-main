const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { geturlShortnerDb } = require("../../mongoose.init");
let urlShortnerDb = geturlShortnerDb();

const Url = new Schema(
  {
    redirectUrl: {
      type: String,
      trim: true,
    },
    shortId: {
      type: String,
      trim: true,
    },
    visitHistory:[{timestamp:{type:Number}}]
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

Url.index({redirectUrl:1})
Url.index({shortId:1})

module.exports = urlShortnerDb.model("url", Url);
