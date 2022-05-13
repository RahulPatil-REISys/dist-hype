const express = require('express');
const multer = require("multer");
const bodyParser = require('body-parser');
const crypto = require('crypto');
const data = require('./package.json');
const axios = require('axios');
const fs = require("fs");
const os = require("os");


const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

const port = 8083;
let filePath = 'uploads/';
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
});

const uploadStorage = multer({ storage: storage });



// Single file
app.post("/upload/single", uploadStorage.single("file"), (req, res) => {
  const fileBuffer = fs.readFileSync('./' + req.file.path);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const hex = hashSum.digest('hex');
  return res.send({hex:hex,fileName:req.file.originalname,filePath:req.file.path});
});

app.post("/download", uploadStorage.single("file"), (req, res, next) => {
  console.log('fileController.download: started')
  const path = './uploads/'+req.body.path;
  const file = fs.createReadStream(path)
  const filename = (new Date()).toISOString()
  res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
  file.pipe(res);
});

function addNodes() {
  var config = {
    method: 'post',
    url: 'http://master:8082/nodes/addnode',
    data : {
      name:data.name,
      // conf: {totalMem: os.totalmem(),freeMem:os.freemem()},
      freeMem:os.freemem(),
      totalMem: os.totalmem(),
      files: fs.readdirSync('./uploads').length,
      port:port
    }
  };

  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });

}

app.post("/file-exists",(req,res) => {
  path = filePath + req.body.name;
  const exists = async (path1) => {
    return await new Promise((resolve) => {
      resolve(fs.existsSync(path1));
    });
  };
  console.log(path);
  exists(path).then(res1 => {
    console.log(res1);
    if(res1){
      return res.send({msg:'File Exists'});
    } else {
      return res.send({msg:'File Not Exists'});
    }
  });
});

app.listen(port, function () {
    console.log('Node1 app listening on port ',port);
    addNodes();
});
