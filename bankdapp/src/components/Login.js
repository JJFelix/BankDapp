import React, {useState} from 'react'
import HomeBar from './HomeBar'
import { useFormik } from 'formik'
import ReactLoading from 'react-loading'
import {ethers, BigNumber, utils} from "ethers"
import { AccountsABI } from './ContractsServices/resources'
import { useSelector, useDispatch } from 'react-redux'
import { setUser } from '../Slices/auth'
import { getAccountsContract } from './ContractsServices/services'
import { useNavigate } from 'react-router-dom'
import Toast from './Toaster'
import toast, { Toaster } from 'react-hot-toast';

const Login = () =>{
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const accountsContract = getAccountsContract()

    async function login(){

        //login
        const isLoggedIn = await accountsContract.login(values.IDNumber, values.password)
        console.log(isLoggedIn)
        if(isLoggedIn){
            const userDetails = await accountsContract.getAccountDetails(values.IDNumber, values.password)
            console.log(userDetails)
            const user = {
                account_number: userDetails[0].toNumber(),
                first_name: userDetails[1],
                middle_name: userDetails[2],
                last_name: userDetails[3],
                phoneNumber: userDetails[4],
                email: userDetails[5],
                id_number: userDetails[6],
                balance: userDetails[7].toNumber()
            }
           console.log(user)
           dispatch(setUser(user))
        }
    }
    const onSubmit = () => {
        setIsLoading(true)
        login().then((response)=>{
            console.log(response)
            toast.success("Successful login")
            //setIsLoading(false)
            setTimeout(()=> {navigate("/account-home")}, 3000)
            
        }).catch((error)=>{
            console.error(error)
            toast.error("Invalid Details")
            setIsLoading(false)
        })

    }
    const {values, errors,  handleBlur, touched, isSubmitting, handleChange, handleSubmit} = useFormik({
        initialValues: {
            IDNumber: '',
            password:'',
        },
        onSubmit
    })
    return (
        <>
            <HomeBar/>
            <Toast/>
            <div className='container' style={{texAlign: 'center'}}>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h3 style={{color: 'white', textAlign: 'center'}}>Login</h3>
            <div className="content-section row d-flex flex-column align-items-center justify-content-center" style={{border: 'none'}}>
                <div className="content-section content col-md-6">
                    <br/>
                    <form method="POST" style={{textAlign: 'center'}}>
                                <label className='form-control-md' style={{color:'#e9e7e7', textAlign:'left'}}>Account Number</label>
                                <input
                                    type='text'
                                    className='form-control custom-inputs'
                                    name = 'IDNumber'
                                    value={values.IDNumber}
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                />
                                <br/>
                                <label className='form-control-md' style={{color:'#e9e7e7'}}>Password</label>
                                <input
                                    type='password'
                                    className='form-control custom-inputs'
                                    name = 'password'
                                    value={values.password}
                                    onChange = {handleChange}
                                    onBlur = {handleBlur}
                                />
                        <br/>
                        <div className="form-group">
                        <button className="btn btn-outline-info" type="submit" disabled={isLoading} onClick={handleSubmit}>
                            {isLoading ? <ReactLoading type="spin" color="white" height={20} width={20} />: "Login"}
                        </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        
        </>
        
    )
}

export default Login