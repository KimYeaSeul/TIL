// 1. Use Only Koa
/* 
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
    ctx.body = "Hello Everybody Koa";
});

app.listen(4000, () => {
    console.log('yeaseul server is listening to port 40000');
})
*/

/*
// 2. Use Koa & Router
const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/',(ctx, next) => {
    ctx.body = '홈';
});

router.get('/about', (ctx, next) =>{
    ctx.body = 'introduce';
});

router.get('/about/:name', (ctx, next) => {    // localhost:4000/about/kim
    const { name } = ctx.params;
    ctx.body = name + '`s introduce';
});

router.get('/post', (ctx, next) => {     // localhost:4000/post?id=1234
    const  { id } = ctx.request.query;
    if(id) {
        ctx.body = 'post #' + id;
    }else {
        ctx.body = 'There is no post id';
    }
})

// app.use(router.routes());
// app.use(router.allowedMethods());
app.use(router.routes()).use(router.allowedMethods());

app.listen(4000,() => {
    console.log('yeaseul server is listening to port 4000');
})
*/

//3. Use REST API

// 7. env 파일에서 환경변수 불러오기
require('dotenv').config();

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
const api = require('./api'); // http://localhost:4000/api/books

// 9. mongoose를 통해 데이터베이스에 연결하기

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; // Node 의 네이티브 Promise 사용

// mongodb 연결
mongoose.connect(process.env.MONGO_URI, {
    useMongoClient: true
}).then(
    (response) => {
        console.log('Succesfully connected to mongodb');
    }
).catch(e => {
    console.error(e);
});
// 9. mongoose를 통해 데이터베이스에 연결하기

const port = process.env.PORT || 4000; // 8. port 값 설정

router.use('/api', api.routes()); // api 라우트를 /api 경로 하위 라우트로 설정

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('yeaseul server is listening to port 4000');
})