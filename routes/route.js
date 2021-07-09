const router = require('express').Router();
const knex = require('../config/database');
const { book } = require('../controllers');
const { user } = require('../controllers')
const { pinjaman } = require('../controllers')


//BOOKS MANAGEMENTS
// GET localhost:8000/api/books => get all books
router.get('/api/books', book.getAllBooks)

//GET localhost:8000/api/book/id/{id} => get book by id
router.get('/api/book/id/:id', book.getBookByID);

//GET localhost:8000/api/book/judul/{judul} => get book by judul
router.get('/api/book/judul/:judul', book.getBookByJudul);

//POST localhost:8000/api/book => add book
router.post('/api/book', book.addBook);

//PUT localhost:8000/api/book => update data book
router.put('/api/book', book.updateBook);

//DELETE localhost:8000/api/book => delete a book
router.delete('/api/book', book.deleteBook);


//USERS MANAGEMENTS
// GET localhost:8000/api/users => get all users
router.get('/api/users', user.getAllUsers)

// GET localhost:8000/api/user/{username} => get user by username
router.get('/api/user/:username', user.getUserByUsername)

// PUT localhost:8000/api/user/ => edit user by username
router.put('/api/user/', user.editUser)

//PEMINJAMANS MANAGEMENTS
// GET localhost:8000/api/pinjaman => get all users
router.get('/api/pinjaman', pinjaman.showPinjaman)

// POST localhost:8000/api/pinjaman => get all users
router.post('/api/pinjaman', pinjaman.storePinjaman)

// DELETE localhost:8000/api/pinjaman => delete pinjaman
router.delete('/api/pinjaman', pinjaman.deletePinjaman)

module.exports = router;