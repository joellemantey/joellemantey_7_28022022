express = require('express');
const router = express.Router();

const authentificationCtrl = require('../authentification/authentification_controller');

router.post ('/signup', authentificationCtrl.signup );
router.post('/login', authentificationCtrl.login);

module.exports = router;
