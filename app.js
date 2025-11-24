const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
// const User = require('./models/User'); 

const app = express();

// MongoDB connection (move your URI into a .env file if possible)
const MONGODB_URI = 'mongodb+srv://07RRJ:meow@meow.4yx6anm.mongodb.net/?retryWrites=true&w=majority&appName=MEOW';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function testConnection() {
    try {
    await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    console.log('Ansluten till MongoDB Atlas!');


  } catch (err) {
    console.error('Fel vid anslutning:', err);
  }}

testConnection()

app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(shopRoutes);
app.use(adminRoutes);

app.use((req, res, next) => {
  res.status(404).send('<h1>Page not found</h1>');
});

const port = 3000;
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
