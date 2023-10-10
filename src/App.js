import React,{useState,createContext} from 'react'

import { BrowserRouter ,Routes,Route} from 'react-router-dom';
import Home from './Home';
import Registation from './Login_reg/Registation';
import Login from './Login_reg/Login';
import  Dashbord from './Dashbord';
import Chat from './chat/Chat';
import Chatpage from './chat/Chatpage';

import Video from './chat/Video';
export const store = createContext();
function App() {
 
  const [token,setToken] = useState(null);
  return (
    <div>
 <store.Provider value={[token,setToken]}>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Registation' element={<Registation/>}/>
        <Route path='/Chatpage' element={<Chatpage/>}/>
        <Route path='/Login' element={<Login/>}/>

        <Route path='/Video' element={<Video/>}/>

        <Route path='/Login/Dashbord' element={<Dashbord/>}/>
        <Route path='/Registation/Login/Dashbord' element={<Dashbord/>}/>
        <Route path='/Login/Dashbord/Chat' element={<Chat/>}/>
        <Route path='/Registation/Login/Dashbord/Chat' element={<Chat/>}/>
       
        <Route path='/Login/Registation' element={<Registation/>}/>

        <Route path='/Registation/Login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App