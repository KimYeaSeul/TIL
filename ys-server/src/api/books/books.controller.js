// exports.변수명 = .... 은 아래와 같이 불러올 수 있다.
// const 모듈명 = require('파일명');
// 모듈명.변수명
// 6. API handler 분리하기

exports.list = (ctx) => {
    ctx.body = 'listed';
};

exports.create = (ctx) => {
    ctx.body ='created';
}

exports.delete = (ctx) => {
    ctx.body = 'deleted';
}

exports.replace = (ctx) => {
    ctx.body = 'replaced';
}

exports.update = (ctx) => {
    ctx.body = 'updated';
}