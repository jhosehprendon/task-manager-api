const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const multer = require('multer');

const router = new express.Router();

//////// USER ROUTES ////////

// app.post('/users', (req, res) => {
//     const user = new User(req.body)

//     user.save().then(() => {
//         res.status(201).send(user)
//     }).catch(err => {
//         res.status(400).send(err)
//     })
// })

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch(e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => {
            return token.token !== req.token
        })
        
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {

    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch(e) {
    //     res.status(500).send()
    // }

    // User.find({}).then((users) => {
    //     res.status(200).send(users)
    // }).catch((err) => {
    //     res.status(500).send()
    // })
})

// router.get('/users/:id', auth, async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)

//         if(!user) {
//             return res.status(404).send()
//         }
//         res.status(200).send(user)
//     }catch(e) {
//         res.status(500).send()
//     }
    
   
//     // User.findById(req.params.id).then((user) => {
//     //     if(!user) {
//     //         return res.status(404).send()
//     //     }
//     //     res.status(200).send(user)
//     // }).catch((err) => {
//     //     res.status(500).send()
//     // })
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidOperation = updates.every(el => {
        return allowedUpdates.includes(el)
    })

    if(!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates'})
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        updates.forEach((el) => req.user[el] = req.body[el])

        await req.user.save()

        res.send(req.user)
    }catch(e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id)

        // if(!user) {
        //     res.send(404).send()
        // }

        await req.user.remove()
        res.send(req.user)
    }catch(e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({
        error: error.message
    })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {   
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch(e) {
        res.status(404).send()
    }
})


module.exports = router
