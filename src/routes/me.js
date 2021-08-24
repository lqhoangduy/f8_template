const express = require('express');
const router = express.Router();

const MeController = require('../app/controllers/MeController');

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'courses';
    next();
});
router.get('/stored/courses', MeController.storedCourses)
router.get('/trash/courses', MeController.trashCourses)

module.exports = router;