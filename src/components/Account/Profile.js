import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
      >
        <Tab label="Thông Tin Tài Khoản" {...a11yProps(0)} />
        <Tab label="Thay Đổi Thông Tin Cá Nhân" {...a11yProps(1)} />
        <Tab label="Thay Đổi Mật Khẩu" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{marginBottm: "10px", backgroundColor: '#f5f5f5'}}>
        <div>
            <div className="introHeading">Thông Tin Tài Khoản</div>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="row">
                <div className="col-6" style={{width: '1300px'}}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Họ Tên</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Số Điện Thoại</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Địa Chỉ</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#f5f5f5'}}>
              <form>
                  <div>
                      <div className="introHeading">Thay Đổi Thông Tin Cá Nhân</div>
                      <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                      <div className="row">
                          <div className="col-6" style={{ width: '1300px' }}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Họ Tên</label>
                                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Email</label>
                                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Số Điện Thoại</label>
                                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Địa Chỉ</label>
                                  <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group" style={{textAlign: "center"}}>
                                  <button type="submit" className="btn btn-primary">Cập Nhật</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
      </TabPanel>
      <TabPanel value={value} index={2} style={{backgroundColor: '#f5f5f5'}}>
              <form>
                  <div>
                      <div className="introHeading">Thay Đổi Mật Khẩu </div>
                      <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                      <div className="row">
                          <div className="col-6" style={{ width: '1300px' }}>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Mật Khẩu Cũ</label>
                                  <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Mật Khẩu Mới</label>
                                  <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group">
                                  <label htmlFor="exampleInputEmail1">Nhập Lại Mật Khẩu Mới</label>
                                  <input type="password" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                              </div>
                              <div className="form-group" style={{ textAlign: "center" }}>
                                  <button type="submit" className="btn btn-primary">Cập Nhật</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
      </TabPanel>
    </Box>
  );
}