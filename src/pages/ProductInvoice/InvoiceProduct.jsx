import React, { useEffect, useState } from 'react'
import MasterLayout from '../../components/MasterLayout'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'

const InvoiceProduct = () => {
    let params = useParams()
    let [foodItemname, setFoodIteme] = useState([])
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get(`http://localhost:5000/api/v1/InvoiceProductList/${params.id}`)
        setFoodIteme(data.data.data)
        console.log("pppp",data.data.data)
        }
        allproduct()
    },[])
  return (
    <MasterLayout>
    <Container>
        <Row>
            <Col className='mb-3' md='12'>
                    <h3 className='text-center my-4'>Invoice Product List</h3>
                    {foodItemname.map((item, i)=>(
                        <>
                        <ListGroup className='mb-2'>
                          <ListGroup.Item>Product Brand : {item.brand}</ListGroup.Item>
                          <ListGroup.Item>Product Category : {item.category}</ListGroup.Item>
                          <ListGroup.Item>Price : {item.price}</ListGroup.Item>
                          <ListGroup.Item>Qty : {item.qty}</ListGroup.Item>
                        </ListGroup>
                        </>
                    ))}
                    <Link to="/delivery"><Button className='btn btn-success'>Back to Invoice</Button></Link>
                <div>
                </div>
            </Col>
        </Row>
    </Container>
    </MasterLayout>
  )
}

export default InvoiceProduct