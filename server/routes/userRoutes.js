import express from "express";
import path from "path";
import { requestPasswordReset, verifyEmail , resetPassword , changePassword} from "../controllers/userContoller.js";


const router = express.Router();
const __dirname = path.resolve(path.dirname(""))

router.get("/verify/:userId/:token",verifyEmail);

// password reset
router.post("/request-passwordreset",requestPasswordReset);  // request for password reset
router.get("/reset-password/:userId/:token",resetPassword); // verfiy info for reset
router.post("/reset-password",changePassword);   // changes the password 


router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });

  router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build", "index.html"));
  });

export default router
  