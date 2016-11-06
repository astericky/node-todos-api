const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connec to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate({
    _id: new ObjectID('581e92704dcc6e7a8b5f430c')
  }, {
    $set: {
      completed: true
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('581e94134dcc6e7a8b5f430d')
  }, {
    $set: {
      name: 'Chris',
      location: 'New York'
    },
    $inc: {
      age: -2
    }
  }).then(result => {
    console.log(result);
  })
  // db.close();
});
