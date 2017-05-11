const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postsSchema = new Schema({
    title: String,
    categories: String,
    content: String,
    summary: String,
    author: String,
    img: String,
    slug: String
});

//On Save Hook, encrypt password
postsSchema.pre('save', function(next){
    const post = this;

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

    post.img = img;
    post.slug = _.kebabCase(post.title);

    next();
});

const ModelClass = mongoose.model('posts', postsSchema);

module.exports = ModelClass;