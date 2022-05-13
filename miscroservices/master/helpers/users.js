const User = require("../models/users");

exports.getUser = async function (username) {
    return new Promise((resolve, reject) => {
        User.findOne({username:username}).exec(function (err, user) {
            if (err)
                reject(err);
            else
                resolve(user);
        });
    });
    
};