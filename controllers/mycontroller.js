const express = require('express');
const router = express.Router();
const myModel = require('../models/mymodel');

router.get('/', async (req, res) => {
    myModel.find().exec((err, users) => {
        if (!err) {
            res.render('index', { title: 'Index page', users: users });
        }
    })
});

router.get('/addOrEdit/:id?', async (req, res) => {
    try {
        const id = req.params.id;
        let users;
        if (id) {
            users = await myModel.findById(id);
        }
        res.render('addOrEdit', { users });
    } catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch item');
    }
});

router.post('/myform', async (req, res) => {
    try {
        const id = req.body.id;
        const username = req.body.username;
        const email = req.body.email;
        const gender = req.body.gender;
        const mobile = req.body.mobile;
        let users;

        if (id) {
            users = await myModel.findByIdAndUpdate(id, { username, email, gender, mobile }, { new: true })
        } else {
            users = new myModel({ username, email, gender, mobile });
            await users.save();
        }
        res.redirect('/');
    } catch (err) {
        console.log(err);
    }
});

router.get('/delete/:id', async (req,res)=>{
    try{
        const id= req.params.id;
        await myModel.findByIdAndDelete(id);
        res.redirect('/');
    }catch(err)
    {
        console.log(err);
    }
});

module.exports = router;