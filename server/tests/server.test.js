const expect = require('expect')
const request = require('supertest')
const { ObjectID } = require('mongodb')

const { app } = require('./../server')
const { Todo } = require('./../models/todo')
const { User } = require('./../models/user')
const { todos, populateTodos } = require('./seed/seed')



const users = [{
  _id: new ObjectID(),
  email: 'test@chris.com',
  password: '123456'
}, {
  _id: new ObjectID(),
  email: 'test2@chris.com',
  password: '7891011'
}]

beforeEach(populateTodos)

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
          expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text }).then(todos => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })

  it('should not create todo with invalid body data', done => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(todos => {
          expect(todos.length).toBe(2)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(todos[0].text)
      })
      .end(done)
  })

  it('should return a 404 if todo not found', done => {
    let hexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })

  it ('should return 404 for non-object ids', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo', done => {
    let hexId = todos[1]._id.toHexString()
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect(res => {
        expect(res.body.todo._id).toBe(hexId)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId).then(todo => {
          expect(todo).toNotExist()
          done()
        }).catch(e => done())
      })
  })

  it('should return 404 if todo not found', done => {
    let hexId = new ObjectID().toHexString()
    request(app)
      .get(`/todos/${hexId}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if object id is invalid', done => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done)
  })
})

describe('PATCH /todos/:id', () => {
  it('should update the todo', done => {
    let hexId = todos[0]._id.toHexString()
    let text = 'Write code'
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text,
        completed: true
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(true)
        expect(res.body.todo.completedAt).toBeA('number')
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId).then(todo => {
          expect(todo).toExist()
          done()
        }).catch(e => done(e))
      })
  })

  it('should clear completedAt when todo is not completed', done => {
    let hexId = todos[1]._id.toHexString()
    let text = 'Write code again'
    request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text,
        completed: false
      })
      .expect(200)
      .expect(res => {
        expect(res.body.todo.text).toBe(text)
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.findById(hexId).then(todo => {
          expect(todo).toExist()
          done()
        }).catch(e => done(e))
      })
  })
})

// describe('POST /users', () => {
//   it('should create a user', done => {
//     let user = {
//       email: 'test3@chris.com',
//       password: '123456'
//     }
//     request(app)
//       .post(`/users`)
//       .send(user)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.email).toBe(user.email)
//         expect(res.body.password).toBe(user.password)
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err)
//         }
//         User.find(user).then(users => {
//           expect(users.length).toBe(1)
//           expect(users[0].email).toBe(user.email)
//           expect(users[0].password).toBe(user.password)
//           done()
//         }).catch(e => done(e))
//       })
//   })
// })
