import React from 'react'
import HomeBar from './HomeBar'
import { useFormik } from 'formik'
import ReactLoading from 'react-loading'
import { ethers, BigNumber, utils} from 'ethers'
import { useState, useEffect } from 'react'
import { RegisterSchema } from '../Schemas'
import { getAccountsContract } from './ContractsServices/services'
import { AccountsABI } from './ContractsServices/resources'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../Slices/auth'
import {useNavigate} from 'react-router-dom'
import Toast from './Toaster'
import toast, { Toaster } from 'react-hot-toast';


const Register = () =>{
    const dispatch = useDispatch()
    const[isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    //get the contract
    const accountsContract = getAccountsContract()

    async function createAccount(){
        //interact with the contract
        console.log("Creating account")
        const createAccountTxn = await accountsContract.createAccount(
            values.password,
            values.first_name,
            values.middle_name,
            values.last_name,
            values.phoneNumber,
            values.email,
            values.id_number
        )
        await createAccountTxn.wait(1)

        const userDetails = await accountsContract.getAccountDetails(values.id_number, values.password)
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
        console.log(user)
        
    }

    const onSubmit = (e) =>{
        setIsLoading(true)
        createAccount().then((response)=>{
            console.log(response)
            toast.success("Successfully registered")
            //setIsLoading(false)
            setTimeout(()=> {navigate("/account-home")}, 3000)
        }).catch((error)=>{
            console.error(error)
            setIsLoading(false)
        })
    }

    const {values, errors,  handleBlur, touched, isSubmitting, handleChange, handleSubmit} = useFormik({
        initialValues: {
            first_name: '',
            middle_name: '',
            last_name: '',
            id_number: '',
            phoneNumber: '',
            email: '',
            password:'',
            confirm_password: ''
        },
        validationSchema: RegisterSchema,
        onSubmit
    })

    return (
        <>
        <HomeBar/>
        <Toast/>
        <div className='container' style={{textAlign: 'center', backgroundImage: "linear-gradient(#091d3e, #114c6c)"}} >
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <h5 style={{color: 'white'}}>Register</h5>
            <div className="content-section row d-flex flex-column align-items-center justify-content-center" style={{border: 'none'}}>
                <div className="content-section content col-md-10">
                    <br/>
                    <form className='row g-3 d-flex align-items-center justify-content-center' style={{textAlign: 'center'}}>
                        <div className='form-group col-md-3'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'center'}}>First Name</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name = 'first_name'
                                value={values.first_name}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.first_name && touched.first_name ? {borderColor:"#fc8181"}:{}}/>
                                { errors.first_name && touched.first_name && <p className='error'>{errors.first_name}</p>}
                            <br/>
                        </div>
                        <div className='col-md-4'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Middle Name</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name = 'middle_name'
                                value={values.middle_name}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.middle_name && touched.middle_name ? {borderColor:"#fc8181"}:{}}/>
                                { errors.middle_name && touched.middle_name && <p className='error'>{errors.middle_name}</p>}
                            <br/>
                        </div>
                        <div className='col-md-3'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Last Name</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name='last_name'
                                value={values.last_name}
                                onChange = {handleChange}
                                onBlur = {handleBlur}  
                                style = {errors.last_name && touched.last_name ? {borderColor:"#fc8181"}:{}}/>
                                { errors.last_name && touched.last_name && <p className='error'>{errors.last_name}</p>}
                            <br/>
                        </div>
                        <div className='col-md-3'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>ID Number</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name='id_number'
                                value={values.id_number}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.id_number && touched.id_number ? {borderColor:"#fc8181"}:{}}/>
                                { errors.id_number && touched.id_number && <p className='error'>{errors.id_number}</p>}
                            <br/>
                        </div>
                        <div className='col-md-4'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Email</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name='email'
                                value={values.email}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.email && touched.email ? {borderColor:"#fc8181"}:{}}/>
                                { errors.email && touched.email && <p className='error'>{errors.email}</p>}
                            <br/>
                        </div>
                        <div className='col-md-3'>
                            <label className='form-control-sm' style={{color:'#e9e7e7', textAlign:'left'}}>Phone Number</label>
                            <input
                                type='text'
                                className='form-control custom-inputs'
                                name='phoneNumber'
                                value={values.phoneNumber}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.phoneNumber && touched.phoneNumber ? {borderColor:"#fc8181"}:{}}/>
                                { errors.phoneNumber && touched.phoneNumber && <p className='error'>{errors.phoneNumber}</p>}
                            <br/>
                        </div>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7'}}>Password</label>
                            <input
                                type='password'
                                className='form-control custom-inputs'
                                name='password'
                                value={values.password}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.password && touched.password ? {borderColor:"#fc8181"}:{}}/>
                                { errors.password && touched.password && <p className='error'>{errors.password}</p>}
                        </div>
                        <div className='col-md-5'>
                            <label className='form-control-sm' style={{color:'#e9e7e7'}}>Confirm Password</label>
                            <input
                                type='password'
                                className='form-control custom-inputs'
                                name='confirm_password'
                                value={values.confirm_password}
                                onChange = {handleChange}
                                onBlur = {handleBlur}
                                style = {errors.confirm_password && touched.confirm_password ? {borderColor:"#fc8181"}:{}}/>
                                { errors.confirm_password && touched.confirm_password && <p className='error'>{errors.confirm_password}</p>}
                        </div>
                        <br/>
                        <div className="form-group">
                        <button className="btn btn-outline-info" type="submit" disabled={isLoading} onClick={handleSubmit}>
                            {isLoading ? <ReactLoading type="spin" color="white" height={20} width={20} />: "Register"}
                        </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        </>
        
    )
}

export default Register