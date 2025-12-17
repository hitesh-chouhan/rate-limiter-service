const express = require("express");
const rateLimiter = require("../middlewares/rateLimiter");
const { getData } = require("../controllers/data.controller");

const router = express.Router();

router.get("/data",rateLimiter,getData);

module.exports = router;
