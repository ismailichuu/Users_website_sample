import express from 'express';
import { getHomePage, getLogin, getSignup, handleLogin, handleLogout, handleSignup } from '../controllers/usersContoroller.js';
import { logger, sessionCheck } from '../middleware/userMiddleware.js';

const router = express.Router();

//GET Login
router.get('/login', sessionCheck, getLogin);

//POST Login
router.post('/login', handleLogin);

//GET Home Page
router.get('/', logger, getHomePage);

//GET Signup page
router.get('/signup', sessionCheck, getSignup);

//POST Signup
router.post('/signup', handleSignup);

//GET Logout
router.get('/logout', handleLogout);

export default router;