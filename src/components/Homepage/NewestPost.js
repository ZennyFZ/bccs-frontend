import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function NewestPost({Posts}) {
    return (
        <div style={{font: "marope"}}>
            <br/>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="introHeading">Các Bài Viết Mới Nhất</div>
            <Container>
                <br/>
                <Row >
                    {Posts.slice(Posts.length-3,Posts.length).map((post) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
                         <img style={{width: "300px", height: "200px"}} src={post.Image} />
                         <span style={{float: "left", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "15px"}}>
                            <span>
                                <PersonIcon/>
                            </span>
                            {post.Author}
                        </span>
                         <span style={{float: "right", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "15px"}}><AccessTimeIcon/> {post.Date}</span>
                         <Link to={`bai-viet/${post.PostID}`}>
                         <h3 className='ProductTitle'>{post.Title}</h3>
                         </Link>
                            <div>{post.Description}</div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
            <Link to={"/bai-viet"}>
                <p style={{textAlign: "center", marginTop: "10px", color: "black", fontSize: "15px"}}>Xem Thêm...</p>
            </Link>
        </div>
    )
}