import { Router } from "express";

import authorize from "../middleware/auth.middleware.js";
import { getAllUsers, getCityHistoryById, getUser } from '../controllers/user.controller.js';
import { apiKeyAuth } from '../middleware/apikey.auth.middleware.js';

const userRouter = Router();

// Dual Strategy (Both User level and Application Level Auth)
userRouter.get('/:id/history', apiKeyAuth, authorize, getCityHistoryById);
userRouter.get('/', apiKeyAuth, authorize, getAllUsers);
userRouter.get('/:id', apiKeyAuth, authorize, getUser);


export default userRouter;
