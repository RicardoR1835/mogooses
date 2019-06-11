const animals = require('../controllers/animals');
const mongoose = require('mongoose');
const Animal = mongoose.model("Animal");

module.exports = function(app){
    app.get('/', function(req, res){
        animals.index(req,res) 
    })
    app.post('/mongooses', function(req, res){
        animals.create(req,res);
    })
    
    app.get('/mongooses/new', function(req, res){
        animals.showall(req,res);
    })
    
    app.get('/mongooses/:id', function(req, res){
        animals.showone(req,res);
    })
    app.get('/mongooses/edit/:id', function(req, res){
        animals.editpage(req,res);
    })
    
    app.post('/mongooses/:id', function(req,res){
        animals.edit(req,res);
    })
    
    app.get('/mongooses/destroy/:id', function(req,res){
        animals.destroy(req,res);
    })
}

