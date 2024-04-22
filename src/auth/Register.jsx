import React from 'react'
import { useForm } from 'react-hook-form';
import InputPassWord from './../admin/components/InputPassWord';
import { setCurrent, setToken } from '../scenes/state/userSlice';
import {useDispatch } from 'react-redux'
import {userApi} from '../Api/userApi'
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
import Loading1 from '../components/Loading1';

export default function Register() {
const [loading,setLoading] = useState(false);
const dispatch = useDispatch();
const {reset, register, handleSubmit,getValues,formState:{errors} } = useForm();

const validateConfirmPassword = (value) => { 
    var { password } = getValues()
    return value == password;
}

var myView = loading == true ? <Loading1/>: ''

const onSubmit = (data) => {
    const callRegister = async (data)=>{

      try{
        const response = await userApi.register(data)
        setLoading(true)
        dispatch(setCurrent(response.data.user)) 
        dispatch(setToken(response.data.jwt)) 
        localStorage.setItem('use',JSON.stringify(response.data.user))
        localStorage.setItem('token',JSON.stringify(response.data.jwt))
        toast.success('register success')
        }catch(e){
            toast.error('register error',e)
            setLoading(false)
            reset()
        }
    }
    callRegister(data)
};
  return (
    <div>
  <ul className="breadcrumb">
    <li><a href="/">Home</a> <span className="divider">/</span></li>
    <li className="active">Registration</li>
  </ul>
  <hr className="soft" />
  <div className="well">
  <h2 > Registration</h2>	
    <form className="form-horizontal" onSubmit={handleSubmit(onSubmit)}>
      <h3>Your Personal Details</h3>
      <div className="control-group">
      </div>
      <div className="control-group">
        <label className="control-label" htmlFor="inputUname">User name <sup>*</sup></label>
        <div className="controls">
          <input {...register('username',{required:true,minLength:2})} type="text" id="inputUname" placeholder="User Name" />
          {errors.username?.type === 'required' && <p style={{ color: 'red'
            }}>username is required</p>}
            {errors.username?.type === 'minLength' && <p style={{ color: 'red'
            }}>Username must have at least 2 character</p>}
        </div>
      </div>
      <div className="control-group">
        <label className="control-label" htmlFor="inputEmail">Email <sup>*</sup></label>
        <div className="controls">
          <input  {...register('email',{required: true,pattern:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})} type="text" placeholder="Email" />
            {errors.email?.type === 'required' && <p style={{ color: 'red' }}>email is required</p>}
            {errors.email?.type === 'pattern' && <p style={{ color: 'red' }}>wrong email </p>}  
        </div>
      </div>	  
      <div className="control-group">
        <label className="control-label">Password <sup>*</sup></label>
        <div className="controls">
            <InputPassWord label='password' register={register} validateFunction={()=>{return true}}/>
            {errors.password?.type === 'required' && <p style={{ color: 'red' }}>Password required </p>}
            {errors.password?.type === 'pattern' && <p style={{ color: 'red' }}>Password at least 8 character, 1 uppercase,
             one lowercase, one number, 1 specialCharacter</p>}
        </div>
      </div>
      <div className="control-group">
        <label className="control-label">Confirm Password <sup>*</sup></label>
        <div className="controls">
            <InputPassWord label='confirmPassword' register={register} validateFunction={validateConfirmPassword}/>
            {errors.confirmPassword?.type === 'required' && <p style={{ color: 'red' }}>Confirm Password required </p>}
            {errors.confirmPassword?.type === 'pattern' && <p style={{ color: 'red' }}>Password at least 8 character, 1 uppercase,
             one lowercase, one number, 1 specialCharacter</p>}
            {errors.confirmPassword?.type === 'validate' && <p style={{ color: 'red' }}> Password and confirm password not match</p>}
        </div>
      </div>
      <div className="control-group">
        <div className="controls">
            {myView}
          <input type="submit" name="submitAccount" defaultValue="Register" className="exclusive shopBtn" />
        </div>
      </div>
    </form>
  </div>
  <ToastContainer />
</div>

  )
}
