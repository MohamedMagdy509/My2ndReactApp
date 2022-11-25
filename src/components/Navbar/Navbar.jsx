import React, { useContext } from 'react'
import styles from "./Navbar.module.scss"
import navLogo from "../../assets/images/logo.png"
import { Link } from 'react-router-dom'
import { AuthContext } from '../../AuthContext';



export default function Navbar({logOutUser}) {
    let { userData} = useContext(AuthContext);

    return (
        <>
            <nav className={`navbar navbar-dark navbar-expand-lg shadow ${styles.bgNav} position-fixed w-100`}>
                <div className="container">
                    <Link className={`navbar-brand ${styles.logoFont}`}><img src={navLogo} alt="" className={styles.navLogoStyle} />Game Over</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {
                            userData ?
                                <ul className="navbar-nav ms-5 mb-2 mb-lg-0">
                                    <li className="nav-item">
                                        <Link className="nav-link active" aria-current="page" to="home">Home</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/games/all/all">All</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Platforms
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/platform/pc'>pc</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/platform/browser'>browser</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Sort-by
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/sort-by/release-date'>release-date</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/sort-by/popularity'>popularity</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/sort-by/alphabetical'>alphabetical</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/sort-by/relevance'>relevance</Link></li>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Categories
                                        </Link>
                                        <ul className="dropdown-menu">
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/racing'>racing</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/sports'>sports</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/social'>social</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/shooter'>shooter</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/open-world'>open-world</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/zombie'>zombie</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/fantasy'>fantasy</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/action-rpg'>action-rpg</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/action'>action</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/flight'>flight</Link></li>
                                            <li><Link className="dropdown-item text-muted fw-semibold" to='/games/category/battle-royale'>battle-royale</Link></li>
                                        </ul>
                                    </li>
                                </ul>
                                : ""
                        }

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {
                                userData ?
                                    <li className="nav-item">
                                        <Link className={`nav-link btn btn-outline-primary text-primary ${styles.loginFree}`} onClick={logOutUser} to="login">Log Out</Link>
                                    </li>
                                    :
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link btn mx-4" to="/login">Login</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className={`nav-link btn btn-outline-primary text-primary ${styles.loginFree}`} to="register">Join Free</Link>
                                        </li>
                                    </>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
