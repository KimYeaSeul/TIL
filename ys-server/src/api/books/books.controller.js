// exports.변수명 = .... 은 아래와 같이 불러올 수 있다.
// const 모듈명 = require('파일명');
// 모듈명.변수명
// 6. API handler 분리하기

// const Book = require('../../models/book');
const Book = require('models/book');

const Joi = require('joi');  // 검증하는 라이브러리
const { Types:{ObjectId}} = require('mongoose');
// 위의 코드는 아래  코드와 같다.
// const ObjectId = require('mongoose').Types.ObjectId

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

exports.delete = async (ctx) => {
    const { id } = ctx.params;

    try {
        await Book.findByIdAndRemove(id).exec();
    } catch(e) {
        if(e.name === 'CastError') {
            ctx.status = 400;
            return;
        }
    }

    ctx.status = 204; // no content
}

// PUT Method : 데이터 전체를 통째로 변경
// PATCH Method : 주어진 필드의 데이터만 수정
exports.replace = async (ctx) => {
    const { id } = ctx.params;

    if(!ObjectId.isValid(id)) {
        ctx.status = 400; //Bad Request
        return;
    }

    // 검증할 스키마, 객체의 field 검증, required() 는 필수 항목.
    const schema = Joi.object().keys({
        title:Joi.string().require(),
        authors: Joi.array().items(Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required()
        })),
        publishedDate: Joi.date().required(),
        price: Joi.number().required(),
        tags: Joi.array().items((Joi.string()).required())
    });

    //validate를 통한 검증
    const result = Joi.validate(ctx.request.body, schema);

    //schema 가 잘못됐다면
    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }

    //데이터가 존재하지 않으면 새로 데이터를 만들도록 설정
    let book;

    try {
        book = await Book.findByIdAndUpdate(id, ctx.request.body, {
            upsert: true,
            new: true
        });
    } catch(e) {
        return ctx.throw(500, e);
    }
    ctx.body = book;
}

exports.update = async (ctx) => {
    const { id } = ctx.params;

    if(!ObjectId.isValid(id)) {
        ctx.status = 400;
        return;
    }

    let book;

    try {
        book = await Book.findByIdAndUpdate(id, ctx.request.body, {
            new : true // 이 값을 넣어줘야 반환하는 값이 업데이트 됨
        });
    } catch (e) {
        return ctx.throw(500, e);
    }

    ctx.body = book;
}