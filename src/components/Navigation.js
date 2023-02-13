import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";


export default function Navigation() {

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

            <Link to="/" style={{textDecoration: "none"}}>
              <div style={{margin: "23px 2px 9px 60px", color: "black"}}>Trang Chủ</div>
            </Link>

            <Link to="/san-pham" style={{textDecoration: "none"}}>
              <div style={{margin: "23px 2px 9px 60px", color: "black"}}>Sản Phẩm</div>
            </Link>

            <Link to="/dich-vu" style={{textDecoration: "none"}}>
              <div style={{margin: "23px 2px 9px 60px", color: "black"}}>Dịch Vụ Chim</div>
            </Link>

            <Link to="/bai-viet" style={{textDecoration: "none"}}>
              <div style={{margin: "23px 2px 9px 60px", color: "black"}}>Thư Viện Chim</div>
            </Link>

            <Link to="/lien-he" style={{textDecoration: "none"}}>
              <div style={{margin: "23px 2px 9px 60px", color: "black"}}>Liên Hệ</div>
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
            <div style={{ margin: "10px 1px -4px 15px" }}>
              <Link to="/gio-hang" style={{ textDecoration: "none" }}>
                <ShoppingCartIcon sx={{ my: 2, color: "black", display: "block" }} />
              </Link>
            </div>
            {/* Cart */}
              
            {/* Account */}
            <div style={{margin: "10px 1px -4px 15px"}}>
              <Link to="/dang-nhap" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "black", font: "manrope", fontWeight: "bold", display: "block" }}>
                  Đăng Nhập
                </Button>
              </Link>
            </div>
            {/* Account */}

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}