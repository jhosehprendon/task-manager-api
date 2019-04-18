const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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