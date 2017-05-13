import React from 'react';

const About = (props) => {

    return (
        <div>
        
            <header className="intro-header" style={{backgroundImage: "url('../public/imgs/about-bg.jpg')"}}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                            <div className="page-heading">
                                <h1>About</h1>
                                <hr className="small" />
                                <span className="subheading">The Stack</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1 text-align-center">
                        <p>This CMS Blog was made with ReactJS + Redux.</p>
                        <p>For the backend Node.js + express was used.</p>
                        <p>MongoDB was used as database to store the posts and the users.<br />Hosted at <a target="_blank" href="https://mlab.com">mlab</a>.</p>
                        <p><a href="http://mongoosejs.com/" target="_blank">Mongoose</a> was used for MongoDB ORM.</p>
                        <p>By far the most complicated part was the authentication. For this I used <a href="https://en.wikipedia.org/wiki/JSON_Web_Token" target="_blank">JWT (JSON Web Token)</a> strategy, with the help of <a href="http://passportjs.org/" target="_blank">passport.js</a> package.</p>
                        <p>You can get the source code for this app here: <a target="_blank" href="https://github.com/mesqfel/react-blog">https://github.com/mesqfel/react-blog</a>.</p>
                        <p>Finally, check out my other projects at <a target="_blank" href="https://github.com/mesqfel">https://github.com/mesqfel</a>.</p>
                        <p>Hope you liked it <i className="fa fa-smile-o"></i></p>
                    </div>
                </div>
            </div>

            <hr />
        
        </div>
    );

};

export default About;