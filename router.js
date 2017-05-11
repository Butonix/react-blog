const path = require('path');
const Post = require('./controllers/post');

module.exports = function(app){

    // GET all posts
    app.get('/api/posts', Post.index);

    //GET post by SLUG
    app.get('/api/posts/:slug', Post.findBySlug);

    //Save the post at the database
    app.post('/api/posts', Post.save);

    //DELETE a post by SLUG
    app.delete('/api/posts/:slug', Post.removeBySlug);

    //UPDATE a post by ID
    app.put('/api/posts/:id', Post.update);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });

}