// CRUD operations

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        return console.log('Unable to connect to database')
    }
    
    const db = client.db(databaseName)

    // db.collection('users').insertOne({
    //     name: 'Jhoe',
    //     age: 24
    // }, (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Carla',
    //         age: 30
    //     },
    //     {
    //         name: 'Migue',
    //         age: 34
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert document')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Buy PC',
    //         completed: true
    //     },
    //     {
    //         description: 'Fix kitchen',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if(error) {
    //         return console.log('Unable to insert tasks')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').findOne({ _id: new ObjectID('5cb1064a1de98a0f781daaeb')}, (error, user) => {
    //     if(error) {
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 24 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 24 }).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('users').updateOne({_id: new ObjectID('5cb102ae37ecef0f2678958c')}, {
    //     $set: {
    //         name: 'Moe'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('tasks').updateMany({ completed: false }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('users').deleteMany({ age: 24 }).then((result) => {
    //     console.log(result)
    // }).catch((err) => {
    //     console.log(err)
    // })
})


