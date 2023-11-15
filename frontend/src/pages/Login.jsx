import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/Login.css'
import axios from "axios";
import {loginRoute} from '../APIRoutes'

export default function Login()  { 
  const navigate = useNavigate();
  const [User, setUser] = useState({
    username: "",
    password: ""
  });
  const handleCheck = ()=>{
    if( User.username == "" || User.password == ""){ //so that username or password is never submitted empty
      return false;
    }
    else{
      return true;
    }
  }
  const handlesubmit = async (e)=>{

    e.preventDefault();
    if( handleCheck() ){
        async function login(){
        console.log(User);
        const {username, password} = User;
        const {data} = await axios.post(loginRoute,{
          username,
          password
          })
        if( data.status === false ){
          alert("Incorrect username or password")
        }
        else{
          localStorage.setItem('User', JSON.stringify(data.user));
          navigate('/chooseLang'); 
        }
      }
      login();
    }
    else{
      alert("USERNAME OR PASSWORD CANNOT BE EMPTY")
    }
    
}
const handlechange = (event)=>{
  setUser({...User, [event.target.name] : event.target.value});
}

useEffect(() => {
  if(localStorage.getItem('User')){
    navigate('/chooseLang');
  }
},[])


  return (
    <div>
        <div className='loginform' onSubmit={(e)=>handlesubmit(e)}>
       
          <form className='loginreg'>
              
                <label htmlFor="name" className='loginlabel'>ENTER NAME</label>
                <input type='text' placeholder='name' name='username' id="name" className='input' onChange={(e) => handlechange(e)}></input>            
                
                <label htmlFor="password" className='loginlabel'>ENTER Password</label>
                <input type='password' placeholder='password' name='password' id="password" className='input' onChange={(e) => handlechange(e)}></input>

                <button type='submit' className='common loginsubmit' >submit</button>
                <span>
                    New User? <Link to="/register" className='reg-link'>Register</Link>
                </span>
          </form>
    </div>
    </div>
    
  )
}
