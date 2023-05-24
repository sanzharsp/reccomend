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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';
import { InputLabel } from '@mui/material';
import { Select, MenuItem } from '@mui/material';


const PostListItem = ({open_,setOpen_})=>{




  const [openModal, setOpenModal] = React.useState(true);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCategorColor, setSelectedCategoryColor] = useState('');
  const [selectedCategoryEat, setSelectedCategoryEat] = useState('');
  const [selectedCategoryVeg, setSelectedCategoryVeg] = useState('');
  const [selectedCategoryPizza, setSelectedCategorylPizza] = useState('');
  const [selectedCategoryVar, setSelectedCategorylVar] = useState('');
  const [selectedCategoryShuggar, setSelectedCategorylShuggar] = useState('');
  const [selectedCategorySalt, setSelectedCategorylSalt] = useState('');

  const handleChangeModal = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleChangeModalColor = (event) => {
    setSelectedCategoryColor(event.target.value);
  };
  const handleChangeModalEat = (event) => {
    setSelectedCategoryEat(event.target.value);
  };
  const handleChangeModalVeg = (event) => {
    setSelectedCategoryVeg(event.target.value);
  };
  const handleChangeModalPizza = (event) => {
    setSelectedCategorylPizza(event.target.value);
  };

  const handleChangeModalVar = (event) => {
    setSelectedCategorylVar (event.target.value);
  };
  const handleChangeModalShuggar = (event) => {
    setSelectedCategorylShuggar(event.target.value);
  };
  const handleChangeModalSalt = (event) => {
    setSelectedCategorylSalt(event.target.value);
  };


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
  const handleCategorySelect = (categoryName) => {
   console.log(categoryName)
   axios.get(`${url.baseUrl}${url.mainFilter}${categoryName}`).then((response)=>{
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

        const Catgeory  = (e) => {
    

    e.preventDefault();
    // Здесь вы можете выполнить дополнительную логику обработки формы, например, отправку данных на сервер

          axios.get(`${url.baseUrl}${url.filter}${selectedCategory}`).then((response)=>{
           setDataLatesNews(response.data.results)
          })
          setOpenModal(false)
         };
      


    return (

      <div className="Container">
      

      <Dialog
        open={openModal} 
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Маған сіздің талғамыңызды білу керек"}
        </DialogTitle>
        <DialogContent>
        <form onSubmit={Catgeory}>
        <InputLabel>Категория</InputLabel>
        <FormControl style={{width:'100%'}}  required>
            <Select value={selectedCategory} onChange={handleChangeModal} >
            {categories.map((category) => 
              <MenuItem value={category.category}> {category.category} </MenuItem>
            )}
       
            </Select>
        </FormControl>
            <InputLabel>Тағамнын майлығы</InputLabel>
            <FormControl style={{width:'100%'}}  required>
            <Select value={selectedCategorColor} onChange={handleChangeModalColor} >
              <MenuItem value="Орташа">Орташа</MenuItem>
              <MenuItem value="Өте майлы">Өте майлы</MenuItem>
              <MenuItem value="Майсыз">Майсыз</MenuItem>
            </Select>   
            </FormControl>

      <InputLabel>Сізге ұнайтын тағам</InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategoryEat} onChange={handleChangeModalEat} >
              <MenuItem value="категория1">Қуырылған картоп</MenuItem>
              <MenuItem value="категория2">Бешбармақ</MenuItem>
              <MenuItem value="категория3">Цезарь — салат</MenuItem>
              <MenuItem value="категория3">Греческий — салат </MenuItem>
              <MenuItem value="категория3">Витаминный — салат</MenuItem>
              <MenuItem value="категория3">Грейпфрутовый — салат</MenuItem>
              <MenuItem value="категория3">Капрезе — итальянский салат</MenuItem>
              <MenuItem value="категория3">Торт</MenuItem>
              <MenuItem value="категория3">Лазанья</MenuItem>
              <MenuItem value="категория3">Спагетти Болоньезе </MenuItem>
              <MenuItem value="категория3">Стейк </MenuItem>
              <MenuItem value="категория3">Ризотто</MenuItem>
              <MenuItem value="категория3">Паэлья</MenuItem>
              <MenuItem value="категория3">Бургер </MenuItem>
              <MenuItem value="категория3">Карри </MenuItem>
              <MenuItem value="категория3">Паста </MenuItem>
            </Select>
          </FormControl>

      <InputLabel>Сіз еттен немесе вегетариянды тағамды жақсы көресіз бе? </InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategoryVeg} onChange={handleChangeModalVeg} >
              <MenuItem value="Ет">Ет</MenuItem>
              <MenuItem value="Вегетерианды">Вегетерианды</MenuItem>
            </Select>
          </FormControl>

      <InputLabel>Пицца немесе суши?</InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategoryPizza} onChange={handleChangeModalPizza} >
              <MenuItem value="Пицца">Пицца</MenuItem>
              <MenuItem value="Суши">Суши</MenuItem>
            </Select>
          </FormControl>

      <InputLabel>Қуырылған немесе қайнатылған?</InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategoryVar} onChange={handleChangeModalVar} >
              <MenuItem value="Қуырылған">Қуырылған</MenuItem>
              <MenuItem value="Қайнатылған">Қайнатылған</MenuItem>
            </Select>
          </FormControl>
      <InputLabel>Қантты қаншалықты жақсы көресіз?</InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategoryShuggar} onChange={handleChangeModalShuggar} >
              <MenuItem value="Ортша">Ортша</MenuItem>
              <MenuItem value="Өте жақсы көремін">Өте жақсы көремін</MenuItem>
              <MenuItem value="Жақсы көрмеймін">Жақсы көрмеймін</MenuItem>
            </Select>
          </FormControl>

      <InputLabel>Тұзды қаншалықты жақсы көресіз?</InputLabel>
            <FormControl style={{width:'100%'}} required>
            <Select value={selectedCategorySalt} onChange={handleChangeModalSalt} >
              <MenuItem value="Ортша">Ортша</MenuItem>
              <MenuItem value="Өте жақсы көремін">Өте жақсы көремін</MenuItem>
              <MenuItem value="Жақсы көрмеймін">Жақсы көрмеймін</MenuItem>
            </Select>
          </FormControl>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
          <Button variant="contained" color="primary" type="submit">
          Ұсыныс алу
      </Button>
      </div>
      </form>
        </DialogContent>  
    
      </Dialog>
 

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
