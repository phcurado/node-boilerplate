var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose'); 
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json())

app.get('/todos', (req, res) => {
    Todo.find().then( (todos) => {
        res.send(todos);
    }).catch( (error) => {
        res.status(400).send(error);
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then( (todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch( (error) => {
        res.status(400).send(error);
    });
});

app.post('/todos', (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        text: req.body.text
    });
    todo.save().then( (doc) => {
        res.send(doc);
    }).catch( (error) => {
        res.status(400).send(error);
    });
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['title', 'text']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndUpdate(id, {$set: body }, {new: true}).then( (todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch( (error) => {
        res.status(400).send(error);
    });
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then( (todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send(todo);
    }).catch( (error) => {
        res.status(400).send(error);
    });

});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);

    user.save().then( doc => {
        res.send(doc);
    }).catch( error => {
        res.status(400).send(error);
    });

})



app.listen(port, () => {
    console.log(`Started on Port ${port}`);
});

module.exports = {app};