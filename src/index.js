const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars  = require('express-handlebars');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

// Override phương thức get/post -> put, patch, delete,...
app.use(methodOverride('_method'));

// custom middlewares
app.use(SortMiddleware);

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Middleware để xử lý req.body
app.use(express.urlencoded({
  extended: true,
}));
app.use(express.json());

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine('hbs', handlebars({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    sum: (a, b) => a + b,
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default';
      const icons = {
        default: 'fas fa-sort',
        asc: 'fas fa-sort-amount-down-alt',
        desc: 'fas fa-sort-amount-down',
      }

      const types = {
        default: 'desc',
        asc: 'desc',
        desc: 'asc'
      }

      const icon = icons[sortType]
      const type = types[sortType]

      return `
        <a href="?_sort&column=${field}&type=${type}">
          <i class="${icon}"></i>
        </a>
        `;
    }
  },
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Route init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});