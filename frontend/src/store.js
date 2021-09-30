import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, 
    productDetailsReducer, 
    productDeleteReducer, 
    productCreateReducer, 
    productUpdateReducer, 
    productCategoryListReducer,
    productReviewReducer,
    productTopRatedReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer, 
    userListReducer,
    userDeleteReducer, 
    userUpdateReducer} from './reducers/userReducers'
import { orderCreateReducer, 
    orderDetailsReducer, 
    orderPayReducer, 
    orderListReducer, 
    ordersListReducer,
    orderDeliverReducer,
    orderMailReducer,
    ordersListExportReducer } from './reducers/orderReducers'

const reducer = combineReducers({
    productList : productListReducer,
    productCategoryList: productCategoryListReducer,
    productDetails : productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate:productUpdateReducer,
    productTopRated: productTopRatedReducer,
    productCreateReview : productReviewReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userList: userListReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userDelete: userDeleteReducer,
    userUpdate:userUpdateReducer,
    orderCreate : orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    ordersList: ordersListReducer,
    orderDeliver: orderDeliverReducer,
    orderMail: orderMailReducer,
    orderExports: ordersListExportReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems')?
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo')?
    JSON.parse(localStorage.getItem('userInfo')) : null

const deliveryAddressFromStorage = localStorage.getItem('deliveryAddress')?
    JSON.parse(localStorage.getItem('deliveryAddress')) : {}


const initialState = {
    cart: { cartItems : cartItemsFromStorage, deliveryAddress: deliveryAddressFromStorage },
    userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk] 

const store = createStore(reducer, initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))


export default store