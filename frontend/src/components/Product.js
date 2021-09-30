import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-4 p-4 rounded" id='card'>
      <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image}  height='150px' width='200px' fluid />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <strong variant='primary'>
              <b>{product.category}</b> </strong>
          </div>
        </Card.Text>

        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>

        <Card.Text as="h3">&#8377;{product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
