import { useEffect, useState } from 'react'
import {Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import MasterLayout from '../../components/MasterLayout'
import { Link, useParams } from 'react-router-dom'

const Details = () => {

    let params = useParams()
    let [foodItemname, setFoodIteme] = useState([])
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get(`http://localhost:5000/api/v1/foodDetail/${params.id}`)
        setFoodIteme(data.data.data)
        }
        allproduct()
    },[])
    
  return (
    <MasterLayout>
        <Container>
            <Row>
                {foodItemname.map((item,i)=>(
                    <Col key={i} className='my-4'>
                        <Card style={{ width: 'auto' }}>
                            <Card.Img variant="top" src={`http://localhost:5000/images/${item.img}`}/>
                            <Card.Body>
                            <Card.Title>Product: - {item.name}</Card.Title>
                            <h5>Brand: - {item.brand}</h5>
                            <h5>Category: - {item.category}</h5>
                            <h5>Price: - {item.price}</h5>
                            <h5>Food Description</h5>
                            <span>{item.discription}</span>
                            </Card.Body>
                            <Link to='/'><p className='ms-4'>Back to home</p></Link>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default Details