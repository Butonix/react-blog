import React from 'react';
import { Link } from 'react-router';

const Footer = (props) => {

    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                        <ul className="list-inline text-center">
                            <li>
                                <a href="https://github.com/mesqfel/react-blog" target="_blank">
                                    <span className="fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x"></i>
                                        <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <p className="copyright text-muted">Made with <i className="fa fa-heart fa-fw"></i> by Felipe Mesquita</p>
                    </div>
                </div>
            </div>
        </footer>
    );

};

export default Footer;