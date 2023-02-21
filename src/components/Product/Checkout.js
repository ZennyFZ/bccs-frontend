import { Grid, Paper, Box } from "@mui/material";
import { TextField } from "@material-ui/core";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button } from "react-materialize";
import Select from '@mui/material/Select';
import React from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
export default function Checkout() {
    const [Typepayment, setTypePayment] = React.useState('');
    // const {isAuthenticated} = useAuth0();
    // const checkUser = () => {
    //     if (isAuthenticated==false) {
    //         window.location.href = "http://localhost:3000/";
    //     }
    // }

    // useEffect(() => {
    //     checkUser();
    // }, [])
    // Đang cải thiện, không được uncomment

    const handleChange = (event) => {
      setTypePayment(event.target.value);
    };
    return (
        <Grid >
            <Paper elevation={10} style={{
                padding: "20",
                height: "65vh",
                width: "500px",
                margin: "20px auto"
            }}>
                <Grid style={{ textAlign: "center", fontSize: "30px",fontWeight:"5px" }}>
                    Thông Tin Giao Hàng
                </Grid>
                <Box component="form" style={{ marginLeft: "10px", marginRight: "10px" }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nhập họ và tên"
                        placeholder="Họ và tên người nhận"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nhập số điện thoại"
                        placeholder="Số điện thoại"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        label="Nhập địa chỉ giao hàng"
                        placeholder="Địa chỉ"
                    />
                </Box>
                <Box>
                    <FormControl variant="standard" sx={{ m: 1}} style={{width:"95%", marginLeft: "10px"}}>
                        <InputLabel >Phương thức thanh toán</InputLabel>
                        <Select
                            value={Typepayment}
                            onChange={handleChange}
                            label="Phương Thức thanh toán"
                        >
                            <MenuItem value={"offline"}>Thanh toán tiền mặt</MenuItem>
                            <MenuItem value={"online"}>Thanh toán online</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box style={{textAlign:"center"}}>
                <Button  style={{marginTop:"40px"}}>Hoàn tất thanh toán</Button>
                 </Box>
            </Paper>
        </Grid>
    )
}