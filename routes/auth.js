import express from 'express'
import { googleAuth, signin, signup } from '../controllers/auth.js'
const router = express.Router()
router.options('/signup', function (req, res) {
    res.sendStatus(200);
});
// create user
router.post('/signup', signup)
//sign in
// Handle preflight requests
router.options('/signin', function (req, res) {
    res.sendStatus(200);
});
router.post('/signin', signin)

// google
router.options('/google', function (req, res) {
    res.sendStatus(200);
});
router.post('/google', googleAuth)

export default router