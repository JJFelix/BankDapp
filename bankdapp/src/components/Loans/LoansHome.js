import React, {useEffect} from 'react'
import HomeBar from '../HomeBar';
import {Link} from 'react-router-dom'
import { CiMoneyCheck1 } from "react-icons/ci";
import {FcMoneyTransfer} from 'react-icons/fc';
import {BiMoneyWithdraw} from 'react-icons/bi';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { getLoansContract } from '../ContractsServices/services';
import AuthenticatedBar from '../AuthenticatedBar';
import Login from '../Login';
import {GiPayMoney, GiReceiveMoney} from 'react-icons/gi';

const LoansHome = () =>{
    const navigate = useNavigate()
    const user = useSelector((state)=>state.auth.user)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

    const loansContract = getLoansContract()

    async function checkLoansAccount(){
        const loanExists = await loansContract.checkIfLoanAccountExists(user.account_number)
        if(!loanExists){
            const loansCreationTxs = await loansContract.createLoanAccount(user.account_number)
            await loansCreationTxs.wait(1)
            console.log("Created a loan account")
        }else{
            console.log("Loan account exists")
        }
    }

    useEffect(()=>{
        checkLoansAccount().then((res)=>{
            console.log(res)
        }).catch((error)=>{
            console.error(error)
        })
    }, [])

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
                <b style={{color: "white"}}>Loans</b>
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
                    <Link to='/loans-repay' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><GiPayMoney/></h2>
                            <p className="card-text">Repay</p>
                        </div>
                    </Link>
                </div>
                <div className="col-sm-2" style={{marginTop: "5px"}}>
                    <Link to='/loans-borrow' class="card homeBox">
                        <div className="card-body">
                            <h2 className="card-title menu-icons"><GiReceiveMoney/></h2>
                            <p className="card-text">Borrow</p>
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

export default LoansHome;