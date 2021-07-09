const { user } = require('.');
const knex = require('../config/database');

//get current date and time
var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

// pool.on('error', (err) => {
//     console.error(err);
// });


//get all books
const showPinjaman = async (req, res) => {
    const username = req.body.username

    try {
        let pinjaman = await knex('peminjamans').where('username', username);
        if(!pinjaman[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'User Belum Meminjam'
                })
        } else{
            const stringify = JSON.stringify(pinjaman)
            var datapinjam = JSON.parse(stringify)
            let buku = await knex('books').where('id', datapinjam[0].id_buku)
            res.status(200)
                .send({
                    success: true,
                    message: 'Show Pinjaman',
                    id_pinjam: datapinjam[0].id_buku,
                    data: buku,
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/pinjaman`);
}

//add pinjaman
const storePinjaman = async (req, res) => {
    const data = {
        username: req.body.username,
        id_buku: req.body.id_buku
    }

    try {
        let pinjaman = await knex('peminjamans').insert(data);
        if(!pinjaman[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Store Peminjaman Failed'
                })
        } else{
            let buku = await knex('books').where('id', data.id_buku);
            const string = JSON.stringify(buku)
            const databuku = JSON.parse(string)
            let updateBuku = await knex('books').where('id', data.id_buku).update('stock', databuku[0].stock-1);
            let updateUser = await knex('users').where('username', data.username).update('kondisi', 0);
            let pinjamanBaru = await knex('peminjamans').where('username', data.username);
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Add Peminjaman',
                    pinjaman : pinjamanBaru
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/pinjaman`);
}

//delete pinjaman
const deletePinjaman = async (req, res) => {
    const username = req.body.username

    try {
        let pinjaman = await knex('peminjamans').where('username', username);
        if(!pinjaman[0]){
            res.status(404)
                .send({
                    success: false,
                    message: 'Peminjaman Not Found'
                })
        } else{
            const stringifyPinjam = JSON.stringify(pinjaman)
            const dataPinjam = JSON.parse(stringifyPinjam)
            let buku = await knex('books').where('id', dataPinjam[0].id_buku)
            const stringifyBuku = JSON.stringify(buku)
            const dataBuku = JSON.parse(stringifyBuku)
            let updateBuku = await knex('books').where('id', dataPinjam[0].id_buku).update('stock', dataBuku[0].stock+1)
            let updateUser = await knex('users').where('username', username).update('kondisi', 1)
            let deletePinjaman = await knex('peminjamans').where('username', username).del()
            res.status(200)
                .send({
                    success: true,
                    message: 'Success Delete Pinjaman',
                })
        }
    } catch (e) {
        console.log(e);
    }
    console.log(dateTime+`  /api/pinjaman`);
}


module.exports = { showPinjaman, storePinjaman, deletePinjaman }