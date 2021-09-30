import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import ProductCarousel from '../components/ProductCarousel'
import { listProducts } from "../actions/productActions";

function HomeScreen({history}) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  let keyword = history.location.search

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

 
  let latestPro = {}
  return (
    <div> 
      {!keyword && <ProductCarousel/>  }
      {!keyword && <h1>Latest Products </h1>  }
      
      {loading ? (
        <Loader />
      ) : error ? (
        
        <body>
          <Message variant='danger'> {error} </Message>
          <div id="error">
            <div id="box"></div>
            <h3>ERROR 500</h3>
            <p>
              Things are a little <span>unstable</span> here
            </p>
            <p>I suggest come back later</p>
          </div>
        </body>
      ) : (
        <Row>
          
          {products.slice(products.length - 8 , products.length).map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
