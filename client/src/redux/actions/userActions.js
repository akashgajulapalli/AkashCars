// import { axiosInstance } from '../../config'
import {message} from 'antd'
import axios from 'axios'

export const userLogin=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        const response = await axios.post('/api/users/login' , reqObj)
        localStorage.setItem('user' , JSON.stringify(response.data))
        message.success('Login success')
        dispatch({type: 'LOADING' , payload:false})
        setTimeout(() => {  
            if(response.data.isAdmin){
                window.location.href = '/admin'
            }
            else{
                window.location.href = '/home'
            }        
        }, 500);
    } catch (error) {
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})
    }
}

export const userRegister=(reqObj)=>async dispatch=>{
    
    dispatch({type: 'LOADING' , payload:true})

    try {
        await axios.post('/api/users/register' , reqObj)
        message.success('Registration successfull')
        setTimeout(() => {
            window.location.href='/login'
         
        }, 500);
       
        dispatch({type: 'LOADING' , payload:false})
        
    } catch (error) {
        message.error('Something went wrong')
        dispatch({type: 'LOADING' , payload:false})
    }
}