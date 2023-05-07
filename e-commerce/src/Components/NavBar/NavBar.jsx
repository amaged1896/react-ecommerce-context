import React, { useState } from 'react';
import styles from './NavBar.module.css';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './../../assets/images/freshcart-logo.svg';
export default function NavBar() {
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar className="navbar z-index navbar-expand-lg bg-main-light text-dark py-3" expanded={expanded} expand="lg">
            <div className="container">
                <Link className="navbar-brand" to="">
                    <img className='text-white' src={logo} alt="logo" />
                </Link>
                <Navbar.Toggle className='ml-auto' aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ms-auto text-center d-flex align-items-center justify-content-center" onClick={handleNavClick}>
                        {/* left ul */}
                        <ul className="navbar-nav mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="products">Products</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="cart">Cart</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                            </li>

                            <li className="nav-item cursor-pointer m-0 p-0">
                                <span className="nav-link logout active btn btn-xs rounded " aria-current="page" >Logout</span>
                            </li>
                        </ul>
                        {/* left ul */}

                        {/* <div className=''> */}

                        {/* right ul */}
                        {/* <ul className="navbar-nav mb-2 mb-lg-0">

                            </ul> */}
                        {/* right ul */}
                        {/* </div> */}

                    </Nav>


                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}










