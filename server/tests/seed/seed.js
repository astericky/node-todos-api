const { ObjectID } = require('mongodb')
const jwt = require('jsonwebtoken')

const { Todo } = require('./../../models/todo')
const { User} = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
  _id: userOneId,
  email: 'chris@test.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'andrew@example.com',
  password: 'userTwoPass'
}]

const todos =  [{
  _id: new ObjectID(),
  text: 'First text todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos)
  }).then(() => done())
}

module.exports = {
  todos,
  populateTodos
}
