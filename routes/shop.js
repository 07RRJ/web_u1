const express = require('express');
const router = express.Router();
const fs = require("fs")
const path = require('path');

const dataPath = path.join(__dirname, "..", 'data.json');
const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
router.get('/', (req, res, next) => {
  res.render('index', { names: jsonData.names});
});

routs.get("/", (req, res, next) => {
  res.render('page', {}) 
});

router.get('/', function (req, res, next) {
  res.render('landingpg', {}) 
}
);

router.get('/page', function (req, res, next) {
  res.render('page', {}) 
}
);

router.get('/page1', function (req, res, next) {
  res.render('page1', {}) 
}
);

module.exports = router;