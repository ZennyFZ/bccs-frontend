import { toast } from "react-toastify";

function Showmessage(){
    toast.success("Đã thêm sản phẩm vào giỏ hàng", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}