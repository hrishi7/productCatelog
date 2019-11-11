import React, { Component } from 'react'
import {Grid} from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import {ArrowBack} from '@material-ui/icons'
import {TextField,CircularProgress} from '@material-ui/core';

import proxy from '../proxy'

import axios from 'axios';

class ProductDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      product:{},
      loading:false,
      id:'',
      viewForm:false,
      name:'',
      description:'',
      rating:'',
      price:'',
      seller:'',
      manufacturer:'',
      discount:''
    }
  }
  componentDidMount = async () =>{
    this.setState({ loading: true})

    if(this.props.location.state.product){
      await this.setState({
        loading:false,
        product: this.props.location.state.product});
    }
  }
  ViewUpdateForm = async (id)=>{
    await this.setState({
      id:this.state.product._id,
      viewForm:true,
      name:this.state.product.name,
      description:this.state.product.description,
      rating:this.state.product.rating,
      price:this.state.product.price,
      seller:this.state.product.seller,
      manufacturer:this.state.product.manufacturer,
      discount:this.state.product.discount
    });
  }
  updateProduct =  async () =>{
    let product = {
      name:this.state.name,
      description:this.state.description,
      rating:this.state.rating,
      price:this.state.price,
      seller:this.state.seller,
      manufacturer:this.state.manufacturer,
      discount:this.state.discount,
    }
    this.setState({ loading: true})
    await axios.put(`${proxy}/api/v1/products/${this.state.id}`,product);
    await this.setState({
      id:'',
      viewForm:false,
      name:'',
      description:'',
      rating:'',
      price:'',
      seller:'',
      manufacturer:'',
      discount:'',
      loading:false
    })
    alert('Updated succesfully');
    window.location.href = '/';
  }

  handleDelete = async(id) =>{
    this.setState({ loading: true})
    await axios.delete(`${proxy}/api/v1/products/${id}`)
    this.setState({ loading: false})
    alert('Deleted succesfully');
    window.location.href = '/';
  }

  render() {
    return (
      <div>
          <AppBar position="static">
          <Toolbar>
            <IconButton edge="start"  color="inherit" aria-label="menu" onClick={()=>this.props.history.push('/')}>
              <ArrowBack/>
            </IconButton>
            {this.state.product ? (<Typography variant="h6" >
              {this.state.product.name}
            </Typography>):(<div></div>)}

          </Toolbar>
        </AppBar>

          <Grid container >

            <Grid xs={12}>
            <center>
              {this.state.product ? (
                <div>
                 <Typography variant="h6"> Manufactured By : {this.state.product.manufacturer} </Typography>
                 <Typography variant="h5"> Sell By : {this.state.product.seller} </Typography>
                 <Typography variant="h5"> Discount : {this.state.product.discount} % </Typography>
                 <Typography variant="h5"> Buy At: Rs. {+this.state.product.price - (( +this.state.product.discount * +this.state.product.price ) / 100)} </Typography>
                 <Button color="inherit" onClick={()=>this.handleDelete(this.state.product._id)}>Delete Product</Button>
                 <Button color="inherit" onClick={()=>this.ViewUpdateForm(this.state.product._id)}>Update Product</Button>
                 </div>
              ):(
                <Typography variant="h5"> Nodata </Typography>
              )}

              </center>
              {this.state.loading?<CircularProgress color="secondary" />:<div></div>}
            </Grid>
            {
              this.state.viewForm?(
                <div style={{marginLeft:'80px', marginRight:'80px'}}>
                  <center>
                  <TextField
            margin="dense"
            id="name"
            label="Product Name"
            type="text"
            value={this.state.name}
            onChange = {(e)=>this.setState({name:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="Description"
            label="Description"
            type="description"
            value={this.state.description}
            onChange = {(e)=>this.setState({description:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="rating"
            label="Rating out of 5"
            type="number"
            value={this.state.rating}
            onChange = {(e)=>this.setState({rating:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="price"
            label="Selling Price"
            type="number"
            value={this.state.price}
            onChange = {(e)=>this.setState({price:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="seller"
            label="Seller"
            type="text"
            value={this.state.seller}
            onChange = {(e)=>this.setState({seller:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="manufacturer"
            label="manufacturer"
            type="text"
            value={this.state.manufacturer}
            onChange = {(e)=>this.setState({manufacturer:e.target.value})}
            fullWidth
          />
          <TextField
            margin="dense"
            id="discount"
            label="Discount in % "
            type="number"
            value={this.state.discount}
            onChange = {(e)=>this.setState({discount:e.target.value})}
            fullWidth
          />
          <button onClick={this.updateProduct}>UPDATE</button>
                  </center>
                </div>
              ):(<div></div>)
            }

          </Grid>
      </div>
    )
  }
}

export default ProductDetails
