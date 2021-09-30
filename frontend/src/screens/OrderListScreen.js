import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listAllOrders, exportList } from "../actions/orderActions";
import { CSVDownload, CSVLink } from "react-csv";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const ordersList = useSelector((state) => state.ordersList);
  const { loading, error, orders } = ordersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderExports = useSelector((state) => state.orderExports);
  const {
    loading: loadingExport,
    error: errorExport,
    success: successExport,
    orderExport,
  } = orderExports;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listAllOrders());
    } else {
      history.push("/login");
    }

    
  }, [dispatch, history, userInfo]);

  const ExportData = () => {
    dispatch(exportList());
  };

  return (
    <div>
      <h1>Orders</h1>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>Total</th>
              <th>PAID</th>
              <th>Served</th>
              <th>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => ExportData()}
                >
                  ExportOrders
                </Button>
                {loadingExport ? (<Loader/>):
                errorExport ? <Message variant="danger"> {errorExport}</Message> :
                successExport ? (
                  <CSVLink
                    data={orderExport}
                    filename={"orders.csv"}
                    className="btn-sm"
                    target="_blank"
                  >
                    Download
                  </CSVLink>
                ) : (
                  errorExport
                )}
              </th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>&#8377;{order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <span style={{ color: "red" }}>Not Paid</span>
                  )}
                </td>

                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <span style={{ color: "blue" }}>Preparing...</span>
                  )}
                </td>

                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant="info" className="btn-sm">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
