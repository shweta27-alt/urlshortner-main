const express = require("express");
const router = express.Router();
const Url = require("../../models/url.model");
const User = require("../../models/user.model");
const Counter = require("../../models/counter.model");
const { checkAuthenticated } = require("../../middlewares");

const base62 = (number) => {
  let quotient = number;
  let reminder = [];
  let codes = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  while (quotient >= 62) {
    reminder.push(quotient % 62);
    quotient = Math.floor(quotient / 62);
  }

  quotient = codes[quotient];

  while (reminder.length > 0) {
    quotient = quotient + codes[reminder.pop()];
  }

  return quotient;
};

// route to create a short url for long url
router.post("/short-url", async (req, res, next) => {
  const { url } = req.body;
  //if user id is not present
  if (!url) {
    return res.status(400).json({ message: "Invalid url send" });
  }
  const regexp =
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (!regexp.test(url)) {
    return res.status(400).json({ message: "Invalid url send" });
  }
  try {
    let urlExists = await Url.findOne({ redirectUrl: url });
    if (urlExists) {
      return res.status(200).json({ id: urlExists.shortId });
    }
    Counter.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { counter: 1 } },
      { new: true },
      async (err, cd) => {
        if (cd == null) {
          const newVal = new Counter({ id: "autoval", counter: 100000000 });
          newVal.save();
        }
        let base62Counter = cd.counter || 10000000;
        const shortId = base62(base62Counter);
        let urlInstance = new Url({
          shortId: shortId,
          redirectUrl: url,
          visitHistory: [],
        });
        await urlInstance.save();
        res.status(200).json({ id: shortId });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

//route to redect to long url
router.get("/:shortId", async (req, res, next) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  let data = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  res.redirect(data.redirectUrl);
});



router.get("/analytics/:shortId", async (req, res, next) => {
  const shortId = req.params.shortId;
  if (!shortId) {
    return res.status(400).json({ message: "Something went wrong" });
  }
  let result = await Url.findOne({shortId});
  if(result){
    return res
    .status(200)
    .json({
      totalClicks: result.visitHistory.length,
      analytics: result.visitHistory,
    });
  }
  return res.status(400).json({ message: "No Data Found" });
});

module.exports = router;
