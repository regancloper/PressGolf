import React from 'react';
import '../scss/app';
import { Link } from 'react-router-dom';

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <footer className="border-top border-light raleway py-4 bg-primary">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-4">
                        <h6 className="text-white text-center">
                            Press Golf App, 2020.
                        </h6>
                    </div>
                </div>




            </div>
        </footer>
    );
}

export default Footer;