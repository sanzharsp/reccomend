

import React, { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Button, Paper } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axiosApiInstance from '../../components/API/auth-header';
import url from '../../components/backend-server-url';
import { Snackbar } from '@mui/material';
import { useNavigate } from "react-router-dom";


const CheckOut = () => {
  let navigate = useNavigate();
  const [open2, setOpen2] = useState(false);


  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
  };

  const handleOpen = () => {

    setOpen2(true);
  };



  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  localStorage.setItem('checkout',localStorage.getItem('cart'))
  const products = JSON.parse(localStorage.getItem('checkout')) 
  const detail = products.map(obj=> `<table> <tr><th> Өнім</th></tr> <tr> <td>Аты</td> <td>${obj.title}</td> <td>Дана саны</td> <td>${obj.qty}</td>  </td></tr></table> </br>`);
  const idArray = products.map((obj) => obj.id);
  const [formData, setFormData] = useState({
    address: '',
    post_index: '',
    telephone: '',
    totalPrice: localStorage.getItem('totalPrice'),
    products: idArray,
    productDetail: detail,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validate(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {

      axiosApiInstance.postForm(url.baseUrl + url.order,
        formData
      ).then((res) => {
        console.log(res)
        handleOpen()
        handleClose()

      }).catch((err) => {
        if (err.response.status === 401){
     
      
        navigate("/login", { replace: true })
        }

      })

    }
  };

  const validate = (formData) => {
    const errors = {};
    if (!formData.address) {
      errors.address = 'Мекенжай жолы міндетті түрде толтырылады';
    }
    if (!formData.post_index) {
      errors.post_index = 'Пошта индексі жолы міндетті түрде толтырылады';
    }
    if (!formData.telephone) {
      errors.telephone = 'Телефон нөмер жолы міндетті түрде толтырылады';
    }
    return errors;
  };


  const [data, setData] = useState([]);
  const [prices, setPrices] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    localStorage.setItem('checkout',items)
    setData(items);


  }, []);


  const handleQuantityChange = (event, index) => {
    const value = event.target.value;
    if (value < 1) {
      value = 1;
    }
    const updatedCartItems = [...data];
    updatedCartItems[index].qty = value;

    setData(updatedCartItems);

    setPrices(true);
   
  };




  useEffect(() => {
    const priceTotal = data.reduce((total, product) => Number(total) + Number(product.price) * Number(product.qty), 0)
    setTotalPrice(priceTotal);
  }, [data]);

  const Checked = () => {
    localStorage.setItem('checkout', JSON.stringify(data))
    localStorage.setItem('totalPrice', totalPrice);
    handleClickOpen()
  }


  return (
    <Container maxWidth="md" sx={{ marginTop: 4, marginBottom: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {
            data.map((obj, index) =>
              <div style={{ padding: 10 }}>
                <Paper sx={{ padding: 2 }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <img src={obj.image} alt="Product" style={{ width: 100, height: 100 }} />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Typography variant="h6">Өнім атауы</Typography>
                      <Typography variant="body1" color="textSecondary">

                        <div dangerouslySetInnerHTML={{ __html: obj.title }} />
                      </Typography>
                      {
                        prices
                          ?
                          <Typography variant="h6">{obj.price * obj.qty} (₸)</Typography>
                          :
                          <Typography variant="h6">{obj.price} (₸)</Typography>
                      }

                      <TextField label="Саны"
                        InputProps={{ inputProps: { min: 1, max: JSON.parse(localStorage.getItem('cart'))[index].qty } }}

                        type="number"
                        onChange={(event) => handleQuantityChange(event, index)}
                        defaultValue={1}
                        fullWidth
                        sx={{ marginTop: 2 }} />
                    </Grid>
                  </Grid>
                </Paper>
                <Snackbar
      open={open2}
      autoHideDuration={3000}
      onClose={handleClose2}
      message={"Сіздің тапсырыңыз қателіксіз берілді"}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
          fontWeight: 'bold',
        },
      }}
   />
              </div>
            )
          }
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant="h6">Толық бағасы</Typography>
            <Typography variant="h6">Жалпы сома: {totalPrice} (₸)</Typography>
            <Button variant="contained" color="primary" onClick={() => { Checked() }} fullWidth sx={{ marginTop: 2 }}>
              Тапсырысқа беру
            </Button>
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Тапсырысқа беру"}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Адрес"
                variant="outlined"
                fullWidth
                required
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                error={errors.address ? true : false}
                helperText={errors.address}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Телефон нөмер"
                variant="outlined"
                fullWidth
                required
                name="telephone"
                id="telephone"
                value={formData.telephone}
                onChange={handleChange}
                error={errors.telephone ? true : false}
                helperText={errors.telephone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Почта индексі"
                variant="outlined"
                fullWidth
                required
                name="post_index"
                id="post_index"
                value={formData.post_index}
                onChange={handleChange}
                error={errors.post_index ? true : false}
                helperText={errors.post_index}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Тапсырысқа беру
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} autoFocus>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CheckOut;
