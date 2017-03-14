var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var Blog = require('./blog.js');
mongoose.connect('mongodb://localhost/blog');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));



app.get('/', function(req, res) {
    res.send('Hello World!')
});

app.get('/blog', function(req, res) {
    Blog.find().exec(function(err, blog) {
        if (err) {
            res.send('err')
        } else {
            console.log(blog);
            res.json(blog);
        }
    });
});

app.post('/blog', function(req, res) {
    var blog = new Blog(req.body);
    blog.save()
        .then(function(saveResults) {
            res.json(saveResults);
        })
        .catch(function(err) {
            res.sendStatus(500);
        });

});


app.put('/blog/:id', function(req, res) {
    Blog.findOneAndUpdate({
        _id: req.params.id
    }, {
        $set: req.body
    }, function(err, result) {
        if (err) {
            console.log("Something wrong !");
            res.status(500).json(err);
            return;
        }
        res.json(result);

    });
});







app.listen(9090, function() {
    console.log(' listening on port 9090!')
});
