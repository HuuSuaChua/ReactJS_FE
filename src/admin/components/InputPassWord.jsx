import React from 'react'

export default function InputPassWord(props) {
const validateFunction = props.validateFunction
const register = props.register
const label = props.label
const togglePassword =(e) => {
const password = e.target.previousElementSibling
const type = password.getAttribute('type') === 'password' ? 'text': 'password';
password.setAttribute('type', type);
e.target.classList.toggle('fa-eye-slash');
}
  return (
    <>
      <input {...register(label,{
        validate: validateFunction,
        require:true,pattern:/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/
        })} type="password" className="span3" placeholder="Password" /><i style={{marginLeft:'-30px',cursor:"pointer", verticalAlign:"5px"}} onClick={togglePassword} className="fas fa-eye view-icon"></i>
    </>
  )
}
