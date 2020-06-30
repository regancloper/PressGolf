import React, { useContext } from 'react';
import '../scss/app';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';

interface NavbarProps {
    color: string;
    loggedIn: boolean;
}

const Header: React.FC<NavbarProps> = ({ color, loggedIn }) => {
    const { logout } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = () => {
        logout();
        history.push('/');
    }

    return (
        <div className="header fixed-top" id={color}>
            <div className="container-lg">
                <Navbar expand="lg" className="pr-1">
                    <Navbar.Brand style={{ fontSize: '1.8rem' }}>
                        <Link to="/" className="text-white" style={{textDecoration: 'none'}}>Press.</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
                        <span className="icon-bar mt-0"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            {/* <Nav.Link className="text-white" href="#home">Donate</Nav.Link> */}
                            {loggedIn ? (
                                <button className="btn btn-danger rounded-0 h-25 text-white" onClick={handleLogout}>Sign Out</button>
                            ) : (
                                    <>
                                        <Link className="text-white nav-link" to="/login">Login</Link>
                                        <Link to="/register" className="btn btn-primary rounded-0 h-25 text-white">Sign Up</Link>
                                    </>
                                )}

                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
}

export default Header;