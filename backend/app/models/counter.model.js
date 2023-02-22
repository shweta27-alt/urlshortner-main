const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { geturlShortnerDb } = require("../../mongoose.init");
let urlShortnerDb = geturlShortnerDb();

//counter model to pass the counter to base62 to get the short id
const Counter = new Schema(
  {
    counter: {
      type: Number,
    },
    id: {
        type: String,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);


module.exports = urlShortnerDb.model("counter", Counter);
