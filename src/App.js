import React from 'react';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Backend/Components/Login';
import Createtheatre from './Backend/Components/Createtheatre';
import Edittheatre from './Backend/Components/Edittheatre';
import Createmovie from './Backend/Components/Createmovie';
import Editmovie from './Backend/Components/Editmovie';
import Createshows from './Backend/Components/Createshows';
import Editshows from './Backend/Components/Editshows';
import Userlogin from './Frontend/Components/Userlogin';
import Signup from './Frontend/Components/Signup';
import Dashboard from './Frontend/Components/Dashboard';
import Moviedetail from './Frontend/Components/Moviedetail';
import Movieshows from './Frontend/Components/Movieshows';

function App() {

  return (
    <>
       <BrowserRouter> 
          <Routes>
              <Route path="/" element={<Userlogin/>} />    
              <Route path="/admin" element={<Login/>} />    
              <Route path="/Signup" element={<Signup/>} />    
              <Route path="/Dashboard" element={<Dashboard/>} />    
              <Route path="/moviedetail/:id" element={ <Moviedetail/> } />
              <Route path="/movieshows/:id/:movieid" element={ <Movieshows/> } />

              <Route path="Createtheatre" element={ <Createtheatre/> } />
              <Route path="Edittheatre/:id" element={ <Edittheatre/> } />
              <Route path="Createmovie" element={ <Createmovie/> } />
              <Route path="Editmovie/:id" element={ <Editmovie/> } />
              <Route path="Createshows" element={ <Createshows/> } />
              <Route path="Editshows/:id" element={ <Editshows/> } />
          </Routes>
    </BrowserRouter>  
    </>
  );
}

export default App;
