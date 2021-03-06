const path = require('path');
const Post = require('./controllers/post');
const Auth = require('./controllers/auth');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app){

    // GET all posts
    app.get('/api/posts', Post.index);

    //GET post by SLUG
    app.get('/api/posts/:slug', Post.findBySlug);

    //Save the post at the database
    app.post('/api/posts', requireAuth, Post.save);

    //DELETE a post by SLUG
    app.delete('/api/posts/:slug', requireAuth, Post.removeBySlug);

    //UPDATE a post by ID
    app.put('/api/posts/:id', requireAuth, Post.update);

    //Signin an user
    app.post('/api/signin', requireSignin, Auth.signin);

    //Signup an user
    app.post('/api/signup', Auth.signup);

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'index.html'));
    });

}