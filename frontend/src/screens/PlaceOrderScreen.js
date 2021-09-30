import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder, sendOrderMail } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function PlaceOrderScreen({ history }) {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;

  const orderMail = useSelector((state) => state.orderMail);
  const {  success: mailSuccess} = orderMail;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (success) {
      dispatch(sendOrderMail(order._id))
      history.push(`/order/${order._id}`);
      if(mailSuccess){
        dispatch({
        type:ORDER_CREATE_RESET
      })}
      
    }
  },
    [success, history]);

  cart.itemsPrice = cart.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);
  cart.extra = (cart.itemsPrice > 500 ? 0 : 29.99).toFixed(2);
  cart.taxPrice = Number(
    cart.itemsPrice > 7500 ? cart.itemsPrice * 0.18 : cart.itemsPrice * 0.05
  ).toFixed(2);
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.extra) +
    Number(cart.taxPrice)
  ).toFixed(2);

  if(!cart.paymentMethod){
      history.push('/payment')
  }

  const placeOrder = () => {
   
    dispatch(
    createOrder({
        orderItems: cart.cartItems,
        deliveryAddress: cart.deliveryAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        extra: cart.extra,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
    
  };


  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Details</h2>
              <p>
                <strong>Address : </strong>
                {cart.deliveryAddress.address}
                <br />
                <strong>Phone number: </strong>
                {cart.deliveryAddress.phone}
                <br />
                <strong>Instructions: </strong>
                {cart.deliveryAddress.instruction}
                <br />
                <strong>Order Mode : </strong>
                {cart.deliveryAddress.orderMode}
                <br />
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method : </strong>
                {cart.paymentMethod}
                <br />
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={6} sm={1}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>

                        <Col md={6} sm={2}>
                          <strong>
                            <b>
                              Qty {item.qty} X &#8377;{item.price} = &#8377;
                              {(item.qty * item.price).toFixed(2)}
                            </b>
                          </strong>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Item : </Col>
                  <Col>&#8377;{cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Extra : </Col>
                  <Col>&#8377;{cart.extra}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax : </Col>
                  <Col>&#8377;{cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total : </Col>
                  <Col>&#8377;{cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant='danger'> { error } </Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems == 0}
                  onClick={placeOrder}
                >
                  
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default PlaceOrderScreen;
