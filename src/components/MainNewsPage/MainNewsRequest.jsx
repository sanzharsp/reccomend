import Posts from '../API/posts_request'
import React ,{useState,useEffect} from 'react';
import axios from 'axios';
import '../API/getpostmainload.css'
import ServerError from '../Error/error'
import url from '../backend-server-url'
import './MainNewsPage.css'
import Counter from '../Mobx/ProfileRender/ProfileMobxRener'
import axiosApiInstance from '../API/auth-header'
import { useNavigate } from "react-router-dom";



const  MainNewsRequest =()=>{
 let navigate = useNavigate();
const[DataLatesNews,setDataLatesNews]=useState([]);
const[currentPage,setcurrentPage]=useState(1);
const[fetching,setfetching]=useState(true);
const[loading,setloading]=useState(true);
const[error,seterror]=useState(false);

useEffect(() =>{
  localStorage.removeItem('next');
  localStorage.removeItem('next_main');

},[])


useEffect(() =>{
if (fetching){
axios.get(`${url.baseUrl}${url.main_news}${currentPage}`)
.then(response=>{
  localStorage.setItem('next_main',response.data.next);
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
},[fetching])



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
   
      if (e.target.documentElement.scrollHeight-(e.target.documentElement.scrollTop+window.innerHeight)<100 && localStorage.getItem('next_main')!=='null'){

      
          setfetching(true);
        }
      }


    return (
      <div>
      
 
      <div  className="Container">
      <div className="container_about">
      <h1 >Біздің көшбасшы тауарлар</h1>
      
      
      </div>
     
      

      { 
        error
        ?

    <ServerError title={"Сервер қатесі"} error_text={"ССервер сұрауларға жауап бермейді. Егер сіз бұл хабарламаны көрсеңіз, бетті қайта жүктей аласыз, егер ол көмектеспесе, бізге жазыңыз"}/>
      :
      

      
         loading
        ? <div className="box-loading -white"/>
    
        
       
     
        : DataLatesNews.map(posts => 

        <Posts key={posts.id} 
        category={posts.category.category} 
        id={posts.id}  
        image={posts.image1} 
        title={posts.title} 
        content_text={posts.context} 
        image1={posts.image1} 
        author={{"Author_user":posts.user.username,"author_first_name":posts.user.first_name,"author_last_name":posts.user.last_name}} 
        published_date={posts.date_add} 
        likes={posts.likes.length}
        value={posts.value}
        qty = {posts.qty}
        price = {posts.price}
        instagram =  {posts.instagram }
        delete ={handleDeleteElement}
        />

     
    
     
      
)}


      </div>

      
      </div>
    )
  }

export default MainNewsRequest;