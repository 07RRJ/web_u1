const express = require('express');
const router = express.Router();
const User = require('../models/User');

// /admin/add-product => POST
router.get('/admin', async (req, res) => {
    const responses = await User.find({}, 'lista lista2');
    res.render('admin', {
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
        res.render('admin', {
            output: outputMsg,
            responses: responses
        });
    } catch (err) {
        res.render('admin', {
            output: `Fel: ${err.message}`,
            responses: []
        });
    }
});

module.exports = router;
