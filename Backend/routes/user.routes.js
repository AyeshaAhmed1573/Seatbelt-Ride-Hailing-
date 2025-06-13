const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const userController = require('../controller/user.controller');
const authMiddleware = require('../auth.middleware');

router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 8 }).withMessage('Password should be at least 8 characters long')
], userController.loginUser);
router.get('/profile', authMiddleware.userAuth , userController.getUserProfile,);

module.exports = router;
