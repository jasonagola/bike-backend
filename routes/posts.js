const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const multer = require('multer')

const uploadPosts = multer({
    dest: 'posts/',
    fileFilter: (req, file, cb) => {
        // Check if the 'uploads' directory exists
        if (!fs.existsSync('posts/')) {
        // Create the 'uploads' directory if it doesn't exist
            fs.mkdirSync('posts/');
        }
        // Continue with file upload
        cb(null, true);
    }
})

router.get('/posts', postController.getPosts);

router.post('/posts', uploadPosts.single('photo'), postController.uploadPost)

router.get('/posts/user', postController.getUserPosts)

module.exports = router;