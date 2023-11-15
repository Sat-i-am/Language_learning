import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/ChooseLang.css';
import { chooseLangRoute } from '../APIRoutes'; 
import axios from 'axios';


export default function ChooseLang() {

    const User = JSON.parse(localStorage.getItem(`User`));//destructuring username and userid form localstorage
    
    const navigate = useNavigate();
    
    const [currentLang, setcurrentLang] = useState("");

    useEffect(()=>{
        if(!User){
            navigate('/')
        }
    },[]);

    useEffect( () => {//post request is in useeffect so that when currentlang variable is changed then only it makes post request
        const changelanginbackend = async () =>{
            console.log(currentLang);
            if(!User){
                console.log("user not found in local storage")
            }
            else if(User && currentLang){ //i.e. only when we have a user and a currentLanguage, so this executes after changes 
                const {username, _id} = User;
                console.log(User);
                try{
                    const {data} = await axios.post(chooseLangRoute,{   //updating user data in database
                        username,
                        currentLang,
                        _id
                    })
                    if( data === false ){
                        console.log("error setting language")
                    }
                    const updatedUser = data.updatedUser; //
                localStorage.setItem('User', JSON.stringify(updatedUser));//updating user in local storage
                navigate('/difficulty')
                
                } catch(error){
                    console.log(error)
                }
                
                
                
        }
        // You can perform other actions that depend on the updated state here
        };
        changelanginbackend();
      }, [currentLang]);

    const handleClick=async(event)=>{
        setcurrentLang(event.target.className);
    }



  return (
    <div>
        
        <div className='langpag' > 
            <div className='lang-cont'>
                <div className='t'>
                    CHOOSE LANGUAGE TO LEARN
                </div>          
                <div className='b'>
                    <button type='button' className='englishtohindi' onClick={(e)=>{handleClick(e)}}>LEARN HINDI FROM ENGLISH</button>
                </div> 
                <div className='b'>
                    <button type='button' className='hinditoenglish' onClick={(e)=>{handleClick(e)}}>LEARN ENGLISH FROM HINDI</button>
                </div>  

            </div>               
                                    
         </div>
    </div>
  )
}
