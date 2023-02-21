import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth0 } from "@auth0/auth0-react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";
//
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import {getTotals} from "../../src/context/CartSlice";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';


export default function Navigation() {
  const { loginWithRedirect } = useAuth0();
  const { logout } = useAuth0();
    //
    const { user, isAuthenticated, isLoading } = useAuth0();
    console.log(user);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

  //
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const handleGetTotals = () => {
    dispatch(getTotals())
  }

  useEffect(() => {
    handleGetTotals();
  }, [cart])

  return (
    <div className="Naviagation">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ color: "black", backgroundColor: "transparent", font: "manrope", fontWeight: "bold" }}>
          <Toolbar>

            {/* Logo */}
            <Link to="/">
              <img
                src="assets/images/logo.png"
                alt="logo"
                width="50"
                height="50"
              />
            </Link>
            {/* Logo */}

            {/* Home, Product, Post, Schedule */}
            <Link to="/" style={{textDecoration: "none"}}>
              <div style={{margin: "26px 4px 2px 1px", fontSize: "20px", color: "black"}}>Bird Care Consulting</div>
            </Link>

            <Link to="/" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Trang Chủ</div>
            </Link>

            <Link to="/san-pham" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Sản Phẩm</div>
            </Link>

            <Link to="/dich-vu" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Dịch Vụ Chim</div>
            </Link>

            <Link to="/bai-viet" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Thư Viện Chim</div>
            </Link>

            <Link to="/lien-he" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Liên Hệ</div>
            </Link>
            {/* Home, Product, Service, Post */}

            {/* random space */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {/* random space */}

            {/* Cart */}
            <div style={{ margin: "10px 15px -4px 15px" }}>
              <Link to="/gio-hang" style={{ textDecoration: "none" }} className= "NavItem">
                <ShoppingCartIcon sx={{ my: 2, color: "black", display: "block",  "&:hover": { color: "blue"}}} />
                <span className="quantity">{cart.cartTotalQuantity}</span>
              </Link>
            </div>
            {/* Cart */}
              
            {/* Account */}
            {/* <div style={{margin: "10px 1px -4px 15px"}}>
              <Link to="" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "black", font: "manrope", fontWeight: "bold", display: "block" }} onClick={() => loginWithRedirect()}>
                  Đăng Nhập
                </Button>
                <Button sx={{ my: 2, color: "black", font: "manrope", fontWeight: "bold", display: "block" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Đăng Xuất
                </Button>
              </Link>
            </div> */}
            {/* Account */}
            {/* //Login */}
            {user?.name && user?.email ? (
              <div>
                <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.picture} src={user.picture} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/don-hang" style={{ textDecoration: "none" }}>
                        Đơn Hàng
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                      Đăng Xuất
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
              ) : (
              <Link to="" style={{ textDecoration: "none" }}>
                <Button onClick={() => loginWithRedirect()}>
                  <div className="NavItem">
                    Đăng Nhập
                  </div>
                </Button>
              </Link>
            )}
            {/* //Login */}

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}