'use strict';

var properties = require('./package.json');
const Hype = require('./db-schema');




const { FileSystemWallet, Gateway } = require('fabric-network');
const path = require('path');

const ccpPath = path.resolve(__dirname, 'first-network', 'connection-org1.json');

var controllers = {
    about: function(req, res) {
        var aboutInfo = {
            name: properties.name,
            version: properties.version
        }
        res.json(aboutInfo);
    },
    add: async function(req, res) {
        console.log(req.body);
        try {

            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
    
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
    
            // Submit the specified transaction.
            // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
            // await contract.submitTransaction('createCar', req.body.name, req.body.make, req.body.model, req.body.colour, req.body.owner);
            const transaction = contract.createTransaction('createCar');
            const result = await transaction.submit(req.body.name, req.body.make, req.body.model, req.body.colour, req.body.owner);
            console.log("TxID:", transaction.getTransactionID()._transaction_id);
            
            console.log('Transaction has been submitted');
    
            // Disconnect from the gateway.
            await gateway.disconnect();
            res.json({message:"Transaction has been submitted",TXId:transaction.getTransactionID()._transaction_id});
    
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            res.json(error);
        }
        
    },
    modify: async function(req, res) {
        try {

            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
            
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user1');
            console.log(`userExists: ${userExists}`);
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
    
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
    
            // Submit the specified transaction.
            // await contract.submitTransaction('changeCarOwner', req.body.name, req.body.owner);
            
            const transaction = contract.createTransaction('changeCarOwner');
            const result = await transaction.submit(req.body.name,req.body.owner);
            console.log("TxID:", transaction.getTransactionID()._transaction_id);

            console.log('Transaction has been submitted');
    
            // Disconnect from the gateway.
            await gateway.disconnect();
            res.json({"message":"Transaction has been submitted","TxId":transaction.getTransactionID()._transaction_id});
    
        } catch (error) {
            console.error(`Failed to submit transaction: ${error}`);
            res.json(error);
        }
    },
    get: async function(req, res) {
        console.log(req.params.key);
        try {

            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user1');
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
    
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
    
            // Evaluate the specified transaction.
            const result = await contract.evaluateTransaction('queryCar', ''+req.params.key);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            const decodedJsonObject = Buffer.from(result, 'base64').toString('ascii'); 
            res.json(JSON.parse(decodedJsonObject));

        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.json(error);
        }
    },
    getAll: async function(req, res) {
        console.log('getAll getAllgetAllgetAllgetAll')
        try {

            // Create a new file system based wallet for managing identities.
            const walletPath = path.join(process.cwd(), 'wallet');
            const wallet = new FileSystemWallet(walletPath);
            console.log(`Wallet path: ${walletPath}`);
    
            // Check to see if we've already enrolled the user.
            const userExists = await wallet.exists('user1');
            console.log(`userExists: ${userExists}`);
            if (!userExists) {
                console.log('An identity for the user "user1" does not exist in the wallet');
                console.log('Run the registerUser.js application before retrying');
                return;
            }
    
            // Create a new gateway for connecting to our peer node.
            const gateway = new Gateway();
            await gateway.connect(ccpPath, { wallet, identity: 'user1', discovery: { enabled: true, asLocalhost: true } });
    
            // Get the network (channel) our contract is deployed to.
            const network = await gateway.getNetwork('mychannel');
    
            // Get the contract from the network.
            const contract = network.getContract('fabcar');
    
            const result = await contract.evaluateTransaction('queryAllCars');
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);
            const decodedJsonObject = Buffer.from(result, 'base64').toString('ascii'); 
            res.json(JSON.parse(decodedJsonObject));
    
        } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            res.json(error);
        }
        
    },
    createKey: async function(req,res){
        Hype.find
    }
};

module.exports = controllers;