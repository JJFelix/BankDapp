import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    //token: null,
    user: null,
    isAuthenticated: false,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        // setToken: (state, action) =>{
        //     state.token = action.payload
        // },
        logoutUser: (state) =>{
            state.user= null
            state.isAuthenticated = false
            //state.token = null
        },
    }
})

export const { setUser, logoutUser } = authSlice.actions

export default authSlice.reducer



