//4. 여러종류의 API 만들어 분리하기
const Router = require('koa-router');

const books = new Router();

/*
const handler = (ctx, next) =>{
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

// books.get('/', (ctx, next) => {
//     ctx.body = 'GET ' + ctx.request.path;
// });

// 5. 여러 메소드 사용하기
books.get('/', handler); //데이터를 가지고 올 때 사용
books.post('/',handler); // 데이터를 등록할 때 사용. 인증작업을 거칠때도 사용
books.delete('/', handler); // 데이터를 지울 때 사용
books.put('/', handler); // 데이터를 교체 할 때 사용
books.patch('/', handler); //데이터의 특정 필드를 수정 할 때 사용
*/

// 6. API handler 분리하기
const booksCtrl = require('./books.controller');
books.get('/', booksCtrl.list);
books.post('/', booksCtrl.create);
books.delete('/', booksCtrl.delete);
books.put('/', booksCtrl.replace);
books.patch('/', booksCtrl.update);

module.exports = books;