import express from "express"
import { allpvtmessages, featurenew, getAllMessages, sendMessage } from "../controller/messageController.js"
import { isAdminAuthenticated } from "../middlewares/auth.js";
const router = express.Router()

router.post("/send",sendMessage);

router.get("/getall", isAdminAuthenticated,getAllMessages);

router.post('/sendprivatemess',featurenew);

router.get("/allmessage",allpvtmessages);

export default router;