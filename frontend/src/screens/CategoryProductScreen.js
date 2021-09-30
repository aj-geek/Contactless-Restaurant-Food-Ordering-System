import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { categoryProducts } from "../actions/productActions";

function CategoryProductScreen({location}) {
    const dispatch = useDispatch();
    const cat = location.search ? location.search.split("=")[1] : ' ';
    const productCategoryList = useSelector((state) => state.productCategoryList);
    const { error: errorCategory, loading: loadCategory, catproducts  } = productCategoryList;
    
    useEffect(() => {
        dispatch(categoryProducts(cat));
    }, [dispatch]);
    
    return (
        <div>
          <Link to="/menu" className="btn btn-light my-4">
             Go Back
          </Link>
          <h1>{cat} Items </h1>
            
          { loadCategory ? (
            <Loader />
          ) : errorCategory? (
            <Message variant="danger"> {errorCategory} </Message>
          ) : (
            <Row>
              {catproducts.map((product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      );
    
}

export default CategoryProductScreen
