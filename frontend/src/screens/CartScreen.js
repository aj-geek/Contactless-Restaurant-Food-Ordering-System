import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Cart,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { productDetailsReducer } from "../reducers/productReducers";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? location.search.split("=")[1] : 1;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  let check = 0
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkouthandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    
    <Row>
      <Col md={8} >
      <CheckoutSteps step1  />
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush" >
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>

                 <Row>
                  <Col md={2} >
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} >
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2} >&#8377;{item.price}</Col>

                  <Col md={3} >
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1} >
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
            {cartItems.length === 0 ? (
              <span> Grab Some Items </span>
            ):(
              <div>
              <h2>
                SubTotal :
                
                
                    {check = cartItems.reduce((acc, item) => acc + Number(item.qty), 0) } 
                    {check > 1 ? ' items' : ' item'} </h2><br></br>
                
             
              &#8377;{cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
              </div>
              )
              }
            </ListGroup.Item>
          </ListGroup>

          <ListGroup>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkouthandler}
            >
              CHECKOUT
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
