const expect = require('expect');
const request = require('supertest');
const {app} = require('../server');
const {Todo} = require('../models/todo');


describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        const title = 'test todo title';
        const text = 'test todo text';

        request(app)
            .post('/todos')
            .send({title, text})
            .expect(200)
            .expect( (res) => {
                expect(res.body.title).toBe(title);
                expect(res.body.text).toBe(text);
            })
            .end( (err, res) => {
                if (err) {
                    return done(err);
                }
                done();
            });
    });
})