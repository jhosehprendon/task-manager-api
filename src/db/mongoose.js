const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB connected')
})

// const me = new User({
//     name: 'Carlos',
//     age: 24,
//     email: 'joe@gmail.com',
//     password: 'Password123'
// })

// me.save().then(result => {
//     console.log(result)
// }).catch(err => {
//     console.log(err)
// })

// const task = new Task({
//     description: 'Hola',
//     completed: true
// })

// task.save().then((result) => {
//     console.log(result)
// }).catch((err) => {
//     console.log(err)
// })