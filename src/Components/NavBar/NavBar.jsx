import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import logo from './../../assets/images/freshcart-logo.svg';
import { CartContext } from '../../Context/CartContext';
export default function NavBar({ logout, userData }) {
    let { numOfCartItems } = useContext(CartContext);
    const [expanded, setExpanded] = useState(false);

    const handleNavClick = () => {
        setExpanded(false);
    };

    return (
        <Navbar className="navbar z-index navbar-expand-lg bg-main-light text-dark py-3 mb-5" expanded={expanded} expand="lg">
            <div className="container">
                <Link className="navbar-brand" to="">
                    <img className='text-white' src={logo} alt="logo" />
                </Link>
                <Navbar.Toggle className='ml-auto' aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="text-center d-flex align-items-center justify-content-center ms-auto" onClick={handleNavClick}>
                        {/* left ul */}
                        <ul className='navbar-nav ' >
                            {userData && <>

                                <li className="nav-item"  >
                                    <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                                </li>

                                <li className="nav-item"  >
                                    <Link className="nav-link active" aria-current="page" to="/">Categories</Link>
                                </li>

                                <li className="nav-item"  >
                                    <Link className="nav-link active" aria-current="page" to="/">Products</Link>
                                </li>

                            </>}
                        </ul>
                    </Nav>

                    <Nav className="text-center d-flex align-items-center justify-content-center  ms-auto" onClick={handleNavClick}>
                        {/* right ul  */}
                        <ul className="navbar-nav mb-2 mb-lg-0">

                            {userData ?
                                <>
                                    <li className="nav-item me-3 position-relative">
                                        <Link className="nav-link active" aria-current="page" to="cart">
                                            <i className='fa fa-shopping-cart fa-lg'></i>
                                            <div className="badge bg-main position-absolute top-0 end-0">{numOfCartItems}</div>
                                        </Link>
                                    </li>
                                    <li className="nav-item cursor-pointer m-0 p-0">
                                        <span className="nav-link cursor-pointer" onClick={logout} >Logout</span>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="register">Register</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="login">Login</Link>
                                    </li>
                                </>

                            }

                        </ul>
                    </Nav>


                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}










