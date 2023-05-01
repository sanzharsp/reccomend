import VerifiedIcon from '@mui/icons-material/Verified';
import './getpost.css';
import Divider from '@mui/material/Divider';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axiosApiInstance from '../API/auth-header'
import { useState,useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import url  from '../backend-server-url'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardContent from '@mui/material/CardContent';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Snackbar } from '@mui/material';
import {

    Link,
   
    
  } from "react-router-dom";
import SpeedDial from '@mui/material/SpeedDial';


const Posts= (props) => {
  const [open2, setOpen2] = useState(false);


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
    const data = {id:id, title:title, price:price, qty:qty, image:image}



  const existingData = JSON.parse(localStorage.getItem('cart')) || [];

  const isExist = existingData.some((obj) => JSON.stringify(obj) === JSON.stringify(data));
  
  if (!isExist) {
    existingData.push(data);
  }
  
  localStorage.setItem('cart', JSON.stringify(existingData));
  handleOpen2();
  }



  let navigate = useNavigate();
  const[like,SetLike]=useState(props.likes);
  const[bool,setBool]=useState(false);
  const[identificated,setIdentificated]=useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() =>{
    if (props.value === 'Unlike') setBool(true);
    else  setBool(false);
},[])
 

useEffect(() =>{
  axiosApiInstance.post(`${url.baseUrl}${url.Post.identificated}`,{
    post_id: props.id,
}).then(res => {
  const post = res.data;
  setIdentificated(post.post)
 
}).catch(err => {
  setIdentificated(false)
  console.log(err);
})
},[])

const LikeAdd =(id)=>{
  axiosApiInstance.post(`${url.baseUrl}${url.Post.like}`,{
    post: id,
})
  .then(res => {
    const post = res.data;
    setBool(post.is_like)
    SetLike(post.post_like)
   
  }).catch(err => {
    if( err.response.status === 401)  navigate("/login", { replace: true });
    else console.log(err);
  })
}

  
  


 
    return(
      
<section className="list-content" key={props.id}>

            <div className="post-slide">
              <div className="post-img">
                <img src={props.image} alt=""/>
                <a  className="over-layer"><i className="fa fa-link"></i></a>
              </div>
              <div className="post-content">
                <h3 className="post-title">
                  <a href="#"><div dangerouslySetInnerHTML={{ __html: props.title }} />{props.published
                    ?
                    <>
                    <h6 style={{ color:'green'}}>Администратордан тексеріскен өтті<VerifiedIcon/></h6>
                    <Divider variant="middle" />
                    </>
                    
                   
                    :
                    <></>
                    }</a>
                </h3>
                
                <h4>#{props.category}|{props.author.Author_user}</h4>
                <p className="post-description"><div dangerouslySetInnerHTML={{ __html: props.content_text }}/></p>
                
                <span className="post-date"><i className="fa fa-clock-o"></i>{props.published_date}</span>
                <Link  to={`/post/${props.id}`} className="read-more">Толығырақ</Link>
                <br/>
                <br/>
                <a  href={props.instagram} className="read-more">әлеуметтік желі</a>
   <div style={{padding:10}}>
          
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary">{props.qty} дана</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" align="right">{props.price} ₸</Typography>
        </Grid>
      </Grid>

    </div>
                <CardContent/>
            
                <Divider variant="middle" />
                <CardContent/>
                
                    <Stack direction="row" spacing={2}>
                    {
                      
                 
                     bool 
                     ?
                     
                    <Button variant="outlined" startIcon={<FavoriteBorderTwoToneIcon />} onClick={() =>LikeAdd(props.id)}/>
                  
                    :
                  
                    <Button color="error" variant="outlined" startIcon={<FavoriteBorderTwoToneIcon />} onClick={() =>LikeAdd(props.id)}/>
                 
              
                    }
                
                        <h5>{like}</h5>
                      
                        { 
                          identificated
                          ?
                          <>
                          
                          <CardContent/>
                          
                           <CardContent/>
                          <Button color="error"  variant="outlined" startIcon={<DeleteRoundedIcon />} onClick={handleClickOpen}/>
                          
                          <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            {"Өнімді жою"}
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                            Өнімді жойсаңыз, ол барлық деректер базасынан жойылады.
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>Жоқ</Button>

                            <Button color="error" onClick={() =>{props.delete(props.id); setOpen(false);} } autoFocus>
                              Жою
                            </Button>
                            
                          </DialogActions>
                        </Dialog>
                        
                        </>
                          :
                          <></>
                        }
                        
             
                    </Stack>
                    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 2 }}>
                    <SpeedDial
        ariaLabel="SpeedDial controlled open example"
        sx={{ position: 'absolute', bottom: 45, left:0 }}
        FabProps={{
          className: 'my-fab-class', 
          style: { width: 40, height: 40 }
        }}
        icon={<AddShoppingCartOutlinedIcon />}
        onClick={() =>AddToCart(props.id,props.title,props.price,props.qty,props.image)}

      >  
   
          </SpeedDial>
          </Box>
               


              </div>
              
              <Snackbar
      open={open2}
      autoHideDuration={3000}
      onClose={handleClose2}
      message={<div dangerouslySetInnerHTML={{ __html: `${ props.title } корзинаға салынды` }}/>}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 'bold',
        },
      }}
    />
            </div>
          
  </section>
  


    )
}



export default Posts