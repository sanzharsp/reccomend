import IndexPage from '../Index/Index'
import NotfoundPage from '../NotfoundPage/NotfoundPage'
import LinkToPost from '../LinkToPost/LinkToPost'
import AboutPage from '../AboutPage/AboutPage'
import MainNewsRequest from '../MainNewsPage/MainNewsRequest'
import ContactPage from '../ContactPage/ContactPage'
import Register from '../../Pages/Auth/Register'
import Login from '../../Pages/Auth/Login'
import LiveSearchFilter from '../Search_Post/search'
import Profile from '../Profile/profile'
import {useRoutes} from "react-router-dom";
import CheckOut from '../../Pages/CheckOut.jsx/CheckOut'


const Routings = (props) => {

    let routes = useRoutes([
      { path: "/", element: <IndexPage/> },
      { path: "*" , element: <NotfoundPage/>},
      { path: "post/:id" ,element:<LinkToPost />},
      { path: "main_news/post/:id" ,element:<LinkToPost />},
      { path: "about", element: <AboutPage />},
      { path: "main_news", element: <MainNewsRequest />},
      { path: "contact", element: <ContactPage />},
      { path: "register", element: <Register />},
      { path: "login", element: <Login/>},
      { path: "search", element: <LiveSearchFilter/>},
      { path: "profile", element: <Profile/>},
      { path: "checkout", element: <CheckOut/>},

      

      
     
    ]);
    return routes;

}
export default Routings