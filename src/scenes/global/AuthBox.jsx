import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setCurrent,setToken,setRole } from '../state/userSlice';


export default function AuthBox() {
  var dispatch = useDispatch(); 
   var user = useSelector((state) => state.user.current)
   const [userRole,setUserRole] = useState(useSelector((state) => state.user.role)) 
  
    const handleLogOut = () =>{
      dispatch(setCurrent({}));
      dispatch(setToken(""))
      dispatch(setRole('Public'))
      localStorage.clear()
      setUserRole('Public')
      window.location.reload();
    }
   var myView = JSON.stringify(user) == '{}'?
    <span>
    <Link to='/register'><span className="icon-edit" /> Register </Link> 
    <Link to='/login'><span className="icon-signin" /> Login </Link>
    </span>
    :
    <span>
        <a href="#st"><span className="icon-user" />Welcome,{user.userName}!</a>
        <a href="#st"><span className="icon-user" /> My Account</a>
        <button onClick={handleLogOut}><span className="icon-signout" />Log Out</button>
    </span>
    
  return (
    <>
      {(userRole == 'Public') &&(
        <Navigate to="/product" replace={true}/>
      )}
        {myView}     
    </>
  )
}
