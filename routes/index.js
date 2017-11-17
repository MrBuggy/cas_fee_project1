var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// CONNECT TO MONGODB
mongoose.connect('localhost:27017/test');

// SCHEMA FOR DATA
var Schema = mongoose.Schema;
var notesSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: false
    },
    highPriority: {
        type: Boolean,
        required: false
    }
});

var userSchema = new Schema({
    id: {
        type: String,
        required: false
    },
    hasDarculaTheme: {
        type: Boolean,
        required: true
    }
});

var NotesData = mongoose.model('NotesData', notesSchema);

// OPEN OVERVIEW
router.get('/', (req, res, next) => {
    NotesData.find().then((data) => {
        res.render('overview', {items: data})
    });
});

// OPEN ADD VIEW
router.get('/openDetail', (req, res, next) => {
    res.render('detail');
});

// OPEN EDIT VIEW
router.post('/openEdit', (req, res, next) => {
    var item = {
        id: req.body.id,
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        done: req.body.done,
        highPriority: req.body.highPriority
    };
    console.log(item);
    res.render('edit', {item: item});
});

// INSERT DATA
router.post('/insert', (req, res, next) => {
    var item = {
        title: req.body.title,
        description: req.body.description,
        dueDate: req.body.dueDate,
        done: req.body.done,
        highPriority: req.body.highPriority
    };

    console.log(item);

    var data = new NotesData(item);
    data.save();

    res.redirect('/');
});

// UPDATE DATA
router.post('/update', (req, res, next) => {
    var id = req.body.id;
    NotesData.findById(id, (err, data) => {
        if (err) {
            console.log('error!');
        }
        data.title = req.body.title;
        data.description = req.body.description;
        data.dueDate = req.body.dueDate;
        data.done = req.body.done;
        data.highPriority = req.body.highPriority;
        data.save();
    });

    res.redirect('/');
});

// SET DONE OR NOT DONE
router.post('/setDone', (req, res, next) => {
    var id = req.body.id;
    NotesData.findById(id, (err, data) => {
        if (err) {
            console.log('error!');
        }
        data.done = req.body.done;
        data.save();
    });

    res.redirect('/');
});

// DELETE DATA
router.post('/delete', (req, res, next) => {
    var id = req.body.id;
    NotesData.findByIdAndRemove(id).exec();
    res.redirect('/');
});

module.exports = router;