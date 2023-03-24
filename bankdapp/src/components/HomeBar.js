import React from 'react'
import {Link} from 'react-router-dom'

const HomeBar = () =>{
    return(
    <header className="site-header">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top" style={{backgroundColor: '#ffffff0a'}}>
        <div className="container">
            <div className="navbar-nav mr-auto">
                    <Link to='/account-home' className="nav-item nav-link" href="#" style={{color: 'white', fontSize: '1.3em'}}>Home</Link>
            </div>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{textAlign: 'right'}}>
                <div className='navbar-nav ms-auto'>
                    <span className="nav-item">
                        <Link className="nav-link" to="/register" role="button" style={{color: "white"}}>Register</Link>
                    </span>
                    <span className="nav-item">
                        <Link className="nav-link" to="/login" role="button" style={{color: "white"}}>Login</Link>
                    </span>
                </div>
                
            </div>
        </div>
        </nav>
    </header>
    )
}

export default HomeBar;