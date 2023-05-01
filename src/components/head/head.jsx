import './head.css'
import Animation from  '../Animation/animation'
import { stack   as Menu } from 'react-burger-menu';
import 'reactjs-popup/dist/index.css'
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import {Link} from "react-router-dom";
import InfoProfile from '../Profile/info-profile'

/*Шапка и роутинг сайта */

const Head=(props)=>{



    return(
        <div>
          

        <div className="navi">
        
     <a className="transparent-text" href="/"><h3>{props.title}</h3> </a> 
     
 
   
     <Animation/>
        <IconButton color="primary" >
        <Link to={'search'}> 

        <SearchIcon sx={{ fontSize: 40 ,color: '#2E2F45' }}/>

        </Link>

        </IconButton>
       
        <InfoProfile/>

          </div>

    <Menu>



    <Link  to={"/"} className="menu-item tegA">{props.home}</Link>

    <Link  to={"main_news"} className="menu-item tegA">{props.skills}</Link>
    <Link  to={"about"} className="menu-item tegA">{props.projects}</Link>
    <Link  to={"contact"} className="menu-item tegA">{props.contact}</Link>
    <Link  to={"register"} className="menu-item tegA">{props.register}</Link>
    <Link  to={"login"} className="menu-item tegA">{props.login}</Link>

    

  </Menu>
 


  
        </div>
    

    )
}

export default Head;