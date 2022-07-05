const express = require('express');
// var router = express.Router();
const mysql = require('mysql');
const app = express();
app.use(express.json()); // version 이 높아지면서 router를 안쓰고 이걸 쓰면 되게 되었다고 한다.

const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '1234',
    database: 'restApi'
})

app.get('/',(req, res)=>{
    // console.log(req);
    // console.log(res);
    res.send('hello world');
})
app.get('/user', (req, res) => {
    db.query('select * from user',  (err, result, fields) => {
        if(err) res.send({status:400, result: err})
        res.send({status : 200 , result : result})
    })
})
app.post('/user', (req, res)=>{
    console.log(req.body);
    const { id, name, age } = req.body; //es6 distructures
    db.query(`insert into user(name,age) values( ?, ?)`, [name, age],
    (err , result) => {
        if(err) res.send(err)
        res.send(result)
    });
})
app.delete('/user/:id', (req, res)=>{
    db.query('delete from user where id=?', [req.params.id], (err, result) => {
        if(err) res.send(err)
        res.send({status : 200 , result : result});
    })
})
app.put('/user/:id', (req, res) =>{
    db.query('update user set name = ?, age = ? where id = ?', [req.body.name, req.body.age, req.params.id],
    (err, result) => {
        if(err) res.send(err)
        res.send({status: 200, result : result})
    })
})

app.listen(3030,()=>{
    console.log('listening in 3030');
})