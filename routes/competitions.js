import express from 'express'
import { createCompetition, updateCompetition, removeCompetition, getCompetition } from '../controllers/competition.js'
const router = express.Router()

// create a blog
// router.post('/', createBlog)
router.post('/', createCompetition)

// updateBlog
router.put('/:id', updateCompetition)

// router.delete('/:id', removeBlog)
router.delete('/:id', removeCompetition)

// get
router.get('/find/:id', getCompetition)

export default router