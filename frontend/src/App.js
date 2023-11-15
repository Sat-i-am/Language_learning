
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'
import Navbar from './pages/Navbar'
import Register from './pages/Register';
import ChooseLang from './pages/ChooseLang';
import Difficulty from './pages/Difficulty';
import Myprofile from './pages/Myprofile';
import Main from './pages/Main';

import './App.css';
import About from './pages/About';



function App() {
  return (
    <div className="App">
      <BrowserRouter>  
          <Routes> 
          <Route exact path="/" element={<Navbar/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/chooseLang" element={<ChooseLang />} />
            <Route exact path="/difficulty" element={<Difficulty />} />
            <Route exact path="/main" element={<Main />} />
            <Route exact path="/myProfile" element={<Myprofile/>} />
            <Route exact path="/About" element={<About/>} />
            {/* <Route exact path="/register" element={<Register/>} /> */}
            
          </Routes> 
       
      </BrowserRouter>
    </div>
  );
}

export default App;
