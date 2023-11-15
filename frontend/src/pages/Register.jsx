import React, { useState } from 'react'
import '../Styles/Register.css'
import {Link} from 'react-router-dom'
import { registerRoute } from '../APIRoutes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [User, setUser] = useState({
    username: "",
    mail: "",
    password: ""
  });
  const handlechange = (event)=>{
     setUser({...User, [event.target.name] : event.target.value});
  }
  const handleCheck=()=>{
    if( User.username===""||User.mail===""||User.password===""){
      return false;
    }
    return true;
  }
  const handlesubmit = async (e)=>{
      e.preventDefault()
      if( handleCheck() )
      {
        console.log(User);
        const {username, mail, password} = User;
        const {data} = await axios.post(registerRoute,{
          username,
          mail,
          password
          })
          console.log(data)
        if( data.status === false ){
          console.log("error registering user");
          alert("USERNAME ALREADY EXISTS")
        }
        else{
          localStorage.setItem('User', JSON.stringify(data.user)); 
          navigate('/chooselang'); 
        }
      }
      else {
        alert("FIELDS CANNOT BE EMPTY")
      }
      
  }
  return (
    
        
        <div className='form' onSubmit={(e)=>handlesubmit(e)}>
            
            <form className='reg'> 
                
                <div className='div1 content'>
                  <label htmlFor="name" className='label'>ENTER NAME</label>
                  <input type='text' 
                          placeholder='username'
                          name='username' id="name" 
                          className='input' 
                          onChange={(e) => handlechange(e)}>
                  </input>  
                </div>          
                
                <div className='div2 content'>
                  <label htmlFor="mail" 
                    className='label'>
                      ENTER MAIL
                  </label>
                  <input type='text'
                    placeholder='email' 
                    name='mail' id="mail" 
                    className='input' 
                    onChange={(e) => handlechange(e)}></input>
                </div>

                <div className='div3 content'>
                  <label htmlFor="password"
                    className='label'>
                      ENTER Password
                  </label>
                  <input type='password'
                    placeholder='password' 
                    name='password' 
                    id="password" 
                    className='input' 
                    onChange={(e) => handlechange(e)}>
                  </input>
                </div>
                <div className='div4 content'>
                  <button type='submit' className='common submit' >submit</button>
                </div>
                <div className='div5 content'>
                  <span >
                    Already registered? <Link to="/login" style={{color: "black"}}>Login</Link>
                  </span>
                </div>
                
            </form>
         </div>
    
  )
}
