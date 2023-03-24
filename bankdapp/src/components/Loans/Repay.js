import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import HomeBar from '../HomeBar'
import {ethers, BigNumber, utils} from 'ethers'
import { useNavigate, Navigate } from 'react-router-dom'
import { AccountsABI } from '../ContractsServices/resources'
import {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../../Slices/auth'
import ReactLoading from 'react-loading'
import Toast from '../Toaster'
import toast, { Toaster } from 'react-hot-toast';
import { getAccountsContract } from '../ContractsServices/services'
import { getLoansContract } from '../ContractsServices/services'
import AuthenticatedBar from '../AuthenticatedBar';
import Login from '../Login'

const Repay = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    const user = useSelector((state)=>state.auth.user)
    const [isLoading, setIsLoading] = useState(false)
    const [loanBalance, setLoanBalace] = useState("")

    //get the accounts contract
    const accountsContract = getAccountsContract()
    console.log(accountsContract)

    //get the loans contract
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

    async function getLoanBalance(){
        const userLoanBalance = await loansContract.getLoanBalance(user.account_number)
        return userLoanBalance.toNumber()
    }

    useEffect(()=>{
        checkLoansAccount().then((response)=>{
            console.log(response)
        }).catch((error)=>{
            console.error(error)
        })

        getLoanBalance().then((response)=>{
            setLoanBalace(response)
        }).catch((error)=>{
            console.error(error)
        })
    }, [])

    async function repay(){
        //repay
        const repayTxn = await loansContract.repay(values.amount, user.account_number, values.password)
        await repayTxn.wait(1)

        //update user local balance
        const hexBalance = await accountsContract.getBalance(user.account_number, values.password)
        const userNewBalance = hexBalance.toNumber()
        console.log(userNewBalance)
        dispatch(setUser({...user, balance: userNewBalance}))

        console.log(repayTxn)

    }
    const onSubmit = () =>{
        if(user.balance >= values.amount){
            if(values.amount > loanBalance){
                toast.error(`Overpayment rejected`, {
                    position: 'bottom-left',
                    duration: 5500
                })
            }else{
                setIsLoading(true)
                repay().then((response)=>{
                    console.log(response)
                    toast.success(`$${values.amount} successfully repaid`, {
                        position: 'bottom-left',
                        duration: 5000
                    })

                    getLoanBalance().then((response)=>{
                        setLoanBalace(response)
                    }).catch((error)=>{
                        console.error(error)
                    })

                    setIsLoading(false)
                }).catch((error)=>{
                    console.error(error)
                    toast.error("Error occurred")
                    setIsLoading(false)
                })
            }
        }else{
            toast.error(`Insufficient balance in your account to repay loan`, {
                position: 'bottom-left',
                duration: 5500
            })
        }
    }
    const {values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit} = useFormik({
        initialValues: {
            amount: '',
            password: ''
        },
        onSubmit
    })
    if(!isAuthenticated){
        return(
            <Navigate to='/login' />
        )
    }

    return(
        <>
            <div style={{textAlign: 'center',  backgroundImage: 'linear-gradient(#091d3e, #114c6c)'}}>
                <AuthenticatedBar/>
                <Toast/>
                <br/>
                <br/>
                <br/>
                <h6 className="display-6" style={{marginLeft: "10px"}}>
                    <b style={{color: "white"}}>Repay Loan</b>
                </h6>

                <div className="col d-flex justify-content-center">
                    <div className="card col-11 homeBox p-1 p-md-2 m-md-3 mx-auto">
                        <div className="card-body" style={{textAlign: 'left', color: 'white'}}>
                            <h5 className="card-title">Account Number</h5>
                            <br/>
                            <h5 className='display-5'>{user.account_number}</h5>
                            <br/>
                            <br/>
                            <p>Welcome {user.first_name}</p>
                            <i>#simple and Transparent</i>
                            
                        </div>
                    </div>
                </div>
                <div className='col container mx-auto row '>
                    <div className="col d-flex justify-content-center">
                        <div className="card col-5 p-md-2 m-md-3 balance-section">
                            <div className="" style={{textAlign: 'left', color: 'white'}}>
                                <h5 className="card-title">Loan balance:</h5>
                                <h6 className='display-6'>${loanBalance}</h6>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="card col-5 p-md-2 m-md-3 balance-section">
                            <div className="" style={{textAlign: 'left', color: 'white'}}>
                                <h5 className="card-title">Interest Rate:</h5>
                                <h6 className='display-6'>2.4% p.a</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto d-flex row justify-content-around align-items-center p-3 pageContentSection">
                <div className="content-section content col-md-7">
                        <br/>
                    <form method="POST" className='row g-3 d-flex align-items-center justify-content-center' style={{textAlign: 'center'}}>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Amount</label>
                            <input
                                type='number'
                                max={loanBalance}
                                min="1"
                                className='form-control custom-inputs'
                                name='amount'
                                value={values.amount}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                            />
                            <br/>
                        </div>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Password</label>
                            <input
                                type='password'
                                className='form-control custom-inputs'
                                name='password'
                                value={values.password}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                            />
                            <br/>
                        </div>
                            <div className="form-group">
                            <button className="btn btn-outline-info" type="submit" disabled={isLoading} onClick={handleSubmit}>
                                {isLoading ? <ReactLoading type="spin" color="white" height={25} width={25} />: "Send"}
                            </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Repay;