var express = require("express");
var session = require('express-session');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'get it right get it tight',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    }
}))
const flash = require('express-flash');
app.use(flash());
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/animal');
var AnimalSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 3},
    type: {type: String, required: true, minlength: 3},
    age: {type: Number, required: true},
    hobby: {type: String, required: true, minlength: 4},
    power: {type: String, required: true, minlength: 4},
}, {timestamps: true });
mongoose.model('Animal', AnimalSchema);
var Animal = mongoose.model('Animal');
mongoose.Promise = global.Promise;


app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    Animal.find({}, function(err, animals){
        console.log(animals);
        res.render('index', {data: animals});
    })
})

app.post('/mongooses', function(req, res){
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
})

app.get('/mongooses/new', function(req, res){
    res.render('new');
})

app.get('/mongooses/:id', function(req, res){
    Animal.findOne({_id: req.params.id}, function(err, animals){
        console.log("***************************");
        console.log(animals);
        res.render("show", {animal: animals})
    })
})
// app.get('/quotes', function(req, res){
//     Animal.find({}).sort({createdAt: -1}).exec(function(err, quotes){
//         console.log(quotes);
//         res.render('quotes', {data: quotes})
//     })
// })
app.get('/mongooses/edit/:id', function(req, res){
        Animal.findOne({_id: req.params.id}, function(err, animals){
        console.log("***************************");
        console.log(animals);
        res.render("edit", {data: animals})
    })
})

app.post('/mongooses/:id', function(req,res){
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
})

app.get('/mongooses/destroy/:id', function(req,res){
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
})




app.listen(8000, function() {
    console.log("listening on port 8000");
})




// app.post('/mongooses/:id', function(req,res){
//     Animal.update({_id: req.params.id}, 
//     {$set: {name: req.body.name}},
//     {$set : {type: req.body.type}},
//     {$set: {hobby: req.body.hobby}},
//     {$set: {power: req.body.power}},
//     function(err, res){
//         if(err){
//             console.log("something went wrong", err);
//         } else {
//             console.log("successfully updated")
//         }
//         res.redirect('/')
//     }) 
// })