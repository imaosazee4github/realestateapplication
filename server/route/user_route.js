import express from 'express';
import { test,updateUserProfile }from '../controller/user_controller.js';
import { VerifyToken } from '../utils/verifyUser.js';

const router = express.Router();


router.get('/test', test);
router.post('/updateUser/:id', VerifyToken, updateUserProfile)

export default router;