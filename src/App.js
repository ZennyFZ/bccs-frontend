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
import Login from './components/Account_v2/Login';
import Register from './components/Account_v2/Register';
import ForgetPassword from './components/Account_v2/ForgetPassword';
import Profile from './components/Account/Profile';
import Post_AllPost from './components/Post/Post_AllPost';
import PostDetail from './components/Post/PostDetail';
import Main_Order from './components/Order/Main_Order';
import OrderDetail from './components/Order/OrderDetail';

//admin
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
import ServiceDetail from './components/Service/ServiceDetail';
import Booking from './components/Service/Booking';
import Main_Booking from './components/Order/Main_Booking';
import BookingOrderDetail from './components/Order/BookingOrderDetail';
import { ToastContainer } from 'react-toastify';
import Homepage_Product from './components/Homepage/Homepage_Product';

import AppRouter from './components/Account_v2/AppRoutes';
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
        <Routes >
          {/* Homepage */}
          <Route path="/" element={<Main />} />
          <Route path="/lien-he" element={<About />} />
          <Route path="/lien-he" element={<About />} />
          <Route path="/test" element={<AppRouter />} />

          {/* Product */}
          <Route path="/san-pham" element={<Main_product />} />
          <Route path="/san-pham/chi-tiet-san-pham/:id" element={<ProductDetail />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/thanh-toan" element={<Checkout />} />

          {/* Order */}
          <Route path="/don-hang" element={<Main_Order />} />
          <Route path="/don-hang/:id" element={<OrderDetail />} />

          {/* Account */}
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/khoi-phuc-tai-khoan" element={<ForgetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Post */}
          <Route path="/bai-viet" element={<Post_AllPost />} />
          <Route path="/bai-viet/:id" element={<PostDetail />} />

          {/* Schedule */}
          <Route path="/dich-vu" element={<Main_service />} />
          <Route path="/dich-vu/:id" element={<ServiceDetail />} />
          <Route path="/at-lich" element={<Booking />} />
          <Route path="/lich-hen" element={<Main_Booking />} />
          <Route path="/lich-hen/:id" element={<BookingOrderDetail />} />

          {/* Admin */}
          
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/quan-ly-tai-khoan" element={<AccountAdmin />} />
            <Route path="/admin/quan-ly-tai-khoan/:id" element={<ManageAccount />}/>
            <Route path="/admin/quan-ly-san-pham" element={<ProductAdmin />} />
            <Route path="/admin/quan-ly-san-pham/:id" element={<ManageProduct />} />
            <Route path="/admin/quan-ly-bai-viet" element={<PostAdmin />} />
            <Route path="/admin/quan-ly-bai-viet/:id" element={<ManagePost />} />
            <Route path="/admin/dich-vu" element={<ScheduleAdmin />} />
            
          

          {/* 404 */}
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
