/* 3 Routes:
        1) To register or create a user
        2) To Login
        3) To get the users info
*/

const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe, fetchAllUsersController } = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me',protect, getMe)
router.get("/fetchUsers", protect, fetchAllUsersController);

module.exports = router