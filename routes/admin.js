import express from 'express'
import { signin, checkToken, getOverview, getAllFeedbacks, getAllReports, deleteBlog, deleteComment, reply, publicPost, operateUser } from '../controllers/admin.js'
const router = express.Router()
//sign in
// Handle preflight requests
router.post('/signin', signin)

router.post('/check', checkToken)

router.get('/feedbacks', getAllFeedbacks)

router.get('/reports', getAllReports)

router.get('/statistics', getOverview)
// delete
router.post('/deleteblog/', deleteBlog)
router.post('/deletecomment/', deleteComment)
// reply
router.post('/reply/:targetID', reply)
// send to all
router.post('/post', publicPost)

router.post('/operateuser', operateUser)



export default router