import express from 'express';
import * as controller from '../controllers/user.js';

const userRoutes = express.Router();

userRoutes.get('/list-user', controller.getAllUsers);
userRoutes.post('/create-user', controller.createUser);
userRoutes.post('/login-user', controller.loginUser);
userRoutes.put('/block-user/:id', controller.blockUser);
userRoutes.put('/unblock-user/:id', controller.unBlockUser);
userRoutes.delete('/delete-user/:id', controller.deleteUser);

export default userRoutes;