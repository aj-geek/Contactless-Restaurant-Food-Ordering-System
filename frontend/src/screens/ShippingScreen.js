import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormLabel, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import { saveShippingDetails } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

function ShippingScreen({ history }) {
  const cart = useSelector((state) => state.cart);
  const { deliveryAddress } = cart;

  const dispatch = useDispatch();
  const [address, setAddress] = useState(deliveryAddress.address);
  const [phone, setPhone] = useState(deliveryAddress.phone);
  const [instruction, setInstruction] = useState(deliveryAddress.instruction);
  const [orderMode, setOrderMode] = useState();
  const [message, setMessage] = useState();

  const submitHandler = (e) => {
    e.preventDefault();
    setMessage("");
    if (phone !== "") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(phone)) {
        setMessage("Please enter only number.");
      } else if (phone.length != 10) {
        setMessage("Please enter valid phone number.");
      } else if(address.length < 15){
          setMessage('Please enter complete address')
      } 
      else {
        dispatch(
          saveShippingDetails({ address, phone, instruction, orderMode })
        );
        setMessage("");
        history.push("/payment");
      }
    }
  };

  return (
    <FormContainer>
        <CheckoutSteps step1  step2/>
      {message && <Message variant="danger">{message}</Message>}
      <h1>CHECK OUT</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as="legend">Select Order Mode</FormLabel>

          <Row>
            <Col>
              <Form.Check
                type="radio"
                required
                label="Take-away"
                id="take-away"
                name="orderMode"
                onChange={(e) => setOrderMode("take-away")}
              ></Form.Check>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Dine-In"
                id="dine-in"
                name="orderMode"
                onChange={(e) => setOrderMode("dine-in")}
              ></Form.Check>
            </Col>

            <Col>
              <Form.Check
                type="radio"
                label="Delivery"
                id="delivery"
                name="orderMode"
                onChange={(e) => setOrderMode("delivery")}
              ></Form.Check>
            </Col>
          </Row>
        </FormGroup>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter phone number"
            value={phone ? phone : ""}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="instruction">
          <Form.Label>Instruction</Form.Label>
          <Form.Control
            type="text"
            placeholder="Instruction If any.."
            value={instruction ? instruction : ""}
            onChange={(e) => setInstruction(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Proceed to Pay
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
