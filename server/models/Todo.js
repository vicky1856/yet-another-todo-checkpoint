// const mongoose = require('mongoose');
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://vicky:12345@cluster0.kbprlzg.mongodb.net/checkpoints')
    .then(() => {
        console.log('Connected to mongodb')
    })
    .catch((err) => {
        console.log('error in connection to database')
    })

const TodoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        default: false
    }
});

export const Todo = mongoose.model('Todo', TodoSchema);

// module.exports = Todo;