import express from 'express'
import { createTutorial, updateTutorial, removeTutorial, getTutorial, getAllTutorials } from '../controllers/tutorial.js'
const router = express.Router()

router.post('/', createTutorial)

router.put('/:id', updateTutorial)

router.delete('/:id', removeTutorial)

// get
router.get('/find/:id', getTutorial)

router.get('/', getAllTutorials)

export default router