import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Col, FormLabel } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { FormGroup } from "react-bootstrap";
import { savePaymentMethod } from "../actions/cartActions";

function PaymentScreen({ history }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [paymentMethod, setPaymentMethod] = useState('paypal');
 
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3/>
      <Form onSubmit={submitHandler}>
        <FormGroup id='payment-opt'>
          <FormLabel as="legend">Select Method</FormLabel>
          <Col>
            <Form.Check
              type="radio"
              checked
              label="Paypal"
              id="paypal"
              name="paymentMethod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </FormGroup>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default PaymentScreen;
