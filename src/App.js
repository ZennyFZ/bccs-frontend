import './App.css';
import "react-toastify/dist/ReactToastify.css"
import Navigation from './components/Navigation';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import { Main_product } from './components/Product/Main_product';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import Checkout from './components/Product/Checkout';
import Login from './components/Account/Login';
import Register from './components/Account/Register';
import ResetPassword from './components/Account/ResetPassword';
import Profile from './components/Account/Profile';
import Post_AllPost from './components/Post/Post_AllPost';
import PostDetail from './components/Post/PostDetail';
import Service from './components/Service/Service';
import ServiceDetail from './components/Service/ServiceDetail';
import Booking from './components/Service/Booking';
import Order from './components/Order/Order';
import Main_Order from './components/Order/Main_Order';
import OrderDetail from './components/Order/OrderDetail';
import Success from './components/Product/Success';

import Admin from './components/Admin/Page/Admin';
import AccountAdmin from './components/Admin/Page/Account';
import ManageAccount from './components/Admin/Edit Page/ManageAccount';
import ProductAdmin from './components/Admin/Page/Product';
import ManageProduct from './components/Admin/Edit Page/ManageProduct';
import PostAdmin from './components/Admin/Page/Post';
import ManagePost from './components/Admin/Edit Page/ManagePost';
import ScheduleAdmin from './components/Admin/Page/Schedule';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Protected from './context/Protected';
import Main_service from './components/Service/Main_service';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Navigation />
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<Main />} />
          <Route path="/lien-he" element={<About />} />

          {/* Product */}
          <Route path="/san-pham" element={<Main_product />} />
          <Route path="/san-pham/chi-tiet-san-pham/:id" element={<ProductDetail />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/thanh-toan" element={<Checkout />} />
          <Route path="/trang-thai" element={<Success />} />

          {/* Order */}
          <Route path="/don-hang" element={<Main_Order />} />
          <Route path="/don-hang/:id" element={<OrderDetail />} />

          {/* Account */}
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/khoi-phuc-tai-khoan" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Post */}
          <Route path="/bai-viet" element={<Post_AllPost />} />
          <Route path="/bai-viet/:id" element={<PostDetail />} />

          {/* Schedule */}
          <Route path="/dich-vu" element={<Main_service />} />
          <Route path="/chi-tiet-dich-vu/:id" element={<ServiceDetail />} />
          <Route path="/booking" element={<Booking />} />

          {/* Admin */}
          <Route path="/admin" element={<Protected><Admin /></Protected>} />
          <Route path="/admin/quan-ly-tai-khoan" element={<Protected><AccountAdmin /></Protected>} />
          <Route path="/admin/quan-ly-tai-khoan/:id" element={<Protected><ManageAccount /></Protected>} />
          <Route path="/admin/quan-ly-san-pham" element={<Protected><ProductAdmin /></Protected>} />
          <Route path="/admin/quan-ly-san-pham/:id" element={<Protected><ManageProduct /></Protected>} />
          <Route path="/admin/quan-ly-bai-viet" element={<Protected><PostAdmin /></Protected>} />
          <Route path="/admin/quan-ly-bai-viet/:id" element={<Protected><ManagePost /></Protected>} />
          <Route path="/admin/dich-vu" element={<Protected><ScheduleAdmin /></Protected>} />

          {/* 404 */}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
