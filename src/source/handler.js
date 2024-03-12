const { nanoid } = require('nanoid');
const books = require('./books');

const getAllbooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined) {
    const book = books.filter(
      (b) => b.name.toLowerCase().includes(name.toLowerCase()),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: book.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  if (reading !== undefined) {
    const book = books.filter(
      (b) => Number(b.reading) === Number(reading),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: book.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  if (finished !== undefined) {
    const book = books.filter(
      (b) => Number(b.finished) === Number(finished),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: book.map((b) => ({
          id: b.id,
          name: b.name,
          publisher: b.publisher,
        })),
      },
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((book) => ({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      })),
    },
  }).code(200);
  return response;
};

// const getAllbooksHandler = (request, h) => {
//   const { booknames, reading, finished } = request.query;

//   let filtered = books.map(({ id, name, publisher }) => ({ id, name, publisher }));
//   if (booknames) {
//     const keyword = booknames.toLowerCase();
//     filtered = filtered.filter((b) => b.name.toLowerCase().includes(keyword));
//   }

//   if (reading !== undefined) {
//     const isReading = reading === '1';
//     filtered = filtered.filter((b) => b.reading === isReading);
//   }

//   if (finished !== undefined) {
//     const isFinished = finished === '1';
//     filtered = filtered.filter((b) => b.finished === isFinished);
//   }

//   const response = h.response({
//     status: 'success',
//     data: {
//       books: filtered,
//     },
//   }).code(200);
//   return response;
// };

const addBooksHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (!name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBooks = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBooks);

  const response = h.response({
    status: 'success',
    message: 'Buku berhasil ditambahkan',
    data: {
      bookId: id,
    },
  }).code(201);
  return response;
};

const getItembooksHandler = (request, h) => {
  const { bookId } = request.params;

  const book = books.filter((b) => b.id === bookId)[0];
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
  return response;
};

const editItembooksHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  const index = books.findIndex((b) => b.id === bookId);

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
    return response;
  }

  if (index !== -1) {
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      finished,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
  return response;
};

const deleteItembooksHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
  return response;
};

module.exports = {
  addBooksHandler,
  getAllbooksHandler,
  getItembooksHandler,
  editItembooksHandler,
  deleteItembooksHandler,
};
