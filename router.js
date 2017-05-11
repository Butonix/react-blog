const _ = require('lodash');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;
const path = require('path');
const Post = require('./controllers/post');

module.exports = function(app){

mongodb.MongoClient.connect('mongodb://localhost:27017/react_blog', function(err, db){

    var posts = db.collection('posts');

    // GET all posts
    app.get('/api/posts', Post.index);

    //GET post by SLUG
    app.get('/api/posts/:slug', Post.findBySlug);

    //Save the post at the database
    app.post('/api/posts', function(req, res){
        
        if(!isInputValid(req)){
            return res.status(500).json({msg: 'Error! Provide all required inputs: title, categories, content, summary, author'});
        }

        //Give a default img for the post based on its category
        //To-do: implement img upload for a post, meanwhile, lets give some random imgs
        var img = getImage(req.body.categories);

        var data = {
            title: req.body.title,
            categories: req.body.categories,
            content: req.body.content,
            summary: req.body.summary,
            author: req.body.author,
            img: img,
            slug: _.kebabCase(req.body.title)
        };

        posts.insert(data, function(err, results){

            if(err){
                res.status(500).json(err);
            }
            else{
                res.status(200).json(results);
            }

        });

    });

    //DELETE a post by SLUG
    app.delete('/api/posts/:slug', function(req, res){

        posts.remove({slug: req.params.slug},

            function(err, results){

                if(err){
                    res.json(err);
                }
                else{
                    res.json(results);
                }

            }
        );
    });

    //UPDATE a post by ID
    app.put('/api/posts/:id', function(req, res){

        if(!req.params.id){
            return res.status(500).json({msg: 'Error! Provide the ID of the post to be updated'});
        }

        //Give a default img for the post based on its category
        //To-do: implement img upload for a post, meanwhile, lets give some random imgs
        var img = getImage(req.body.categories);

        var data = {
            title: req.body.title,
            categories: req.body.categories,
            content: req.body.content,
            summary: req.body.summary,
            author: req.body.author,
            img: img,
            slug: _.kebabCase(req.body.title)
        };

		posts.update(
			{ _id : objectId(req.params.id)},
			{$set : data},
			{},

			function(err, results){
				if(err){
					res.status(500).json(err);
				}
				else{
					res.status(200).json(results);
				}
		});
    });

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });

});

function getImage(category){

    var img = 'home-bg.jpg';
    switch(category){
        case "Programming":
            img = 'programming.jpg';
            break;
        case "Science":
            img = 'science.jpg';
            break;
        case "Music":
            img = 'music.jpg';
            break;
        case "Sports":
            img = 'sports.jpg';
            break;
    }
    return img;
}

function isInputValid(req){

    if(
       !req.body.title || 
       !req.body.categories || 
       !req.body.content ||
       !req.body.summary ||
       !req.body.author
    ){
        return false;
    }
    
    return true;
}

}