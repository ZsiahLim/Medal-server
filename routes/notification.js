import express from 'express'
import { createNotification, getNotification, removeNotification, updateNotification, getMyNotification } from '../controllers/notification.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

// create a Notification
// router.post('/', createNotification)
router.post('/', createNotification)

// router.put('/:id', updateNotification)
router.put('/:id', updateNotification)

// router.delete('/:id', removeNotification)
router.delete('/:id', verifyToken, removeNotification)

router.get('/find/:id', getNotification)

router.get('/getmynotification', verifyToken, getMyNotification)

export default router