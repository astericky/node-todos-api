const { ObjectID } = require('mongodb')

const { mongoose } = require('./../server/db/mongoose')
const { Todo } = require('./../server/models/todo')
const { User } = require('./../server/models/user')

// const id = '58265914f752480decad27b2'
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid')
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// })
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found!')
//   }
//   console.log('Todo', todo)
// }).catch(e => console.log(e))

const id = '581f7ca7b7554d67407d4b2a'

if (!ObjectID.isValid(id)) {
  console.log('ID not valid')
}

User.findById(id).then(user => {
  if (!user) {
    return console.log('User not found!')
  }
  console.log('User', user)
}).catch(e => console.log(e))
