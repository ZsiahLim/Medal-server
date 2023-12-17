import express from 'express'
import { verifyToken } from '../verifyToken.js'
import { cancerlikeBlog, addContact, deleteUser, dislikeBlog, favoriteBlog, cancerfavoriteBlog, getUser, likeBlog, removeContact, updateUser, likeComment, cancerlikeComment, createReport, updatePrefer, updateWeightTarget, participateTutorial, updateStepTarget, updateDistanceTarget, updateCalorieTarget, updateDurationTarget, fuzzySearchUser, addContactByID } from '../controllers/user.js'
import { setNotificationTab } from '../controllers/notificationTab.js'
const router = express.Router()

// add the contacts
router.put('/add', verifyToken, addContact)
router.put('/addbycontactid/:contactID', verifyToken, addContactByID)

router.put('/updateWeightTarget', verifyToken, updateWeightTarget)
router.put('/updateStepTarget', verifyToken, updateStepTarget)
router.put('/updateDistanceTarget', verifyToken, updateDistanceTarget)
router.put('/updateCalorieTarget', verifyToken, updateCalorieTarget)
router.put('/updateDurationTarget', verifyToken, updateDurationTarget)
router.put('/participateTutorial/:id', verifyToken, participateTutorial)

router.put('/:id', verifyToken, updateUser)

router.delete('/:id', verifyToken, deleteUser)
router.get('/fuzzysearchusers', verifyToken, fuzzySearchUser)
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
router.put('/favorite/:blogID', verifyToken, favoriteBlog)

router.put('/cancelfavorite/:blogID', verifyToken, cancerfavoriteBlog)

// dislike the blog
router.put('/dislike/:blogID', verifyToken, dislikeBlog)

// like the comment
router.put('/likecomment/:commentID', verifyToken, likeComment)

router.put('/cancellikecomment/:commentID', verifyToken, cancerlikeComment)

// router.post('/', createBlog)
router.post('/report', verifyToken, createReport)

router.post('/prefer', verifyToken, updatePrefer)

router.put('/notificationtab/set', verifyToken, setNotificationTab)



export default router