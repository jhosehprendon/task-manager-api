const express = require('express');
const Task = require('../models/task');

const router = new express.Router();


//////// TASKS ROUTES ////////

router.post('/tasks', async (req, res) => {
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

router.get('/tasks', async (req, res) => {
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

router.get('/tasks/:id', async (req, res) => {

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

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(el => {
        return allowedUpdates.includes(el)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        
        const task = await Task.findById(req.params.id)
        updates.forEach((el) => user[el] = req.body[el])

        await task.save()
        
        
        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            res.send(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router
