const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log('connected')
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if(value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('age must be positive')
            }
        }
    }
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
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