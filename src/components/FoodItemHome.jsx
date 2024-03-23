import { useEffect, useState } from 'react'
import {Card, Col, Container, Row} from 'react-bootstrap'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';

const FoodItemHome = () => {
  let navigate = useNavigate();
  let [foodItemname, setFoodIteme] = useState([])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/foodget")
      setFoodIteme(data.data.data)
    }
    allproduct()
  },[])

  let handleDetails = (id) =>{
    navigate(`/detail/${id}`)
  }
  
return (
    <Container>
      <Row>
        {foodItemname.map((item,i)=>(
          <Col key={i} className='my-4' md={4}>
            <Card className='shadow-sm' style={{ width: 'auto' }}>
              <Card.Img variant="top" src={`http://localhost:5000/images/${item.img}`}/>
              <Card.Body>
                <Card.Title>Product: - {item.name}</Card.Title>
                <h5>Price: - {item.price}</h5>
                <p className='text-danger food__detail--button' onClick={()=>handleDetails(item._id)}>See more...........</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
export default FoodItemHome