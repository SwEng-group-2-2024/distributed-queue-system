const express = require("express");
const controller = require("./controller");
const router = express.Router();

router.post("/message/enqueue", controller.enqueueMessage);
router.get("/message/dequeue", controller.dequeueMessage);

module.exports = router;
