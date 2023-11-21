import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { cancerlikeBlog, addContact, deleteUser, dislikeBlog, favoriteBlog, cancerfavoriteBlog, getUser, likeBlog, removeContact, updateUser, likeComment, cancerlikeComment, createReport, updatePrefer } from '../controllers/user.js'
import { setNotificationTab } from '../controllers/notificationTab.js'
const router = express.Router()

// add the contacts
router.put('/add', verifyToken, addContact)


router.put('/:id', verifyToken, updateUser)

router.delete('/:id', verifyToken, deleteUser)

// get a user
router.get('/find/:id', getUser)


// remove the contacts
router.put('/remove/:id', verifyToken, removeContact)

// like the blog
// router.put('/like/:blogID', likeBlog)
router.put('/like/:blogID', verifyToken, likeBlog)

// cancel like the blog
router.put('/cancellike/:blogID', verifyToken, cancerlikeBlog)

// favorite the blog
// router.put('/favorite/:blogID', favoriteBlog)
router.put('/favorite/:blogID', verifyToken, favoriteBlog)

// cancel favorite the blog
router.put('/cancelfavorite/:blogID', verifyToken, cancerfavoriteBlog)

// dislike the blog
// router.put('/dislike/:blogID', dislikeBlog)
router.put('/dislike/:blogID', verifyToken, dislikeBlog)

// like the comment
// router.put('/like/:blogID', likeBlog)q`1fftxtr65
router.put('/likecomment/:commentID', verifyToken, likeComment)

router.put('/cancellikecomment/:commentID', verifyToken, cancerlikeComment)

// router.post('/', createBlog)
router.post('/report', verifyToken, createReport)

router.post('/prefer', verifyToken, updatePrefer)

router.put('/notificationtab/set', verifyToken, setNotificationTab)



export default router