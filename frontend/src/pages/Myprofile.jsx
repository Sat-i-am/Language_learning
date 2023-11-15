import React, { useEffect, useState } from 'react'
import '../Styles/Myprofile.css'
import { CgProfile } from "react-icons/cg";


export default function Myprofile() {

    const User = JSON.parse(localStorage.getItem("User"));
    const [total, settotal] = useState(0);

    useEffect(()=>{
        const k = User.correct_count+User.wrong_count
        settotal(k);
    },[])
    
  return (
    <div className='profile-page'>
        
        <div className='profile-content'>
        <div className='profile-icon'>
            <CgProfile size={80} style={{ color: "#F9FBE7" }}/>
        </div>
            <div className='abc'>
                <div className='profile-detail-label'>
                        USERNAME
                </div>
                <div className='profile-detail'>
                    {User.username}
                </div>
            </div >
            <div className='abc'>
                <div className='profile-detail-label'>
                    USER EMAIL
                </div>
                <div className='profile-detail'>
                    {User.mail}
                </div>
            </div>
            <div className='abc'>
                <div className='profile-detail-label'>
                    RIGHT ANSWERS
                </div>
                <div className='profile-detail'>
                    {User.correct_count}
                </div>
            </div>
            <div className='abc'>
                <div className='profile-detail-label'>
                    WRONG ANSWERS
                </div>
                <div className='profile-detail'>
                    {User.wrong_count}
                </div>
            </div>
            <div className='abc'>
                <div className='profile-detail-label'>
                    PROFICIENCY
                </div>
                <div className='profile-detail'>
                        { total>0  //if total answer is 0 show profeciency as 0
                            ?  ((User.correct_count/total)*100).toFixed(2) 
                            : 0
                        } %
                </div>
            </div>
        </div>
    </div>
  )
}
