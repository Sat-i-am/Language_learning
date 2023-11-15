
import React from 'react'
import '../Styles/Navbar.css' ;
import {Link} from 'react-router-dom';
import hello from '../images/hello.jpg'
export default function Navbar() {
    
  return (
        <div className='pagenav'>
            <div className='navbar'>
                <div className='Navtext-links'>
                    <div >
                        <Link to="/About" className='nav-link'>
                            ABOUT
                        </Link>
                        
                    </div>
                    <div>
                        <Link to="/login" className='nav-link'>
                            LOGIN
                        </Link>
                    </div>
                    <div>
                        <Link to="/register" className='nav-link'>
                            REGISTER
                        </Link>
                    </div>
                
                </div>
                <div className='welcome'>
                    WELOME TO MA-LANG
                </div>

            </div>
            <div className='front-image'>
                {/* <img src={hello} className='hello'>
                </img> */}
            </div>
        
        </div>
  )
}

