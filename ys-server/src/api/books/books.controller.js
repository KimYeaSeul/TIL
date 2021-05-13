// exports.변수명 = .... 은 아래와 같이 불러올 수 있다.
// const 모듈명 = require('파일명');
// 모듈명.변수명
// 6. API handler 분리하기

const Book = require('../../models/book');

// const Book = require('models/book');

exports.list = async (ctx) => {
    
    let books;

    try {
        books = await Book.find()
            .sort({_id:  -1})
            .limit(3)
            .exec();
    } catch(e) {
        return ctx.throw(500,e);
    }

    ctx.body = books;
};

exports.get = async (ctx) => {
    const { id } = ctx.params;
    
    let book;

    try {
        book = await Book.findById(id).exec();
    } catch (e) {
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
        return ctx.throw(500, e);
    }

    if(!book) {
        ctx.status = 404;
        ctx.body = { message: 'book not found'};
        return;
    }

    ctx.body = book;
}

exports.create = async (ctx) => {
    const {
        title,
        authors,
        publishedDate,
        price,
        tags
    } = ctx.request.body;

    const book = new Book({
        title,
        authors,
        publishedDate,
        price,
        tags
    });

    try {
        await book.save();
    } catch(e) {
        return ctx.throw(500, e);
    }

    ctx.body = book;
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