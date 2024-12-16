const express = require("express");
const {
  handleGenerateNewShorturl,
  handleGetAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleGenerateNewShorturl);
router.get("/analytics/:shortId", handleGetAnalytics);
module.exports = router;
