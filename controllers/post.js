const Post = require('../models/post');

//Return all posts
exports.index = function(req, res, next){

    Post.find().sort({_id: -1}).exec(function(err, posts){
        if(err) { return next(err); }
        return res.json(posts);
    });

}

//Find post by SLUG
exports.findBySlug = function(req, res, next){

    Post.find({slug: req.params.slug}, function(err, post){
        if(err) { return next(err); }
        return res.json(post[0]);
    });

}

exports.save = function(req, res, next){

    if(
       !req.body.title || 
       !req.body.categories || 
       !req.body.content ||
       !req.body.summary ||
       !req.body.author
    ){
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