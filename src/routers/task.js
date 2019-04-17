const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth')

const router = new express.Router();


//////// TASKS ROUTES ////////

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(err)
    }

    // task.save().then(() => {
    //     res.status(201).end(task)
    // }).catch(err => {
    //     res.status(400).send(err)
    // })
})


// GET /tasks?completed=false

router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    try {
        // const tasks = await Task.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        // res.send(tasks)
        res.send(req.user.tasks)
    } catch(e) {
        res.status(500).send()
    }
    
    // Task.find({}).then(tasks => {
    //     res.send(tasks)
    // }).catch(err => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {

    const _id = req.params.id

    try {
        // const task = await Task.findById(req.params.id)

        const task = await Task.findOne({ _id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }

})

router.patch('/tasks/:id', auth, async (req, res) => {
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
        
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
   
        if(!task) {
            return res.status(404).send()
        }
        
        updates.forEach((el) => task[el] = req.body[el])
        await task.save()
        res.send(task)
        
    }catch(e) {
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            res.send(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
})

module.exports = router
