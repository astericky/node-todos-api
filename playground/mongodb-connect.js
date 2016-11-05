const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connec to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something todo',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Chris',
  //   age: 27,
  //   location: 'New York'
  // }, (error, result) => {
  //   if (error) {
  //     return console.log('Unable to insert todo', error);
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  // });

  db.close();
});
