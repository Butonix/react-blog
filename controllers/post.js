const _ = require('lodash');
const Post = require('../models/post');
const helpers = require('../helpers');

//Return all posts
exports.index = function(req, res, next){

    Post.find().sort({_id: -1}).exec(function(err, posts){
        if(err) { return next(err); }
        return res.json(posts);
    });

}

//Find post by SLUG
exports.findBySlug = function(req, res, next){

    Post.findOne({slug: req.params.slug}, function(err, post){
        if(err) { return next(err); }
        return res.json(post[0]);
    });

}

//Create a new post
exports.save = function(req, res, next){

    if(!helpers.isInputValid(req)){
        return res.status(500).json({msg: 'Error! Provide all required inputs: title, categories, content, summary, author'});
    }

    const post = new Post({
        title: req.body.title,
        categories: req.body.categories,
        content: req.body.content,
        summary: req.body.summary,
        author: req.body.author
    });

    post.save(function(err){
        if(err) { return next(err); }
        return res.json({ msg: 'success' });
    });

}

//Update a post
exports.update = function(req, res, next){

    if(!req.params.id){
        return res.status(500).json({msg: 'Error! Provide the ID of the post to be updated'});
    }

    const data = {
        title: req.body.title,
        categories: req.body.categories,
        content: req.body.content,
        summary: req.body.summary,
        author: req.body.author
    };

    data.img = helpers.getImage(req.body.categories);
    data.slug = _.kebabCase(req.body.title);

    Post.findOneAndUpdate({ _id : req.params.id}, {$set : data}, {}, function(err, results){
        if(err) { return next(err); }
        return res.json(results);
    })

}

//Remove a post by SLUG
exports.removeBySlug = function(req, res, next){

    Post.remove({slug: req.params.slug}, function(err, results){
        if(err) { return next(err); }
        return res.json(results);
    });

}