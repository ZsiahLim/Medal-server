import express from 'express'
import { createMusic, getAll, getMusicsByType, updateMusic, deleteMusic } from '../controllers/music.js'
const router = express.Router()

router.post('/', createMusic)

router.put('/:id', updateMusic)

router.delete('/:id', deleteMusic)

// get
router.get('/all', getAll)

router.get('/type', getMusicsByType)


export default router