const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    createFriend,
    removeFriend
} = require('../../controllers/user-controller');


// Set up GET all and POST at /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser)

// Set up GET one, PUT, and DELETE at /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// Setup POST and DELETE to add and remove friends

router
    .route('/:userId/friends/:friendId')
    .post(createFriend)
    .delete(removeFriend)

module.exports = router;