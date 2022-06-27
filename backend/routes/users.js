express = require('express');
var router = express.Router();

const auth = require('../authentification/authentification_middleware')

const userCtrl = require('./users_controller');

/* GET users listing. */

router.get('/', userCtrl.getUsers)
router.get('/:id', userCtrl.getUserById );
router.delete('/:id', auth, userCtrl.deleteUser);

module.exports = router;
