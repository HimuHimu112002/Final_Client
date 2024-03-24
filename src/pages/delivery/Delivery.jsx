import React, { useEffect, useState } from 'react'
import MasterLayout from '../../components/MasterLayout'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Delivery = () => {
  let navigate = useNavigate();
    let [foodItemname, setFoodIteme] = useState([])
    useEffect(()=>{
        const headers = {
            'user_id': localStorage.getItem('id'),
            'Content-Type': 'application/json',
          };
        async function allproduct(){
        let data = await axios.get("http://localhost:5000/api/v1/InvoiceList",{headers})
        setFoodIteme(data.data.data)
        }
        allproduct()
    },[])
    let handleInvoicedetails=(id)=>{
      navigate(`/invoiceproduct/${id}`)
    }
  return (
    <MasterLayout>
      <Container>
          <Row>
              <Col className='mb-3' md='12'>
                      <h3 className='text-center my-4'>Invoice List</h3>
                      {foodItemname.map((item, i)=>(
                          <>
                          <ListGroup className='mb-2'>
                            <ListGroup.Item>Invoice Number : {item.tran_id}</ListGroup.Item>
                            <ListGroup.Item>Customer : {item.cus_details}</ListGroup.Item>
                            <ListGroup.Item>Shipping : {item.ship_details}</ListGroup.Item>
                            <ListGroup.Item>Payment : {item.payment_status}</ListGroup.Item>
                            <ListGroup.Item>Delivery : {item.delivery_status}</ListGroup.Item>
                            <ListGroup.Item>Price : {item.total}</ListGroup.Item>
                            <ListGroup.Item>Vat(5%) : {item.vat}</ListGroup.Item>
                            <ListGroup.Item>After Vat Payable Total : {item.payable}</ListGroup.Item>
                            <Button onClick={()=>handleInvoicedetails(item._id)} className='btn btn-success'>Details</Button>
                          </ListGroup>
                          </>
                      ))}
                  <div>
                  </div>
              </Col>
          </Row>
      </Container>
    </MasterLayout>
  )
}

export default Delivery