'use strict';

var path = require('path');
var Percolator = require('Percolator').Percolator;
var port = process.env.PORT || 5000;
var staticDir = path.join(__dirname, '../app');
var CRUDCollection = require('Percolator').CRUDCollection;
// var SomeDB = require('SomeDB');
// var db = new SomeDB();
var widgets = require('./models/widgets');

var schema = {
    description : 'A widget',
    type: 'object',
    properties: {
        name: {
            title: 'name',
            type: 'string',
            required: true,
        },
        type: {
            title: 'type',
            type: 'string',
            required: true
        }
    }
};

var widgetCollection = new CRUDCollection({
    schema: schema,
    
    list: function(req, res, cb){
        return cb(null, widgets.list());
    }
});

// var linkCollection = new CRUDCollection({
// 
//   schema : schema,
// 
//   create : function(req, res, obj, cb){
//     db.insert(obj, function(err, id){
//       if (err){
//         return res.status.internalServerError(err);
//       }
//       cb();
//     });
//   },
// 
//   update : function(req, res, id, obj, cb){
//     db.update(id, obj, function(err){
//       if (err){
//         return res.status.internalServerError(err);
//       }
//       cb();
//     });
//   },
// 
//   destroy : function(req, res, id, cb){
//     db.remove(id, function(err){
//       if (err){
//         return res.status.internalServerError(err);
//       }
//       cb();
//     });
//   },
// 
//   list : function(res, res, cb){
//     db.find(function(err, objects){
//       return cb(err, objects);
//     });
//   },
// 
//   fetch : function(req, res, cb){
//     db.findById(req.uri.child(), function(err, foundObject){
//       if (err){
//         if (err === 'Not Found'){
//           return cb(true);
//         }
//         return res.status.internalServerError(err);
//       }
//       cb(null, foundObject);
//     });
//   }
// 
// });

var server = new Percolator({
    'autolink': true,
    'parseBody': false,
    'port': port,
    'protocol': 'http',
    'resourcePath': '/api',
    'staticDir': staticDir
});

server.route('/api/widgets', widgetCollection.handler);
// server.route('/api/widgets/:key', widgetCollection.wildcard);

// server.route('/api', {
//     GET: function(req, res){
//         res.object({
//             message: 'Hello World!'
//         }).send();
//     }
// });

server.listen(function(err){
    if(err){throw err;}
    console.log('Percolator is listening on port ', server.port);
});