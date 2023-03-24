import React from 'react'
import HomeBar from './HomeBar';
import {Link} from 'react-router-dom'
import { CiMoneyCheck1 } from "react-icons/ci";
import {FcMoneyTransfer} from 'react-icons/fc';
import {BiMoneyWithdraw} from 'react-icons/bi';
import {GiPayMoney, GiReceiveMoney} from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import AuthenticatedBar from './AuthenticatedBar';
import Login from './Login';

const AccountHome = () =>{
    const navigate = useNavigate()
    const user = useSelector((state)=>state.auth.user)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    if(!isAuthenticated){
        return(
            <Navigate to='/login' />
        )
    }
    return(
        <div style={{textAlign: 'center',  backgroundImage: 'linear-gradient(#091d3e, #114c6c)'}}>
            <AuthenticatedBar/>
            <br/>
            <br/>
            <br/>
            <h5 className="display-5" style={{marginLeft: "10px"}}>
                <b style={{color: "white"}}>Home</b>
            </h5>

            <div class="col d-flex justify-content-center">
                <div className="card w-75 homeBox p-1 p-md-2 m-md-3 mx-auto">
                    <div className="card-body" style={{textAlign: 'left', color: 'white'}}>
                        <h5 className="card-title">Account Number</h5>
                        <br/>
                        <h5 className='display-5'>{user.account_number}</h5>
                        <br/>
                        <br/>
                        <p>Welcome {user.first_name}</p>
                        <p>#simple and transparent</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto d-flex row justify-content-around align-items-center p-3 pageContentSection">
                <div className='col-sm-12'>
                    <h2 className='account-headers' style={{textAlign: 'center', color: 'white'}}>Menu</h2>

                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <div class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><CiMoneyCheck1/></h2>
                            <p className="card-text">My Account</p>
                        </div>
                    </div>
                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <Link to='/transfer' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><FcMoneyTransfer/></h2>
                            <p className="card-text">Transfer</p>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <Link to='/withdraw' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><BiMoneyWithdraw/></h2>
                            <p className="card-text">Withdraw</p>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <Link to='/deposit' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><GiPayMoney/></h2>
                            <p className="card-text">Deposit</p>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <Link to='/loans-home' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><GiReceiveMoney/></h2>
                            <p className="card-text">Loans</p>
                        </div>
                    </Link>
                </div>
                <div className='col-sm-12'>
                    <br/>
                </div>

                <div className='col-sm-12'>
                    <h2  className='account-headers'>Recent Txs</h2>
                </div>

                <div className='col-sm-10 txBox p-3'>
                    <i className='txs'>oxjhuehvfb89389423hbu98bhsbd23489f</i>
                </div>
                <div className='col-sm-10 txBox p-3'>
                    <i className='txs'>oxjhuehvfb89389423hbu98bhsbd23489f</i>
                </div>

            </div>
        </div>
    )
}

export default AccountHome;