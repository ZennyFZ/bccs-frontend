import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Container,Row,Col,Card,Button } from 'react-materialize'
export default function ProductDetail() {
    const Productid = useParams();
    const [productlist, setProductList] = useState([])
    console.log(Productid);

    function getData() {
        axios.get(`${Config.API_URL}/Product/` + Productid.id)
            .then(response => response.data)
            .then((data) => {
              setProductList(data)
            });
        console.log(productlist);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
      <div>
      <Container>
          <br/>
          <Row >
              <Col s={12} m={6} l={4}  >
                  <Card>
                      <div className='Product-info'>
                      <img src={productlist.Image} />
                      
                      <div className='Product-item-detail'>
                      <strong className='ProductName'>{productlist.ProductName}</strong>
                      <div className='Product-item-price'>
                          <div className='Price-money'>
                              <span className='label'>Price</span>
                              <span className='Price'>{productlist.Price} VNĐ</span>
                          </div>
                      </div>
                      <p className='placeholder'></p>
                      </div>
                      </div>
                  </Card>
              </Col>
          </Row>
      </Container>
  </div>

    );
}