import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BookingOrder(Bookings) {
  console.log(Bookings);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tất Cả Lịch Hẹn" {...a11yProps(0)} />
            <Tab label="Chờ Xác Nhận" {...a11yProps(1)} />
            <Tab label="Đã Xác Nhận" {...a11yProps(2)} />
            <Tab label="Hoàn Thành" {...a11yProps(3)} />
            <Tab label="Đã Hủy" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3>Thời Gian Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3>Địa Chỉ & Liên Hệ</h3>
                <h3>Ghi Chú</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  return (
                    <div className="cart-item2" key={booking.id}>
                      <div>{booking.id}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingdate}</h5>
                        </div>
                      </div>
                      <h5 className="cart-product-price">{booking.date}</h5>
                      <div className="cart-product-quantity">
                        <div className="count">{booking.price} VND</div>
                      </div>
                      <div>
                        <div>
                          <h5 style={{ fontSize: '20px' }}>Địa chỉ: {booking.address}</h5>
                          <h5 style={{ fontSize: '20px' }}>Số Điện Thoại: {booking.phone}</h5>
                          <h5 style={{ fontSize: '20px' }}>Email: {booking.email}</h5>
                        </div>
                      </div>
                      <div>
                        {booking.note}
                      </div>
                      <div>
                        {booking.paymentType}
                      </div>
                      <div className="cart-product-total-price">
                        {booking.status}
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.id}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3>Thời Gian Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3>Địa Chỉ & Liên Hệ</h3>
                <h3>Ghi Chú</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if (booking.status === "Chờ Xác Nhận") {
                    return (
                        <div className="cart-item2" key={booking.id}>
                        <div>{booking.id}</div>
                        <div>
                          <div>
                            <h5>{booking.bookingdate}</h5>
                          </div>
                        </div>
                        <h5 className="cart-product-price">{booking.date}</h5>
                        <div className="cart-product-quantity">
                          <div className="count">{booking.price} VND</div>
                        </div>
                        <div>
                          <div>
                            <h5 style={{ fontSize: '20px' }}>Địa chỉ: {booking.address}</h5>
                            <h5 style={{ fontSize: '20px' }}>Số Điện Thoại: {booking.phone}</h5>
                            <h5 style={{ fontSize: '20px' }}>Email: {booking.email}</h5>
                          </div>
                        </div>
                        <div>
                          {booking.note}
                        </div>
                        <div>
                          {booking.paymentType}
                        </div>
                        <div className="cart-product-total-price">
                          {booking.status}
                        </div>
                        <div>
                          <Link to={`/lich-hen/${booking.id}`}>
                            <Button>Chi Tiết</Button>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3>Thời Gian Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3>Địa Chỉ & Liên Hệ</h3>
                <h3>Ghi Chú</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if (booking.status === "Đã Xác Nhận") {
                    return (
                        <div className="cart-item2" key={booking.id}>
                        <div>{booking.id}</div>
                        <div>
                          <div>
                          <h5>{booking.bookingdate}</h5>
                          </div>
                        </div>
                        <h5 className="cart-product-price">{booking.date}</h5>
                        <div className="cart-product-quantity">
                          <div className="count">{booking.price} VND</div>
                        </div>
                        <div>
                          <div>
                            <h5 style={{ fontSize: '20px' }}>Địa chỉ: {booking.address}</h5>
                            <h5 style={{ fontSize: '20px' }}>Số Điện Thoại: {booking.phone}</h5>
                            <h5 style={{ fontSize: '20px' }}>Email: {booking.email}</h5>
                          </div>
                        </div>
                        <div>
                          {booking.note}
                        </div>
                        <div>
                          {booking.paymentType}
                        </div>
                        <div className="cart-product-total-price">
                          {booking.status}
                        </div>
                        <div>
                          <Link to={`/lich-hen/${booking.id}`}>
                            <Button>Chi Tiết</Button>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3>Thời Gian Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3>Địa Chỉ & Liên Hệ</h3>
                <h3>Ghi Chú</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if (booking.status === "Hoàn Thành") {
                    return (
                        <div className="cart-item2" key={booking.id}>
                        <div>{booking.id}</div>
                        <div>
                          <div>
                            <h5>{booking.bookingdate}</h5>
                          </div>
                        </div>
                        <h5 className="cart-product-price">{booking.date}</h5>
                        <div className="cart-product-quantity">
                          <div className="count">{booking.price} VND</div>
                        </div>
                        <div>
                          <div>
                            <h5 style={{ fontSize: '20px' }}>Địa chỉ: {booking.address}</h5>
                            <h5 style={{ fontSize: '20px' }}>Số Điện Thoại: {booking.phone}</h5>
                            <h5 style={{ fontSize: '20px' }}>Email: {booking.email}</h5>
                          </div>
                        </div>
                        <div>
                          {booking.note}
                        </div>
                        <div>
                          {booking.paymentType}
                        </div>
                        <div className="cart-product-total-price">
                          {booking.status}
                        </div>
                        <div>
                          <Link to={`/lich-hen/${booking.id}`}>
                            <Button>Chi Tiết</Button>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3>Thời Gian Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3>Địa Chỉ & Liên Hệ</h3>
                <h3>Ghi Chú</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if (booking.status === "Đã Hủy") {
                    return (
                        <div className="cart-item2" key={booking.id}>
                        <div>{booking.id}</div>
                        <div>
                          <div>
                            <h5>{booking.bookingdate}</h5>
                          </div>
                        </div>
                        <h5 className="cart-product-price">{booking.date}</h5>
                        <div className="cart-product-quantity">
                          <div className="count">{booking.price} VND</div>
                        </div>
                        <div>
                          <div>
                            <h5 style={{ fontSize: '20px' }}>Địa chỉ: {booking.address}</h5>
                            <h5 style={{ fontSize: '20px' }}>Số Điện Thoại: {booking.phone}</h5>
                            <h5 style={{ fontSize: '20px' }}>Email: {booking.email}</h5>
                          </div>
                        </div>
                        <div>
                          {booking.note}
                        </div>
                        <div>
                          {booking.paymentType}
                        </div>
                        <div className="cart-product-total-price">
                          {booking.status}
                        </div>
                        <div>
                          <Link to={`/lich-hen/${booking.id}`}>
                            <Button>Chi Tiết</Button>
                          </Link>
                        </div>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}