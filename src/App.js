import Head from "./components/head/head"
import './components/style/images.css'
import React  from 'react';
import Routings from './components/routing/routing'
import {BrowserRouter as Router} from "react-router-dom";

function App() {

  <Routings />
  return (
    <div>
    
    <Router>
    
<header>

      
<Head 
 title={"RECOMMEND"}
 home={"БАСТЫ БЕТ"}  
 skills={"КӨШБАСШЫ ТААУААРЛААР"} 
 projects={"БІЗ ТУРАЛЫ"} 
 contact={"БАЙЛАНЫС"} 
 register={'ТІРКЕЛУ'} 
 login={'КІРУ'}

 />


</header>

<Routings /> 
 </Router>


</div>


);
}

export default App;
