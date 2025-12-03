import { Router } from "express";

import { signUp, signIn, signOut, signInWithGoogle, googleCallback, getMe } from "../controllers/auth.controller.js";
import { apiKeyAuth } from '../middleware/apikey.auth.middleware.js';
import authorize from '../middleware/auth.middleware.js';

const authRouter = Router();

// Application Level Auth
authRouter.post('/sign-up', apiKeyAuth, signUp);
authRouter.post('/sign-in', apiKeyAuth, signIn);
authRouter.post('/sign-out', apiKeyAuth, signOut);

// Cannot use Auth
authRouter.get('/google/sign-in', signInWithGoogle);
authRouter.get('/google/callback', googleCallback);

// Dual Strategy (Both User level and Application Level Auth)
authRouter.get('/me', apiKeyAuth, authorize, getMe);

export default authRouter;