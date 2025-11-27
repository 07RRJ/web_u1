const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET Home
router.get('/', async (req, res) => {
    const responses = await User.find({}, 'lista lista2');
    res.render('index', {
        output: null,
        responses: responses // array of objects with lista and lista2
    });
});

// Find
router.post('/find', async (req, res) => {
    const lan = req.body.lan;
    try {
        const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });
        const responses = await User.find({}, 'lista lista2');
        const outputMsg = result
            ? `Län: ${result.lista}, Residensstad: ${result.lista2}`
            : `Inget län hittades med namnet "${lan}".`;
        res.render('index', {
            output: outputMsg,
            responses: responses
        });
    } catch (err) {
        res.render('index', {
            output: `Fel: ${err.message}`,
            responses: []
        });
    }
});

// Delete
router.post('/delete', async (req, res) => {
    const lan = req.body.lan;
    try {
        const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });
        if (!result) {
            const responses = await User.find({}, 'lista lista2');
            return res.render('index', {
                output: `Inget län hittades med namnet "${lan}".`,
                responses: responses
            });
        }
        await User.deleteOne({ _id: result._id });
        const responses = await User.find({}, 'lista lista2');
        res.render('index', {
            output: `Länet "${lan}" har tagits bort.`,
            responses: responses
        });
    } catch (err) {
        res.render('index', {
            output: `Fel: ${err.message}`,
            responses: []
        });
    }
});

// Update
router.post('/update', async (req, res) => {
    const lan = req.body.lan;
    const nyttNamn = req.body.nyttNamn;
    try {
        const result = await User.findOne({ lista: new RegExp(`^${lan}$`, 'i') });
        if (!result) {
            const responses = await User.find({}, 'lista lista2');
            return res.render('index', {
                output: `Inget län hittades med namnet "${lan}".`,
                responses: responses
            });
        }
        const updateResult = await User.findOneAndUpdate(
            { _id: result._id },
            { $set: { lista: nyttNamn } },
            { new: true }
        );
        const responses = await User.find({}, 'lista lista2');
        res.render('index', {
            output: `Länets namn uppdaterades till: ${updateResult.lista}`,
            responses: responses
        });
    } catch (err) {
        res.render('index', {
            output: `Fel: ${err.message}`,
            responses: []
        });
    }
});

// Add New User
router.post('/add', async (req, res) => {
    const { lista, lista2 } = req.body;
    try {
        await User.create({ lista, lista2 });
        const responses = await User.find({}, 'lista lista2');
        res.render('index', {
            output: `Ny post tillagd: ${lista} - ${lista2}`,
            responses: responses
        });
    } catch (err) {
        res.render('index', {
            output: `Fel vid tillägg: ${err.message}`,
            responses: []
        });
    }
});

module.exports = router;
