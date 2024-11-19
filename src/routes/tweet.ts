import { Router } from 'express';

export const router = Router();

router.post('/');
router.post('/:id/like');

router.get('/:id');
router.get('/:id/answers');