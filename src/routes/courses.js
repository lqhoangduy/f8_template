const express = require('express');
const router = express.Router();

const CoursesController = require('../app/controllers/CoursesController');

router.all('/*', function (req, res, next) {
    req.app.locals.layout = 'courses';
    next();
});
router.get('/create', CoursesController.create)
router.post('/store', CoursesController.store)
router.get('/:slug', CoursesController.showCourse)
router.get('/:id/edit', CoursesController.edit)
router.post('/handle-form-actions', CoursesController.handleFormActions)
router.post('/handle-form-actions-in-trash', CoursesController.handleFormActionsInTrash)
router.put('/:id', CoursesController.update)
router.patch('/:id/restore', CoursesController.restore)
router.delete('/:id/force', CoursesController.force)
router.delete('/:id', CoursesController.delete)
router.get('/', CoursesController.index)

module.exports = router;