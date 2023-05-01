import '../style/images.css';
import PostList from '../API/getpostmain';


import {Container,Card, } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import * as React from 'react';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import Typography from '@mui/material/Typography';
import { useState,useEffect } from 'react'
import Alert from '@mui/material/Alert';
import Badge from '@mui/material/Badge';
import { useNavigate } from "react-router-dom";

import FilterAltIcon from '@mui/icons-material/FilterAlt';





function IndexPage() {
  

  let navigate = useNavigate();
const [open, setOpen] = React.useState(false);
 const [data, setData] = useState([]);

 useEffect(() => {
   const items = JSON.parse(localStorage.getItem('cart')) || [];
   setData(items);

 }, [open]);
    const[open_,setOpen_]=useState(false);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const DeleteInCart =(id)=>{
 
    const existingData = JSON.parse(localStorage.getItem('cart')) || [];

    const index = existingData.findIndex((obj) => obj.id === id);
    console.log(index)
    
    if (index !== -1) {
      existingData.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(existingData));
    setData(existingData);


  }

  return (

    <div >





<CardContent/>
<Container>
<Card >


</Card>
</Container>
<div style={{minHeight:'100vh',display:'flex',flexDirection: 'column'}}>


<SpeedDial
  ariaLabel="SpeedDial basic example"
  
  sx={{ position: 'fixed', zIndex: 9999,  bottom: 16, right: 16 }}
  icon={<SpeedDialIcon />}
>

    <SpeedDialAction
      key={'Корзина'}

      icon={<Button onClick={handleClickOpen}>
          <Badge badgeContent={data.length} color="primary"> <ShoppingCartIcon /> </Badge>
      
      </Button>
    
      }

      tooltipTitle={'Фильтрация'}
    />
              <SpeedDialAction
      key={'Фильтрация'}

      icon={<Button onClick={()=>{setOpen_(true)}}>
       <FilterAltIcon /> 
      
      </Button>
    
      }

      tooltipTitle={'Фильтрация'}
    />

  
</SpeedDial>


<PostList open_={open_}  setOpen_={setOpen_}/>



    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Корзина"}
        </DialogTitle>
        <DialogContent>

        {
          data[0] !== undefined
          ?

          data.map((obj)=>
          <DialogContentText style={{padding:10}} key ={obj.id}>
          <Card style={{padding:10}}>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        <div dangerouslySetInnerHTML={{ __html: obj.title }} />
        </Typography>
          <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={obj.image}/>

      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
      {obj.price} (₸)
        </Typography>
    
  
      <Button color="error"  variant="outlined" startIcon={<DeleteRoundedIcon />} onClick={()=>DeleteInCart(obj.id)}/>
      </Stack>
      </Card>
        
          </DialogContentText>
          )
          :
          <Alert severity="error">Корзина бос, ешқандай өнім салынбаған</Alert>
          
}

          </DialogContent>


        <DialogActions>
          
          <Button  variant="outlined" onClick={handleClose}>ОК</Button>
          {
          data[0] !== undefined
          ?
          <Button color="success"  variant="outlined" onClick={()=>{navigate("/checkout", { replace: true });}}>Тапсырыс беру</Button>
          :<></>
          }
        </DialogActions>

         
 
      </Dialog>

</div>

</div>



);
}

export default IndexPage;