// 3. 라우터의 모듈화
/*
const Router = require('koa-router');

const api = new Router();

api.get('/books', (ctx, next) => {
    ctx.body = 'GET ' + ctx.request.path;
});

module.exports = api;
*/

// 4. 여러종류의 APi 만들어 분리하기
const Router = require('koa-router');

const api = new Router();
const books = require('./books');

api.use('/books', books.routes());

module.exports = api;