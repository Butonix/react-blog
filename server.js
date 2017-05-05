require('dotenv').config();
const _ = require('lodash');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const objectId = require('mongodb').ObjectId;


const port = 8080;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.use(function(req, res, next){

	//Use '*' if you want to give access to any origin
	res.setHeader('Access-Control-Allow-Origin', '*'); //Enable cross domain requests
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); //set which methods are authorized for cross domain requests
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); //Enable source header rewrite 
	res.setHeader('Access-Control-Allow-Credentials', true);

	next();
});

// var fakePosts = [
//     {
//         _id: "59091b69b6620d14b6b550db",
//         title: "ReactJS App Example",
//         categories: "Programming",
//         summary: "Create your own To-Do app with ReactJS",
//         author: "Felipe Mesquita",
//         img: "react.jpg",
//         content: "my content"
//     },
//     {
//         _id: "69091b69b6620d14b6b550db",
//         title: "Second post",
//         categories: "Science",
//         summary: "summary 2",
//         author: "Joao Vitori",
//         img: "react.jpg",
//         content: "content2"
//     }
// ];


// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'index.html'));
// });

app.listen(port, function(){
	console.log('Server now listening on port '+port);
});

mongodb.MongoClient.connect(process.env.MONGO_URI, function(err, db){

    var posts = db.collection('posts');

    // GET all posts
    app.get('/api/posts', function(req, res){

        // const data = [{
        //     _id: "59091b69b6620d14b6b550db",
        //     title: "ReactJS App Example",
        //     categories: "Programming",
        //     summary: "Create your own To-Do app with ReactJS",
        //     author: "Felipe Mesquita",
        //     img: "react.jpg",
        //     content: "my content"
        // }];

        // res.json(fakePosts);

        posts.find().sort({_id: -1}).toArray(function(err, results){

            if(err){
                res.json(err);
            }
            else{
                res.json(results);
            }

        });

    });

    //GET post by SLUG
    app.get('/api/posts/:slug', function(req, res){

        // const data = {
        //     _id: "59091b69b6620d14b6b550db",
        //     title: "ReactJS App Example",
        //     categories: "Programming",
        //     summary: "Create your own To-Do app with ReactJS",
        //     author: "Felipe Mesquita",
        //     img: "react.jpg",
        //     content: "my content"
        // };

        // res.json(data);

        posts.find({slug: req.params.slug}).toArray(function(err, results){

            if(err){
                res.json(err);
            }
            else{
                res.json(results[0]);
            }

        });

    });

    //Save the post at the database
    app.post('/api/posts', function(req, res){
        
        if(!isInputValid(req)){
            return res.status(500).json({msg: 'Error! Provide all required inputs: title, categories, content, summary, author'});
        }

        //Give a default img for the post based on its category
        //To-do: implement img upload for a post, meanwhile, lets give some random imgs
        var img = getImage(req.body.categories);

        var data = {
            // _id: '77091b69b6620d14b6b550db',
            title: req.body.title,
            categories: req.body.categories,
            content: req.body.content,
            summary: req.body.summary,
            author: req.body.author,
            img: img,
            slug: _.kebabCase(req.body.title)
        };

        // fakePosts.push(data);
        // res.status(200).json(fakePosts);

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