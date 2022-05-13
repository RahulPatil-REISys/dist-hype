let cassandra = require('cassandra-driver');
let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
// let contactPoints = ['localhost'];
// let contactPoints = ['cassandra-db'];
let contactPoints = ['192.168.29.251'];
// let localDataCenter = 'DataCenter1';
let localDataCenter = 'datacenter1';
console.log(contactPoints,authProvider,localDataCenter)
let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'distributedfile'});


client.connect(function(e) {
    // console.log(e)
    var query;
    query = "CREATE KEYSPACE IF NOT EXISTS distributedfile WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3' }";
    return client.execute(query, function(e, res) {
      return console.log(e, res);
    });
});
// let qu0 = 'DROP TABLE files';
// let qu1 = 'DROP TABLE nodes';
// let qu2 = 'DROP TABLE user';
// let q10 = client.execute(qu0).then(result => {console.log('Droped');}).catch((err) => {console.log('ERROR :', err);});
// let q11 = client.execute(qu1).then(result => {console.log('Nodes Droped');}).catch((err) => {console.log('ERROR :', err);});
// let q12 = client.execute(qu2).then(result => {console.log('Droped');}).catch((err) => {console.log('ERROR :', err);});
// Promise.allSettled([q10,q11,q12]).
// catch(err => {
//     console.log(" =================== err");
//     console.log(err);
// })
// .finally((data) => {
//     // console.log("Finally: ");
//     // console.log(data);
//     client.shutdown();
// });

// Define and execute the queries
let query1 = 'CREATE TABLE IF NOT EXISTS files(filename text PRIMARY KEY, fileHex text, nodeName text, nodePort text, userPublicKey text, uploadedAt text )';
let q1 = client.execute(query1).then(result => {
    console.log('files Table Created ' );
}).catch((err) => {console.log('ERROR :', err);});
// Define and execute the queries
let query2 = 'CREATE TABLE IF NOT EXISTS user(username text PRIMARY KEY, email text, password text, p_key text)';
let q2= client.execute(query2).then(result => {
    console.log('User Table Created ' );
    client.execute('INSERT INTO user(username,email,password,p_key) VALUES("data.gov","data.gov","$2b$10$vRmCNQnthLC.mBQVh7YZSO3TorW/Sbdd4Uc4AZlnen0V37Tgb15fK","fce68fae-17b7-4f31-85b2-f6b768450a62")').then(result => {console.log('USER CREATED')}).catch((err) => {console.log('ERROR :', err);});

}).catch((err) => {console.log('ERROR :', err);});
// Define and execute the queries
let query3 = 'CREATE TABLE IF NOT EXISTS nodes(name text PRIMARY KEY, freeMem text, totalMem text, files text, port text)';
let q3 = client.execute(query3).then(result => {
    console.log('Nodes Table Created ' );
}).catch((err) => {console.log('ERROR :', err);});

// // Exit the program after all queries are complete
// Promise.allSettled([q1,q2,q3]).
// catch(err => {
//     console.log(" =================== err");
//     console.log(err);
// })
// .finally((data) => {
//     // console.log("Finally: ");
//     // console.log(data);
//     client.shutdown();
// });
module.exports = client;