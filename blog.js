var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var blogSchema = mongoose.Schema({
title: String,
author: String,
text: String

});


var Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;
