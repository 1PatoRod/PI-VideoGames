import './App.css';
import { Route, useLocation } from "react-router-dom";
import { Home, Landing, Form, Detail, NavBar } from './views/index'
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-videogames-production-66c1.up.railway.app/';

function App() {
  const location = useLocation()
  return (
    <div className="App">
      <Route exact path='/'><Landing/></Route>
      { location.pathname !== '/' && <NavBar/>}
      <Route path='/home'><Home/></Route>
      <Route path='/detail/:id'><Detail/></Route>
      <Route path='/create'><Form/></Route>
    </div>
  );
}

export default App;


// logo gatito con estada = 'https://th.bing.com/th/id/R.22fa5e1a4242b784c7532d365d1290c5?rik=GA2yAAXu11NuKg&pid=ImgRaw&r=0'