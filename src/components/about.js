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
                        <p>MongoDB was used as database to store the posts, hosted at <a target="_blank" href="https://mlab.com">https://mlab.com</a>.</p>
                        <p>Finally, I also implemented a simple API using Node.js to process the requests from the client side.</p>
                        <p>Hope you liked it <i className="fa fa-smile-o"></i>.</p>
                        <p>Check out my other projects at <a target="_blank" href="https://github.com/mesqfel"><i className="fa fa-github"></i> https://github.com/mesqfel</a>.</p>
                    </div>
                </div>
            </div>

            <hr />
        
        </div>
    );

};

export default About;