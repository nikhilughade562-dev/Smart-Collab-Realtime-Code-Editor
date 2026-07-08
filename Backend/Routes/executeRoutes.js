const express = require("express");
const executeController = require("../Controllers/executeController.js");

const router = express.Router();

router.post("/run", executeController.executeCode);

module.exports = router;