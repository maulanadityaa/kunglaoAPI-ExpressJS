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
const getAllUsers = async (req, res) => {
    try {
        let user = await knex('users');
        if(!user){
            res.status(404)
                .send({
                    success: false,
                    message: 'Users Not Found'
                })
        } else{
            res.status(200)
                .send({
                    success: true,
                    message: 'Get All Users',
                    data: user,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/users`);
}

//get user by username
const getUserByUsername = async (req, res) => {
    const username = req.params.username;

    try {
        let user = await knex('users').where('username', username);
        if(!user[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'User Not Found'
                })
        } else{
            res.status(200)
                .send({
                    success: true,
                    message: 'Get User by Username',
                    data: user,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/user/${username}`);
}

//update book
const editUser = async (req, res) => {
    const kondisi = req.body.kondisi
    const username = req.body.username

    try {
        let user = await knex('users').where('username', username);
        if(!user[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'User Not Found'
                })
        } else{
            let update = await knex('users').where('username', username).update('kondisi', kondisi)
            let user = await knex('users').where('username', username);
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Update User',
                    data: user
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/book`);
}



module.exports = { getAllUsers, getUserByUsername, editUser }