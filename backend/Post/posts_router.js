express = require('express');
const router = express.Router();
const multer = require('../multer-config');

const auth = require('../authentification/authentification_middleware')

const postsCtrl = require('./posts_controller');

router.post('/', auth, multer, postsCtrl.create);
// router.post('/login', postsCtrl.login);

router.get('/', auth, postsCtrl.getPosts );
router.put('/:id',auth, multer, postsCtrl.modifyPost);
router.delete('/:id', auth, postsCtrl.deletePost);
module.exports = router;
