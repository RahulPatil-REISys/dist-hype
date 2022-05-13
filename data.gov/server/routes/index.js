var express = require('express');
var router = express.Router();
const Doc = require('../db-schema');


/* GET home page. */
router.get('/docs', async function(req, res, next) {
  const documents = await Doc.find({});
  res.status(200).send({documents:documents});
});

router.post('/doc', async function(req, res, next) {
  const document = new Doc({
    title: req.body.title,
    description: req.body.description,
    organizationType: req.body.organizationType,
    files: req.body.files
  });
  document.save()
  .then((data) =>{ 
    console.log(data);
    res.status(200).send({msg:'Document saved!'});
  })
  .catch((err) => {
    console.log(err);
    res.status(200).send({msg:'Document Not Save!',err:err});
  });
});

module.exports = router;
