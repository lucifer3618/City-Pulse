import { Router } from 'express';
import { getCityById, getCitySuggestions, getCityByIP, getAiInsightById } from '../controllers/city.controller.js';
import authorize from '../middleware/auth.middleware.js';
import { apiKeyAuth } from '../middleware/apikey.auth.middleware.js';

const cityRouter = Router();


// Dual Strategy (Both User level and Application Level Auth)
cityRouter.get('/suggestions', apiKeyAuth, authorize, getCitySuggestions);
cityRouter.get('/by-ip', apiKeyAuth, getCityByIP);
cityRouter.get('/:id', apiKeyAuth, authorize, getCityById);
cityRouter.get('/insights/:id', apiKeyAuth, authorize, getAiInsightById);


export default cityRouter;