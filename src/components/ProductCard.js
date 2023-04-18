import { AddShoppingCartOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, handleAddToCart }) => {

  const { name, category, cost, rating, image, _id } = product;
  return (
    <Card className="card">
      <CardMedia
        className="card-media"
        component="img"
        image={image}
        title={name}
        alt={_id}
        sx={{ height: 140 }
    }
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {name}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {category}
        </Typography> */}
        <Typography variant="h6" color="text.primary" component="div">
          ${cost}
        </Typography>
        <Rating
          name="product-rating"
          value={rating}
          precision={0.5}
          readOnly
        />
         </CardContent>
      <CardActions className="card-actions card-button" >
        <Button variant="contained" 
          // variant="outlined"
          fullWidth
          startIcon={<AddShoppingCartOutlined />}
          onClick={() => handleAddToCart(_id)}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
