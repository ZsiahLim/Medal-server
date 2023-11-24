import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { createSession, getSpecificDayCompletedTutorials, getSessions, getSpecificDayUncompletedTutorials, deleteSession } from '../controllers/session.js'

const router = express.Router()
// router.post('/', createBlog)
router.post('/', verifyToken, createSession)

router.delete('/:id', verifyToken, deleteSession)

router.get('/', verifyToken, getSessions)

router.get('/completedtutorials', verifyToken, getSpecificDayCompletedTutorials)

router.get('/uncompletedtutorials', verifyToken, getSpecificDayUncompletedTutorials)


export default router