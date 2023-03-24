import React, {useEffect} from 'react'
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

const Borrow = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)
    const user = useSelector((state)=>state.auth.user)
    const [isLoading, setIsLoading] = useState(false)
    const [loanLimit, setLoanLimit] = useState("")
    const [loanBalance, setLoanBalace] = useState("")

    //get the contract
    const accountsContract = getAccountsContract()

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

    async function getLoanLimit(){
        const userLimit = await loansContract.getLoanLimit(user.account_number)
        return userLimit.toNumber()/100
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

        getLoanLimit().then((response)=>{
            console.log(response)
            setLoanLimit(response)
        })

        getLoanBalance().then((response)=>{
            setLoanBalace(response)
        }).catch((error)=>{
            console.error(error)
        })
    }, [])

    async function borrow(){
        //borrow
        const borrowTxn = await loansContract.borrow(values.amount, user.account_number, values.password)
        await borrowTxn.wait(1)

        //update user local balance
        const hexBalance = await accountsContract.getBalance(user.account_number, values.password)
        const userNewBalance = hexBalance.toNumber()
        console.log(userNewBalance)
        dispatch(setUser({...user, balance: userNewBalance}))

        console.log(borrowTxn)

    }
    const onSubmit = () =>{
        if(loanBalance == 0 ){
            setIsLoading(true)
            borrow().then((response)=>{
                console.log(response)
                toast.success(`Success. Borrowed $${values.amount}`, {
                        position: 'bottom-left',
                        duration: 5000
                    })

                //update loan balance
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
        }else{
            toast.error(`Error. You have an outstanding loan balance`, {
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
                    <b style={{color: "white"}}>Borrow</b>
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
                                <h5 className="card-title">Your Loan limit:</h5>
                                <h5 className='display-5'>${loanLimit}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col d-flex justify-content-center">
                        <div className="card col-5 p-md-2 m-md-3 balance-section">
                            <div className="" style={{textAlign: 'left', color: 'white'}}>
                                <h5 className="card-title">Outstanding Loan:</h5>
                                <h5 className='display-5'>${loanBalance}</h5>
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
                                max={loanLimit}
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
                                {isLoading ? <ReactLoading type="spin" color="white" height={30} width={30} />: "Send"}
                            </button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Borrow;