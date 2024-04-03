import React from 'react'
import InputPassWord from '../admin/components/InputPassWord'
import { useForm } from 'react-hook-form';
import { setCurrent, setToken ,setRole} from '../scenes/state/userSlice';
import {useDispatch } from 'react-redux'
import {userApi} from '../Api/userApi'
import { ToastContainer,toast } from 'react-toastify';
import { useState } from 'react';
import Loading1 from '../components/Loading1';
import {Navigate} from 'react-router-dom'
import { axiosInstance } from '../Api/axiosInstance';
export default function Login() {
const [userRole,setUserRole] = useState('Public')
const [loading,setLoading] = useState(false);
const dispatch = useDispatch();
    const { reset ,register, handleSubmit,formState:{errors}} = useForm();
    var myView = loading == true ? <Loading1/>: ''
const onSubmit = async (data) => {
  try {
    setLoading(true);
    // Call the login API
    const response = await userApi.login(data);
    
    // Dispatch actions to update Redux state
    dispatch(setCurrent(response.data.user));
    dispatch(setToken(response.data.jwt));
    
    // Store user data and token in localStorage
    localStorage.setItem('user', JSON.stringify(response.data.user));
    localStorage.setItem('token', response.data.jwt);
    
    // Show success message
    toast.success('Login success');
    
    // Reset form
    reset();

    // Fetch additional user info
    const getInfo = async (jwt) => {
      try {
        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " +jwt;
        const response1 = await userApi.me({ populate: '*' });
        console.log("a",response1);
        localStorage.setItem('role', response1.data.role.name);
        // Dispatch action to update user role in Redux state
        dispatch(setRole(response1.data.role.name));
        setUserRole(response1.data.role.name);
      } catch (error) {
        console.error('Error fetching additional user info:', error);
      }
    };
    getInfo(response.data.jwt);
  } catch (error) {
    // Show error message if login fails
    toast.error('Login error');
    console.error('Login error:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div >
      {/* {(userRole === 'admin-web')&&(
        <Navigate to="/admin/product" replace={true}/>
      )}
      {(userRole === 'Authenticated') &&(
        <Navigate to="/product" replace={true}/>
      )} */}
  <ul className="breadcrumb">
    <li><a href="index.html">Home</a> <span className="divider">/</span></li>
    <li className="active">Login</li>
  </ul>
  <hr className="soft" />
  <div className="row">
    <h3> </h3><br />
    <h3> </h3>
    <div className="span1"> &nbsp;</div>
    <div className="span4">
      <div className="well">
        <h3> Login</h3>	
        <h5>ALREADY REGISTERED ?</h5>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="control-group">
            <label className="control-label" htmlFor="inputUser">User Name</label>
            <div className="controls">
            <input {...register("identifier",{required:true,minLength:2})} type="text" id="inputUname" placeholder="User Name" />
                {errors.identifier?.type === 'required' && <p style={{ color: 'red'
                }}>username is required</p>}
                {errors.identifier?.type === 'minLength' && <p style={{ color: 'red'
                }}>Username must have at least 2 character</p>}
            </div>
          </div>
          <div className="control-group">
            <label className="control-label" htmlFor="inputPassword">Password</label>
            <div className="controls">
            <InputPassWord label='password' register={register} validateFunction={()=>{return true}}/>
            {errors.password?.type === 'required' && <p style={{ color: 'red' }}>Password required </p>}
            {errors.password?.type === 'pattern' && <p style={{ color: 'red' }}>Password at least 8 character, 1 uppercase,
             one lowercase, one number, 1 specialCharacter</p>}
            </div>
          </div>
          <div className="control-group">
            <div className="controls">
              {myView}
              <button type="submit" className="defaultBtn">Sign in</button> <a href="#st">Forget password?</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>	
  <ToastContainer />
</div>

  )
}
