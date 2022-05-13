const express = require('express');
const bodyParser = require('body-parser');
var FormData = require('form-data');
const multer = require("multer");
const axios = require('axios');
const crypto = require('crypto');
const util = require('util');
const stream = require('stream');
const pipeline = util.promisify(stream.pipeline);

const fs = require("fs");
const app = express();
const router = express.Router();
const db = require('./db');
const cassandraDB = require('./cassandra-db');
const nodes = require('./routes/nodes');
const dashboard = require('./routes/dashboard');
const nodeHelper = require('./helpers/nodes');
const userHelper = require('./helpers/users');

const auth = require("./middleware/auth");
const user = require('./routes/user');

var cors = require('cors')

const port = 8082;
// const port = 8089;
app.use(express.static('uploads'));

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
     next();
});
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

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());


// Single file
app.post("/upload/single", uploadStorage.single("file"), async (req, res) => {
  console.log('publicKey: ',req.body.publicKey);
  let data = new FormData();
  data.append('file', fs.createReadStream('./' + req.file.path));
  console.log('FilePath: ','./' + req.file.path);

  // retrive user information from token
  let user = await userHelper.getUser('data.gov');
  console.log("Key: ", user.p_key);
  
  
  nodeHelper.list().then((list) => {
    list = list.rows;
    console.log('===== list =====');
    console.log(list);
    const max = list.reduce((prev, current) => ( (prev['freeMem'] > current['freeMem']) ? prev : current),0) //returns object
    console.log(max)
    console.log(`URL: to upload file: http://${max.name}:${max.port}/upload/single`);
    
    

    var config = {
      method: 'post',
      url: `http://${max.name}:${max.port}/upload/single`,
      headers: { 
        ...data.getHeaders()
      },
      data : data
    };
  
    axios(config)
    .then(function (response) {
      fs.rmSync('./' + req.file.path,{force:true}); //need to check
      
      let fileObj = {
        fileName: response.data.fileName,
        fileHex: response.data.hex,
        nodeName: max.name,
        nodePort: max.port,
        userPublicKey: req.body.publicKey
      };

      // store data in cassandra
      console.log('===============')
      console.log(''+response.data.fileName,''+response.data.hex,''+max.name,''+max.port,''+req.body.publicKey,''+new Date().getTime());
      let query = 'INSERT INTO files(fileName, fileHex, nodeName,nodePort,userPublicKey,uploadedAt) values(?,?,?,?,?,?)';
      let q1 = cassandraDB.execute(query, [''+response.data.fileName,''+response.data.hex,''+max.name,''+max.port,''+req.body.publicKey,''+new Date().getTime()],{ prepare: true }).then(result => {
        console.log('File Data Added: ' + result);
        axios.post('http://172.17.0.1:3000/add',{ //add to blockchain
          "name": response.data.fileName,
          "colour": response.data.hex,
          "make": "",
          "model": "",
          "owner": req.body.publicKey
        }).then((hype) => {
          console.log("======================");
          console.log(hype.data);
          return res.send({msg:'File is uploaded', data: hype['data'], fileHex:response.data.hex, path:`localhost:8082/download`,name:response.data.fileName});
        }).catch((err) => {
          console.log(" ======== err =======");
          console.log(err);
          return res.send({msg:'File is uploaded', err});
        });
      }).catch((err) => {
        console.log('ERROR :', err);
      });
      console.log('===============')

      // store file data here
      // nodeHelper.saveFileData(fileObj).then((data) => {
      //   console.log(fileObj);
      //   console.log('File is uploaded');

      //   // add this inside cassandra success callback
      //   // axios.post('http://test.com:3000/add',{
      //   // axios.post('http://172.17.0.1:3000/add',{ //add to blockchain
      //   //   "name": response.data.fileName,
      //   //   "colour": response.data.hex,
      //   //   "make": "",
      //   //   "model": "",
      //   //   "owner": req.body.publicKey
      //   // }).then((hype) => {
      //   //   console.log("======================");
      //   //   console.log(hype.data);
      //   //   return res.send({msg:'File is uploaded', data: hype['data'], fileHex:response.data.hex, path:`${max.name}:${max.port}/download`,name:response.data.fileName});
      //   // }).catch((err) => {
      //   //   console.log(" ======== err =======");
      //   //   console.log(err);
      //   //   return res.send({msg:'File is uploaded', err});
      //   // });

      // }).catch(err => {
      //   console.log(err);
      //   return res.send(err);
      // });

    })
    .catch(function (error) {
      console.log(error);
      return res.send(error);
    });
    
  }).catch((err => {
    console.log(err);
    return res.send(err);
  }));
});

app.post("/download", uploadStorage.single("file"), async (req, res, next) => {
  console.log('fileController.download: started Mater')
  try {

    let fileData = await nodeHelper.findFileByName(req.body.path);
    fileData = fileData.rows[0];
    console.log(`http://${fileData.nodeName}:${fileData.nodeport}/download`);
    const request = await axios.post(`http://${fileData.nodename}:${fileData.nodeport}/download`,{'path':req.body.path},{responseType: 'stream'});
    console.log('./uploads/'+req.body.path);
    await pipeline(request.data, fs.createWriteStream('./uploads/'+req.body.path));
    
    const file = fs.createReadStream('./uploads/'+req.body.path)
    const filename = (new Date()).toISOString()
    res.setHeader('Content-Disposition', 'attachment: filename="' + filename + '"')
    file.pipe(res);
    
  } catch(e){
    console.log(e);
    return res.send(e);
  }

});

app.post("/validate", uploadStorage.single("file"), (req, res) => {
  const fileBuffer = fs.readFileSync('./'+req.file.path);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const hex = hashSum.digest('hex');

  nodeHelper.findFileByName(req.file.originalname).then(file => {
    if(file.rows[0]) {
      if(file.rows[0].filehex == hex) {
        return res.send({msg:'File validate successfully.',data:file.rows[0]});
      } else {
        return res.send({msg:'File does not validate.'});
      }
    }
    else {
      return res.send({msg:'File not available on server'});
    }
  }).catch(err => {
    console.log(err);
    return res.send(err);
  });

});

app.get("/test",(req,res) => {
  nodeHelper.findFileByName('AEO CONTACT LIST.pdf').then(file => {
    console.log(file)
  }).catch(err => {
    console.log(err)
  });
});

app.post("/file-exists",(req,res) => {
  path = './' + filePath + req.body.name;
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



app.use('/nodes', nodes);
app.use('/user', user);
app.use('/dashboard', dashboard);

app.listen(port, function () {
  console.log('Example app listening on port ',port);
})
