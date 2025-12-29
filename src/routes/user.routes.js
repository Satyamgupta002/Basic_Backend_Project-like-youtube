import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar", // it should be same as the name of the input which is taking in frontend 
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount:1
        }
    ]),
    registerUser) // we will run post after routing to /register, since ye aya h app.js ke /users ke bad to ye ese likha jayega https://localhost:8000/users/register


export default router