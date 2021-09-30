import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listUsers, deleteUser, logout } from "../actions/userActions";

function UserListScreen({history}) {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const {  userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {  success : successDelete } = userDelete;

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(listUsers())
    }else{
      history.push('/')
    }
    dispatch(listUsers());
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete?'))
      dispatch(deleteUser(id))
  }

  return (
    <div>
      <h1>USERS</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Table  striped  responsive className='table-sm'>
            <thead>
                <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
                </tr>
            </thead>

            <tbody>
                {users.map(user => (
                    <tr key={user._id}>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? (
                            <i className='fas fa-user-shield' 
                            style={{color: 'green'}}></i>
                        ) : (<i className='fas fa-user-lock' 
                        style={{color: 'red'}}></i>)}</td>

                        <td>
                            <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                <Button variant='info' className='btn-sm'>
                                    <i className='fas fa-user-edit'
                                    style={{color: 'blue'}}
                                    />
                                </Button>
                            </LinkContainer>

                            <Button variant='danger' className='btn-sm'
                                onClick={(e) => deleteHandler(user._id)}
                            >
                                    <i className='fas fa-user-minus'/>
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
      )}
    </div>
  );
}

export default UserListScreen;
