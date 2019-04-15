const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

//////// USERS ////////

// app.post('/users', (req, res) => {
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch(err => {
//         res.status(400).send(err)
//     })
// })

app.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }

})

app.get('/users', async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }

    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user) {
            return res.status(404).send()
        }
        res.status(200).send(user)
    }catch(e) {
        res.status(500).send()
    }
    
   
    // User.findById(req.params.id).then((user) => {
    //     if(!user) {
    //         return res.status(404).send()
    //     }
    //     res.status(200).send(user)
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

app.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every(el => {
        return allowedUpdates.includes(el)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!user) {
            return res.status(404).send()
        }
        res.send(user)
    }catch(e) {
        res.status(400).send()
    }
})

//////// TASKS ////////

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).end(task)
    } catch(e) {
        res.status(400).send(err)
    }

    // task.save().then(() => {
    //     res.status(201).end(task)
    // }).catch(err => {
    //     res.status(400).send(err)
    // })
})

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch(e) {
        res.status(500).send()
    }
    
    // Task.find({}).then(tasks => {
    //     res.send(tasks)
    // }).catch(err => {
    //     res.status(500).send()
    // })
})

app.get('/tasks/:id', async (req, res) => {

    try {
        const task = await Task.findById(req.params.id)
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

})

app.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(el => {
        return allowedUpdates.includes(el)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(400).send()
    }
})







