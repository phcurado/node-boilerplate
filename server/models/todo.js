var mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    title: {
        type: String,
        maxLength: 10,
        required: true
    },
    text: {
        type: String
    }
});

module.exports = {Todo};