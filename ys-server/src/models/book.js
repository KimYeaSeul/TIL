// 2-3 스키마 모델 예제
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 스키마 2개

const Author = new Schema({
    name: String,
    email: String
});

const Book = new Schema({
    title: String,
    authors: [Author],
    publishedDate: Date,
    price: Number,
    tags: [String],
    createdAt:{ // when setting the default value, set it as an object
        type: Date,
        default: Date.now
    }
});

// Convert Schema to Model and export.

module.exports = mongoose.model('Book', Book);