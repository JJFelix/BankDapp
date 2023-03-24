import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Toast = ()=>{
    return(
        <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
                // Define default options
                className: '',
                duration: 3000,
                style: {
                background: 'black',
                color: '#fff',
                },

                // Default options for specific types
                success: {
                    duration: 3000,
                    style: {
                        background: '#2af7ce9b',
                        color: '#fff',
                    },
                },

                error: {
                    duration: 3000,
                    style: {
                        background: 'white',
                        color: '#fc8181',
                    },
                },
            }}
        />
    )
}

export default Toast