import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, logoutUser } from '../Slices/auth'

const AuthenticatedBar = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () =>{
        dispatch(logoutUser())
        navigate("/")
    }
    return(
        <>
            <header className="site-header">
                <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{backgroundColor: '#ffffff0a'}}>
                <div className="container">
                    <div className="navbar-nav mr-auto">
                            <Link to='/account-home' className="nav-item nav-link" href="#" style={{color: 'white', fontSize: '1.3em'}}>Home</Link>
                    </div>
                    
                    <div className="nav-item dropdown custom-dropdown">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{color: 'white', fontSize: '1.3em'}}>
                            Actions
                        </a>
                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink" style={{right: '50%'}}>
                            
                            <Link to='/deposit' className="dropdown-item" href="#">Deposit</Link>
                            <Link to='/transfer' className="dropdown-item" href="#">Transfer</Link>
                            <Link to='/withdraw' className="dropdown-item" href="#">Withdraw</Link>
                            <Link to='/loans-home' className="dropdown-item" href="#">Loans</Link>
                            <a className="dropdown-item" href="#">My Account</a>
                            <a className="dropdown-item" role="button" onClick={logout}>Logout</a>
                        </div>
                    </div>
                </div>
                </nav>
            </header>
        </>
    )
}

export default AuthenticatedBar