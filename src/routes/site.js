const express = require('express');
const router = express.Router();

const SiteController = require('../app/controllers/SiteController.js');

router.get('/', function (req, res, next) {
    req.app.locals.layout = 'main';
    next();
});
router.get('/', SiteController.index)


module.exports = router;