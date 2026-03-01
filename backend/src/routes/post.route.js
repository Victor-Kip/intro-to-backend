import { Router } from "express";
import {createPost, deletepost, getposts,updatepost} from "../controllers/post.controller.js"

const router = Router()

router.route("/create").post(createPost)
router.route("/getposts").get(getposts)
router.route("/updatepost/:id").patch(updatepost)
router.route("/deletepost/:id").delete(deletepost)


export default router 