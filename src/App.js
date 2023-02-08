import './App.css';
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Navigation from './components/Navigation';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import Product from './components/Product/Product';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import Checkout from './components/Product/Checkout';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import ResetPassword from './components/Account/ResetPassword';
import Profile from './components/Account/Profile';
import Post from './components/Post/Post';
import PostDetail from './components/Post/PostDetail';
import Schedule from './components/Schedule/Schedule';

import Admin from './components/Admin/Page/Admin';
import AccountAdmin from './components/Admin/Page/Account';
import ManageAccount from './components/Admin/Edit Page/ManageAccount';
import ProductAdmin from './components/Admin/Page/Product';
import ManageProduct from './components/Admin/Edit Page/ManageProduct';
import PostAdmin from './components/Admin/Page/Post';
import ManagePost from './components/Admin/Edit Page/ManagePost';
import ScheduleAdmin from './components/Admin/Page/Schedule';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Protected from './context/Protected';

function App() {
  return (
    <div className="App">
      <Router>
        <Navigation />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />

          {/* Product */}
          <Route path="/product" element={<Product />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />

          {/* Account */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Post */}
          <Route path="/post" element={<Post />} />
          <Route path="/post/:id" element={<PostDetail />} />

          {/* Schedule */}
          <Route path="/schedule" element={<Schedule />} />

          {/* Admin */}
          <Route path="/admin" element={<Protected><Admin /></Protected>} />
          <Route path="/admin/account" element={<Protected><AccountAdmin /></Protected>} />
          <Route path="/admin/account/:id" element={<Protected><ManageAccount /></Protected>} />
          <Route path="/admin/product" element={<Protected><ProductAdmin /></Protected>} />
          <Route path="/admin/product/:id" element={<Protected><ManageProduct /></Protected>} />
          <Route path="/admin/post" element={<Protected><PostAdmin /></Protected>} />
          <Route path="/admin/post/:id" element={<Protected><ManagePost /></Protected>} />
          <Route path="/admin/schedule" element={<Protected><ScheduleAdmin /></Protected>} />

          {/* 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
        <MessengerCustomerChat
          pageId="100089784416683"
          appId="1527757557709055"
        />
      </Router>
    </div>
  );
}

export default App;
