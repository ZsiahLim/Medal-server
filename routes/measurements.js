import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { deleteMeasurement, getLatestMeasurement, getMeasurements, updateMeasurement, uploadMeasurement } from '../controllers/measurement.js'

const router = express.Router()
// router.post('/', createBlog)
router.post('/', verifyToken, uploadMeasurement)

router.put('/:id', verifyToken, updateMeasurement)

router.delete('/:id', verifyToken, deleteMeasurement)

router.get('/', verifyToken, getMeasurements)

router.get('/latest', verifyToken, getLatestMeasurement)

export default router