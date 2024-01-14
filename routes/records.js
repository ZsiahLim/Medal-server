import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { deleteRecord, getLatestRecord, getRecords, getRecordsByUserId, uploadRecord } from '../controllers/record.js'

const router = express.Router()
// router.post('/', createBlog)
router.post('/', verifyToken, uploadRecord)

router.delete('/:id', verifyToken, deleteRecord)

router.get('/', verifyToken, getRecords)
router.get('/:id', verifyToken, getRecordsByUserId)

router.get('/latest', verifyToken, getLatestRecord)

export default router