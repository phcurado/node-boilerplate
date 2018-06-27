var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
    title: {
        type: String,
        maxlength: 10,
        required: true
    },
    text: {
        type: String
    }
});

module.exports = { Todo };