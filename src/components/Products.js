import React, { Component } from 'react'
import axios from "axios";
import CardItem from './CardItem'
import {Grid} from "@material-ui/core";

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField,CircularProgress} from '@material-ui/core';

import proxy from '../proxy'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);




class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            products:[],
            loading:false
        }
    }

    componentDidMount = async() =>{
      this.setState({ loading: true})
      let products = await axios.get(`${proxy}/api/v1/products/`);
      this.setState({products:products.data.data, loading: false});
    }
    handleStateChange = (data) =>{
      window.location.reload();
    }


    fetchNextBatch = async () =>{
      this.setState({ loading: true})
      if(!this.state.products){
        let products = await axios.get(`${proxy}/api/v1/products/`);
        this.setState({products:products.data.data,loading:false});
      }
      const id = this.state.products[this.state.products.length - 1]._id;
      let nextBatch = await axios.get(`${proxy}/api/v1/products/nextproducts/${id}`)
      let temp = [];
      temp = [...this.state.products];
      if(nextBatch.data.data.length === 0){
        alert('Not much data available');
        this.setState({ loading:false})
      }else{
        nextBatch.data.data.forEach((element,i) => {
          temp.push(element);
          if(i === nextBatch.data.data.length - 1){
            this.setState({
              loading:false,
              products: temp
            })
          }
        });
      }
    }
  render() {

    return (
      <div>
        <Header handleStateChange = {this.handleStateChange} />
        <center>
          <br/>
        <Grid container >
          {
            this.state.products.length > 0 ?(
              this.state.products.map(each=>(
                <Grid item xs={4}>
                  <CardItem data={each}/>
                </Grid>
                ))
            ):(
              <div></div>
            )

          }
          {this.state.loading?<CircularProgress color="secondary" />:<div></div>}
        </Grid>
        <button onClick={()=>this.fetchNextBatch()}>View More</button>
        </center>
      </div>
    )
  }
}


export function Header(props) {

  const [open, setOpen] = React.useState(false);
  const [pName, setPname] = React.useState('');
  const [pImage, setPimage] = React.useState('');
  const [pDescription, setPdescription] = React.useState('');
  const [pRating, setPrating] = React.useState('');
  const [pPrice, setPprice] = React.useState('');
  const [pSeller, setPseller] = React.useState('');
  const [pManufacturer, setPmanufacturer] = React.useState('');
  const [pDiscount, setPdiscount] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const openForm = () =>{
    handleClickOpen();
  }
  const handleClear = () =>{
    setOpen(false);
    setPname('');
    setPimage('');
    setPdescription('');
    setPrating('');
   setPprice('');
   setPseller('');
    setPmanufacturer('');
    setPdiscount('');
  }
  const uploadImage = async (photo) =>{
    let fd = new FormData();
    fd.append('photo',photo, photo.name);

    let result = await axios
        .post(`${proxy}/api/v1/products/imageupload/`, fd, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${fd._boundary}`
          }
        });
      setPimage(result.data.data.secure_url);
      if(result.data.success)
        alert('Image Uploaded Succesfully');
      else
        alert('Image Not uploded due to some error');

  }

  const handleSave = async () =>{

    let newProduct = {
      name:pName,
      image: pImage,
      description: pDescription,
      rating:pRating,
      price:pPrice,
      seller:pSeller,
      manufacturer:pManufacturer,
      discount:pDiscount,
    }

    let result = await axios
      .post(`${proxy}/api/v1/products/`,newProduct);
    if(result.data.success){
      alert('Item has been Saved');
      handleClear();
      handleClose();
      props.handleStateChange(result.data.data);
    }

  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Product Catalog
          </Typography>
          <Button color="inherit" onClick={()=> openForm()}>Add Product</Button>
        </Toolbar>
      </AppBar>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add A Item</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            value={pName}
            onChange = {(e)=>setPname(e.target.value)}
            fullWidth
          />
          <input
            margin="dense"
            id="image"
            accept='image/*'
            type="file"
            onChange = {(e)=>uploadImage(e.target.files[0])}
            fullWidth
          />
          <TextField
            margin="dense"
            id="Description"
            label="Description"
            type="description"
            value={pDescription}
            onChange = {(e)=>setPdescription(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="rating"
            label="Rating out of 5"
            type="number"
            // InputProps={{ inputProps: { min: 1, max: 5 } }}
            value={pRating}
            onChange = {(e)=>setPrating(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="price"
            label="Selling Price"
            type="number"
            value={pPrice}
            onChange = {(e)=>setPprice(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="seller"
            label="Seller"
            type="text"
            value={pSeller}
            onChange = {(e)=>setPseller(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="manufacturer"
            label="manufacturer"
            type="text"
            value={pManufacturer}
            onChange = {(e)=>setPmanufacturer(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="discount"
            label="Discount in % "
            type="number"
            value={pDiscount}
            onChange = {(e)=>setPdiscount(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}




export default Products;
