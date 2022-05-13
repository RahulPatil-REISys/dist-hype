const express = require('express');
const router = express.Router();
const dashboard = require('../controllers/dashboard');

router.get('/:id', function(req, res){
    dashboard.get(req,res);
});

module.exports = router;
