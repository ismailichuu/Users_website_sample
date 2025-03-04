import express from 'express';
import { getAdminHome, deleteUser, getAddUser, addUser, editUser, handleEditUser, getAdminLogin, handleAdminLogin, handleAdminLogout } from '../controllers/adminController.js';
import { loggerAdmin, sessionCheckAdmin } from '../middleware/adminMiddleware.js';

const router = express.Router();

//GET admin home
router.get('/', loggerAdmin, getAdminHome);

//POST Delete
router.post('/delete', deleteUser);

//GET Adduser form
router.get('/add-user', loggerAdmin, getAddUser);

//POST Add-user
router.post('/add-user', addUser);

//GET Edit user
router.get('/edit',loggerAdmin, editUser);

//POST Edit user
router.post('/edit-user', handleEditUser);

//GET Admin login
router.get('/login',sessionCheckAdmin, getAdminLogin);

//POST Admin login handle
router.post('/login', handleAdminLogin);

//Get logout
router.get('/logout',loggerAdmin, handleAdminLogout);

export default router; 