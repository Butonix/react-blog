import React from 'react';
import { Link } from 'react-router';

const Navbar = (props) => {

    return (

        <nav className="navbar navbar-default navbar-custom navbar-fixed-top">
            <div className="container-fluid">

                <div className="navbar-header page-scroll">
                    <Link className="navbar-brand hidden-xs" to="/">React Blog</Link>

                    <div id="menuToggle" className="visible-xs">
                        <input type="checkbox" />
                        <span></span>
                        <span></span>
                        <span></span>

                        <ul id="menu">
                          
                          <Link to="/"><li>Home</li></Link>
                          <Link to="/posts/new"><li>Create Post</li></Link>
                          <Link to="/about"><li>About</li></Link>

                        </ul>
                    </div>
                </div>

                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-right">
                        
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/posts/new">
                                Create Post
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

            </div>
        </nav>
    );

};

export default Navbar;