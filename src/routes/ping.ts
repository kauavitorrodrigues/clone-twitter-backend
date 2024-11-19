import { Router } from 'express';
import * as pingController from '../controllers/ping';

export const router = Router();

router.get('/', pingController.ping);