
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './LinkToPost.css';
import Slideshow from '../img/ImageSlider'
import url from '../backend-server-url'
import { useParams } from "react-router-dom";
import Container from '@mui/material/Container';

import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Snackbar } from '@mui/material';



let baseurl = url.baseUrl
let url_get_data=url.url_get_data



/* Загрузка определенного поста по id*/



 const LinkToPost =() => {
  const [open2, setOpen2] = useState(false);
  const [post, setPost] = useState([])
  let {id} = useParams();
  
useEffect(()=>{ 
    
    axios.get(`${baseurl}${url_get_data}${id}`)
      .then(res => {
        const post = res.data;
        console.log(post)
        setPost( post );
     
      
      })

 },[])
 const handleClose2 = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
  setOpen2(false);
};

const handleOpen2 = () => {

  setOpen2(true);
};
 const AddToCart =(id,title,price,qty,image)=>{
  const data = {id:id, title:title, price:price, qty:qty, image:`${baseurl}${image}`}



const existingData = JSON.parse(localStorage.getItem('cart')) || [];

const isExist = existingData.some((obj) => JSON.stringify(obj) === JSON.stringify(data));

if (!isExist) {
  existingData.push(data);
}

localStorage.setItem('cart', JSON.stringify(existingData));
handleOpen2();
}


    return (
      <>
      <Container>
      { post.map(posts =>
        <div key={posts.id}>
       
        <div className="content-title content" dangerouslySetInnerHTML={{ __html: posts.title }} />
        <div className="content">
        <Slideshow  baseurl={baseurl} image1={`${baseurl}${posts.image1}`} image2={`${baseurl}${posts.image2}`} image3={`${baseurl}${posts.image3}`} />
        </div>

        <Box sx={{ minWidth: 275 }}>


    <Card variant="outlined">
    <React.Fragment>
<CardContent>
<Typography variant="h6" component="div">
       Өнім туралы
</Typography>
  <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    Өнімнің деректер бзсына салынған күні - {posts.date_add} <PlaylistAddCheckIcon sx={{ color: 'blue'}}/>
  </Typography>

  <Typography sx={{ fontSize: 14 }} color="text.secondary">
 Лайк басқн адамдар саны {posts.likes.length} <FavoriteIcon sx={{ color: 'red'}}/>
  </Typography>

  {posts.main_news
  ?
  <Typography sx={{ fontSize: 14 , color: 'green' }} color="text.secondary">
      Өнім көшбасшылрдың арасында <VerifiedIcon/>
  </Typography>
  :
  <Typography  sx={{ fontSize: 14, color: 'red'}} color="text.secondary">
   Өнім көшбасшылрдың арасында қойылмаған <UnpublishedIcon/>
</Typography>
  
  }
 
 <Button variant="outlined" style={{width:'100%'}} onClick={()=>{AddToCart(posts.id,posts.title,posts.price,posts.qty,posts.image1)}}><ShoppingCartIcon/></Button>
</CardContent>
</React.Fragment>
</Card>
</Box>

<CardContent/>


          <Card variant="outlined">
         
          <Container>
       
        <CardContent>
                <div dangerouslySetInnerHTML={{ __html: posts.content_text }}/>
                </CardContent>
                </Container>
          
              
                </Card>
                
                </div>
                
       
        
    )}
    <CardContent/>
    <Alert severity="warning">
    <AlertTitle>Назар аудрыңыз</AlertTitle>
    Барлық өнімдердің сапаасы 100% оригиналды. 
    <br/>
    <strong> </strong>
  </Alert>
  <Snackbar
      open={open2}
      autoHideDuration={3000}
      onClose={handleClose2}
      message={<div dangerouslySetInnerHTML={{ __html: `Товар корзинаға салынды` }}/>}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 'bold',
        },
      }}
    />
    </Container>

    </>
        
      
    )
  
}



export default LinkToPost;