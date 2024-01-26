import express from "express";
import authRoute from "./authRoutes.js"
import userRoute from "./userRoutes.js"
const router = express.Router();
router.use('/auth',authRoute);
router.use('/users',userRoute)
export default router;