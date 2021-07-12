const knex = require('../config/database');
var session = require('express-session');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

//get current date and time
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;


const login = async (req, res) => {
    try{
        const username = req.body.username
        const password = req.body.password

        if(username && password){
            const hashpw = bcrypt.hashSync(password, salt)
            let auth = await knex('users').where({username: username, password: hashpw})
            if(!auth[0]){
                res.status(404)
                    .send({
                        success: false,
                        messages: 'Username or Password Invalid',
                    })
                console.log(auth)
            } else{
                req.session.loggedin = true;
                req.session.username = username;
                res.status(200)
                    .send({
                        success: true,
                        messages: 'Welcome, '+username
                    })
            }
        } else{
            res.status(404)
                .send({
                    success: false,
                    messages: 'Please Enter Username and Password'
                })
        }
    } catch (e){
        console.log(e)
    }
    console.log(dateTime+`  /api/login`);
}

const register = async (req, res) => {
    try{
        const username = req.body.username
        const password = req.body.password

        if(username && password){
            const hashpw = bcrypt.hashSync(password, salt)
            let auth = await knex('users').insert({
                username: username,
                password: hashpw,
                role: 1,
                kondisi: 1
            })
            if(auth){
                res.status(200)
                    .send({
                        success: true,
                        messages: 'Register Success'
                    })
            } else{
                res.status(404)
                    .send({
                        success: false,
                        messages: 'Register Failed',
                        data: auth
                    })
            }
        } else{
            res.status(404)
                .send({
                    success: false,
                    messages: 'Please Enter Username and Password'
                })
        }
    } catch (e){
        console.log(e)
    }
    console.log(dateTime+`  /api/register`);
}

const logout = async (req, res) => {
    try{
        const username = req.body.username

        if(username){
            let auth = await knex('users').where('username', username)
            if(!auth[0]){
                res.status(404)
                    .send({
                        success: false,
                        message: 'Logout Failed'
                    })
            } else{
                req.session.destroy()
                res.status(200)
                    .send({
                        success: true,
                        message: 'Logout Success'
                    })
            }
        } else{
            res.status(404)
                .send({
                    success: false,
                    messages: 'Please Enter Username and Password'
                })
        }
    } catch (e){
        console.log(e)
    }
    console.log(dateTime+`  /api/register`);
}


module.exports = { login, register,logout }