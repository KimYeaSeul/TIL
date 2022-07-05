const express = require('express');
const mysql = require('mysql');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'restApi'
})

app.get('/',(req, res)=>{
    // console.log(req)
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
    db.query(`insert into user(id,name,age) values(?, ?, ?)`, [id, name, age],
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
app.listen(3000,()=>{
    console.log('listening in 3000');
})
