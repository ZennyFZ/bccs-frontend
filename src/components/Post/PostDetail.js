import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Container,Row,Col,Card,Button } from 'react-materialize'
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function PostDetail() {
    const Postid = useParams();
    const [post, setPost] = useState([])
    console.log(Postid);

    function getData() {
        axios.get(`${Config.API_URL}/Post/` + Postid.id)
            .then(response => response.data)
            .then((data) => {
                setPost(data)
            });
        console.log(post);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
      <div>
        <Container>
            <Row>
                <Col s={12} m={12} l={12}>
                    <Card>
                        <h5 style={{textAlign: "center", fontWeight: "bold"}}>{post.Title}</h5>
                        <div className="bottom-line2"></div>
                        <div style={{display: "flex", justifyContent: "center", alignContent: "center", fontSize: "15px"}}>
                            <div>
                                <PersonIcon/>
                            </div>
                            <p style={{marginRight: "10px"}}>{post.Author}</p>

                            <div>
                                <ClassIcon/>
                            </div>
                            <p style={{marginRight: "10px"}}>{post.BirdType}</p>

                            <div>
                                <AccessTimeIcon/>
                            </div>
                            <p>{post.Date}</p>
                        </div>
                        <div style={{display: "flex",justifyContent: "center",alignContent: "center", marginTop: "20px"}}>
                            <img style={{width: "600px", height: "500px"}} src={post.Image}/>
                        </div>
                        <div>{post.Description}</div>
                    </Card>
                </Col>
            </Row>
        </Container>
      </div>
    );
}