import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from './screens/HomeScreen'
import MenuScreen from './screens/MenuScreen'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import ProductListScreen from "./screens/ProductListScreen";
import EditUserScreen from "./screens/UserEditScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from './screens/OrderListScreen'
import CategoryProductScreen from './screens/CategoryProductScreen'


function App() {
  return (
    
    <Router>
      <Header />
      <main className="py-4"> 
        <Container>
          <Route path='/' component={HomeScreen} exact />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/menu' component={MenuScreen}  />
          <Route path='/category/:category' component={CategoryProductScreen}  />
          <Route path='/product/:id' component={ProductScreen}  />
          <Route path='/cart/:id?' component={CartScreen}  /> 
          <Route path='/admin/checkusers' component={UserListScreen}  /> 
          <Route path='/admin/user/:id/edit' component={EditUserScreen}  /> 
          <Route path='/admin/product/:id/edit' component={ProductEditScreen}  /> 
          <Route path='/admin/productlist' component={ProductListScreen}  /> 
          <Route path='/admin/orderlist' component={OrderListScreen}  /> 
          
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
