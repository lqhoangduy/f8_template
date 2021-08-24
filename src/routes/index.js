const coursesRouter = require('./courses');
const meRouter = require('./me') 
const siteRouter = require('./site') 

function route(app) {
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;