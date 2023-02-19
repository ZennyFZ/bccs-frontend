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

export default function Order(Orders) {
  console.log(Orders);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{textAlign: "center"}}>
          <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                  <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                      <Tab label="Tất Cả Đơn Hàng" {...a11yProps(0)} />
                      <Tab label="Chờ Thanh Toán" {...a11yProps(1)} />
                      <Tab label="Đang Vận Chuyển" {...a11yProps(2)} />
                      <Tab label="Hoàn Tất" {...a11yProps(3)} />
                      <Tab label="Đã Hủy" {...a11yProps(4)} />
                  </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                  <div className="cart-container2">
                      <div>
                          <div className="titles2">
                              <h3 className="product-title">Ngày Đặt</h3>
                              <h3 className="price">Số Lượng</h3>
                              <h3 className="Quantity">Giá</h3>
                              <h3 className="total">Trạng Thái</h3>
                              <h3>Thông Tin</h3>
                          </div>
                          <div className="cart-items">
                              {Orders.Orders?.map(order => {
                                  return (
                                      <div className="cart-item2" key={order.id}>
                                          <div>
                                              <div>
                                                  <h5>{order.OrderDate}</h5>
                                              </div>
                                          </div>
                                          <div className="cart-product-price">{order.ProductQuantity}</div>
                                          <div className="cart-product-quantity">
                                              <div className="count">{order.TotalPrice} VND</div>
                                          </div>
                                          <div className="cart-product-total-price">
                                            {order.Status}
                                          </div>
                                          <div>
                                            <Link to={`/don-hang/${order.id}`}>
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
                  
              </TabPanel>
              <TabPanel value={value} index={2}>
                  Item Three
              </TabPanel>
              <TabPanel value={value} index={3}>
                  Item Four
              </TabPanel>
              <TabPanel value={value} index={4}>
                  Item Five
              </TabPanel>
          </Box>
    </div>
  );
}