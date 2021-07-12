const knex = require('../config/database');
const mysql = require('mysql');
const { response } = require('express');
const CircularJSON = require('circular-json');
// const pool = mysql.createPool(config);

//get current date and time
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// pool.on('error', (err) => {
//     console.error(err);
// });


//get all books
const getAllBooks = async (req, res) => {
    try {
        let buku = await knex('books');
        const string = JSON.stringify(buku)
        const databuku = JSON.parse(string)
        if(!buku){
            res.status(404)
                .send({
                    success: false,
                    message: 'Books Not Found'
                })
        } else{
            res.status(200)
                .send({
                    success: true,
                    message: 'Get All Books',
                    data: databuku,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/books`);
}

//get book by id
const getBookByID = async (req, res) => {
    const id = req.params.id;

    try {
        let buku = await knex('books').where('id', id);
        // const results = res.json(buku)
        if(!buku[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Books Not Found'
                })
        } else if(buku){
            res.status(200)
                .send({
                    success: true,
                    message: 'Get Book by ID',
                    data: buku,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book/id/${id}`);
}

//get book by judul
const getBookByJudul = async (req, res) => {
    const judul = req.params.judul;

    try {
        let buku = await knex('books').where('judul', judul);
        if(!buku[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Books Not Found'
                })
        } else{
            res.status(200)
                .send({
                    success: true,
                    message: 'Get Book by Judul',
                    data: buku,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book/judul/${judul}`);
}

//add book
const addBook = async (req, res) => {
    const data = {
        judul: req.body.judul,
        penulis: req.body.penulis,
        kategori: req.body.kategori,
        stock: req.body.stock
    }

    try {
        let buku = await knex('books').insert(data);
        if(!buku[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Add Book Failed'
                })
        } else{
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Add Book',
                    data: data,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book`);
}

//update book
const updateBook = async (req, res) => {
    const data = {
        judul: req.body.judul,
        penulis: req.body.penulis,
        kategori: req.body.kategori,
        stock: req.body.stock
    }
    const id = req.body.id

    try {
        let buku = await knex('books').where('id', id);
        if(!buku[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Book Not Found'
                })
        } else{
            let update = await knex('books').where('id', id).update(data)
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Update Book',
                    data: data,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book`);
}

//delete book
const deleteBook = async (req, res) => {
    const id = req.body.id

    try {
        let buku = await knex('books').where('id', id);
        if(!buku[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Book Not Found'
                })
        } else{
            let del = await knex('books').where('id', id).del();
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Delete Book',
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book`);
}

module.exports = { getAllBooks, getBookByID, getBookByJudul, addBook, updateBook, deleteBook }