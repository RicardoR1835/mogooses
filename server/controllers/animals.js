require('../models/animal.js');
const mongoose = require('mongoose');
require('../config/mongoose.js')

var Animal = mongoose.model('Animal');

module.exports = {
    index: function(req, res) {
        Animal.find({}, function(err, animals){
            console.log(animals);
            res.render('index', {data: animals});
        })
    },
    create: function(req, res) {
        console.log("POST DATA", req.body);
        var animal = new Animal();
        animal.name = req.body.name;
        animal.type = req.body.type;
        animal.age = req.body.age;
        animal.hobby = req.body.hobby;
        animal.power = req.body.power;
        animal.save(function(err){
            if(err){
                console.log("something went wrong", err);
            } else {
                console.log("successfully added")
            }
            res.redirect('/')
        })
    },
    showall: function(req, res) {
    	res.render('new');
    },
    showone: function(req,res) {
        Animal.findOne({_id: req.params.id}, function(err, animals){
            console.log("***************************");
            console.log(animals);
            res.render("show", {animal: animals})
        })
    },
    editpage: function(req,res) {
        Animal.findOne({_id: req.params.id}, function(err, animals){
            console.log("***************************");
            console.log(animals);
            res.render("edit", {data: animals})
        })
    },
    edit: function(req,res){
        Animal.findOne({_id: req.params.id}, function(err,animals){
            animals.name = req.body.name;
            animals.type = req.body.type;
            animals.age = req.body.age;
            animals.hobby = req.body.hobby;
            animals.power = req.body.power;
            animals.save(function(err){
                if(err){
                    console.log("something went wrong", err);
                } else {
                    console.log("successfully updated")
                }
                res.redirect('/')
        })
        })
    },
    destroy: function(req,res){
        console.log("in delete")
        Animal.findOne({_id: req.params.id}, function(err,animals){
            animals.remove(function(err){
                if(err){
                    console.log("something went wrong", err);
                } else {
                    console.log("successfully deleted")
                }
                res.redirect('/')
            })
        })
    }
}
