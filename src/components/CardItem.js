import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

export default function CardItem(props) {
    const [product, setProduct] = useState({})

    useEffect(()=>{
        setProduct(props.data);
    },[props.data])
    const classes = useStyles();

    return (
        <div>
        <Card className={classes.card}>
        <CardActionArea>

                <CardMedia
                className={classes.media}
                image={`${product.image}`}
                title="Product"
                />



        <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
        {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        {product.description}
        </Typography>
        </CardContent>
        </CardActionArea>
        <CardActions>
        <Typography variant="subtitle1">
        <b>Rating </b>: {product.rating}
        </Typography>
        <Typography variant="h6" center>
        Rs. {product.price}
        </Typography>

        <Link to={{
            pathname: '/productDetails',
            state: { product }
        }}>
        <Button size="small" color="primary">
        View Details
        </Button>
        </Link>

        </CardActions>
        </Card>
        <br/>
        </div>
        );
    }
