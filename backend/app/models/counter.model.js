const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { geturlShortnerDb } = require("../../mongoose.init");
let urlShortnerDb = geturlShortnerDb();

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
