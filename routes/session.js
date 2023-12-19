import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { createSession, getSessions, deleteSession, finishSession, finishSessionOutside } from '../controllers/session.js'

const router = express.Router()
// router.post('/', createBlog)
router.post('/', verifyToken, createSession)

router.post('/finishsessionoutside', verifyToken, finishSessionOutside)

router.put('/finishsession/:id', verifyToken, finishSession)


router.delete('/:id', verifyToken, deleteSession)

router.get('/', verifyToken, getSessions)



export default router