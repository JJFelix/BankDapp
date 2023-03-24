import React from 'react'
import HomeBar from './HomeBar';
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
    const user = useSelector((state)=>state.auth.user)
    return(
        <div style={{textAlign: 'center'}}>
            <HomeBar/>
            <br/>
            <br/>
            <br/>
            <h2 className="display-3" style={{marginLeft: "10px"}}>
                <b style={{color: "white"}}>Dc</b><b style={{color: "#c4c2c2"}}>Bank</b>
            </h2>

            <div class="col d-flex justify-content-center">
                <div className="card w-95 homeBox p-1 p-md-2 m-md-3 mx-auto" style={{width: "100%"}}>
                    <div className="card-body" style={{textAlign: 'left'}}>
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Button</a>
                    </div>
                </div>
            </div>

            
            <div className="container mx-auto d-flex row justify-content-center align-items-center">
                <div className="col-sm-4" style={{marginTop: "5px"}}>
                    <div class="card homeBox">
                    <div className="card-body">
                        <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                        <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                    </div>
                </div>
                <div className="col-sm-4" style={{marginTop: "5px"}}>
                    <div className="card homeBox">
                        <div className="card-body">
                            <h5 className="card-title">Special title treatment</h5>
                            <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;