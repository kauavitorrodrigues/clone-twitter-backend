import { Router } from 'express';

export const router = Router();

router.post('/:slug/follow');

router.get('/:slug');
router.get('/:slug/tweets');

router.put('/');
router.put('/avatar');
router.put('/cover');