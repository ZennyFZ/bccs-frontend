import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
export default function NewestPost({Posts}) {
    return (
        <div style={{font: "marope"}}>
            <br/>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="introHeading">Các Bài Viết Mới Nhất</div>
            <Link to={"/bai-viet"}>
                <p style={{textAlign: "center", marginTop: "10px", color: "black", fontSize: "15px"}}>Xem Thêm...</p>
            </Link>
        </div>
    )
}