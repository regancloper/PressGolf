import React, { useState, useEffect } from 'react';
import '../scss/app';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface NavbarProps {
    color: string;
}

const Header: React.FC<NavbarProps> = ({ color }) => {

    return (
        <div className="header fixed-top" id={color}>
            <div className="container-lg">
                <Navbar expand="lg" className="pr-1">
                    <Navbar.Brand href="#home" className="text-white" style={{ fontSize: '1.8rem' }}>
                        Press.
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
                        <span className="icon-bar mt-0"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link className="text-white" href="#home">Donate</Nav.Link>
                            <Link className="text-white nav-link" to="/login">Login</Link>
                            <Link to="/register" className="btn btn-primary rounded-0 h-25 text-white">Sign Up</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
}

export default Header;