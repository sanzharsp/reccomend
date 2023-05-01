

import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import './getpostmainload.css'
import ServerError from '../Error/error'
import url from '../backend-server-url'
import Posts from './posts_request'
import Counter from '../Mobx/ProfileRender/ProfileMobxRener'
import axiosApiInstance from '../API/auth-header'
import { useNavigate } from "react-router-dom";



import {Typography, Drawer, List, ListItem, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material';

const PostListItem = ({open_,setOpen_})=>{

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get(url.baseUrl+url.catgeory).then((response)=>{
      console.log(response.data.results)
      setCategories(response.data.results)
    })
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpenilter =()=>{
    setOpen_(true);
  }
  const handleCategorySelect = (categoryId,categoryName) => {
   console.log(categoryName)
   axios.get(`${url.baseUrl}${url.filter}${categoryName}`).then((response)=>{
    setDataLatesNews(response.data.results)
   })
   setOpen_(false)
  };



  let navigate = useNavigate();
const[DataLatesNews,setDataLatesNews]=useState([]);
const[currentPage,setcurrentPage]=useState(1);
const[fetching,setfetching]=useState(true);
const[loading,setloading]=useState(true);
const[error,seterror]=useState(false);




useEffect(() =>{
  localStorage.removeItem('next_main');
  localStorage.removeItem('next');

},[])

useEffect(() =>{
if (fetching){
axios.get(`${url.baseUrl}${url.lates_news}${currentPage}`)
.then(response=>{
    localStorage.setItem('next',response.data.next);
    setDataLatesNews([...DataLatesNews, ...response.data.results]);
    setloading(false);
    seterror(false);
    setcurrentPage(prevState=>prevState + 1);
    
 
   

}
).catch((error)=>{

  if (error.response.status!==404){
seterror(true);
  }
}).finally(()=>setfetching(false))
}
},[fetching,])


useEffect(() =>{

    document.addEventListener("scroll",scrollHandler)
  

    return function(){
    document.removeEventListener("scroll",scrollHandler)
  }



},[])

function handleDeleteElement (id) {
  axiosApiInstance.delete(`${url.baseUrl}${url.Post.post_delete}/${id}`,{
  })
    .then(res => {
      const post = res.data;
      console.log(post);
      Counter.trigger_delete();
      setDataLatesNews(prevState => prevState.filter(el => el.id !== id));

     
    }).catch(err => {
      if( err.response.status === 401)  navigate("/login", { replace: true });
      else console.log(err);
    })
  

    
  
};
  
    const scrollHandler=(e)=>{
     
        if (e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100 && localStorage.getItem('next')!=='null'){

        
            setfetching(true);
          }
        }

      


    return (

      <div className="Container">
        <Drawer anchor={isMobile ? 'bottom' : 'right'} open={open_} variant="temporary">
      <List>
        <ListItem>
          <Typography variant="h6">Категории</Typography>
        </ListItem>
        <Divider />
        {categories.map((category) => (
          <ListItem key={category.id} button onClick={() => handleCategorySelect(category.id,category.category)}>
            <ListItemText primary={category.category} />
          </ListItem>
        ))}
          <ListItem  button onClick={() => handleCategorySelect('','')}>
            <ListItemText primary={"Барлығы"} />
          </ListItem>
      </List>
    </Drawer>
      { 
                error
                ?
        
            <ServerError title={"Cервер қатесі"} error_text={"Сервер сұрауларға жауап бермейді. Егер сіз бұл хабарламаны көрсеңіз, бетті қайта жүктей аласыз, егер ол көмектеспесе, бізге жазыңыз"}/>
              :
              
        
              
                 loading
                ? <div className="box-loading -white"/>
            
                
                
               
             
                :DataLatesNews.map(postlist=>
            
                  <Posts  key={postlist.id} 
                          category={postlist.category.category} 
                          id={postlist.id}  
                          image={postlist.image1} 
                          title={postlist.title} 
                          content_text={postlist.context} 
                          image1={postlist.image1} 
                          author={{"Author_user":postlist.user.username,"author_first_name":postlist.user.first_name,"author_last_name":postlist.user.last_name}}
                          published_date={postlist.date_add} 
                          likes={postlist.likes.length} 
                          value={postlist.value}
                          qty = {postlist.qty}
                          price = {postlist.price}
                          instagram =  {postlist.instagram }
                          delete ={handleDeleteElement}
                          />
            
        )}
      
        </div>

    )
}

export default PostListItem;
