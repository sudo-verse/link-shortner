const express = require("express");
const router = require("./routes/url");
const connect = require("./connect");
const url = require("./models/url");
const app = express();
const PORT = 9000;
const staticRouter = require("./routes/staticRouter");
const path = require("path");
connect("mongodb://localhost:27017/shorturl").then(() =>
  console.log("Connected")
);
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/url", router);
app.use("/", staticRouter);
app.use(express.static("public"));

app.get("/:shortID", async (req, res) => {
  const shortID = req.params.shortID;
  const urlModel = await url.findOneAndUpdate(
    { shortenedUrl: shortID },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  if (!urlModel) {
    return res.status(404).json({ message: "URL not found" });
  }
  res.redirect(urlModel.url);
});
app.listen(PORT, () => console.log(`server listening on port${PORT}`));
