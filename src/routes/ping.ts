import { Router } from 'express';
import * as pingController from '../controllers/ping';
import { verifyJwt } from '../utils/jwt';

export const router = Router();

router.get('/', pingController.ping);
router.get('/private', verifyJwt, pingController.privatePing);