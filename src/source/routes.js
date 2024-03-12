const {
  addBooksHandler,
  getAllbooksHandler,
  getItembooksHandler,
  editItembooksHandler,
  deleteItembooksHandler,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllbooksHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getItembooksHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editItembooksHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteItembooksHandler,
  },
];

module.exports = routes;
