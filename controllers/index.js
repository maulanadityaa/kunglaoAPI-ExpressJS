const book = require('./BookController');
const user = require('./UserController')
const pinjaman = require('./PeminjamanController')
const auth = require('./AuthController')

module.exports = {
    book, user, pinjaman, auth
}