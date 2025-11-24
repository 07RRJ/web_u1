const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /add - Add new user/list item
router.post('/add', async (req, res) => {
    const { lista, lista2 } = req.body;

try {
    // Create a new User document in MongoDB
    await User.create({ lista, lista2 });

    // Fetch all entries to update the list on the page
    const responses = await User.find({}, 'lista lista2');

    // Render with success message and updated responses
    res.render('index', {
        output: `Ny post tillagd: ${lista} - ${lista2}`,
        responses: responses.map(u => ({ lista: u.lista, lista2: u.lista2 })),
    });
    } catch (err) {
        res.render('index', {
            output: `Fel vid tillägg: ${err.message}`,
            responses: [],
        });
    }
});

module.exports = router;
