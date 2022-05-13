const express = require('express');
const router = express.Router();
const node = require('../controllers/nodes');

router.get('/', function(req, res){
    node.index(req,res);
});

router.post('/addnode', function(req, res) {
    node.create(req,res);
});

router.get('/getnode', function(req, res) {
    node.list(req,res);
});

module.exports = router;
