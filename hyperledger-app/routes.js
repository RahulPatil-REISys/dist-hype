'use strict';

const controller = require('./controller');

module.exports = function(app) {
   app.route('/about')
       .get(controller.about);
   app.route('/add')
       .post(controller.add);
   app.route('/modify')
       .post(controller.modify);
   app.route('/get/:key')
       .get(controller.get);
   app.route('/getAll')
       .get(controller.getAll);
   app.route('/createKey')
       .get(controller.createKey);
};