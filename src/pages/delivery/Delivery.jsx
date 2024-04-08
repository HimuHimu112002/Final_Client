import React, { useEffect, useState } from 'react'
import MasterLayout from '../../components/MasterLayout'
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import {toast } from 'react-toastify';

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

     // delete food items
     let handleInvoicedelete = async (id) =>{
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
      }).then((result)=> {
      if (result.isConfirmed) {
      axios.post(`http://localhost:5000/api/v1/invoiceDelete`,
      {
        id: id,
      })
      toast.success('Invoice Delete Success')
      Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
      });
      }
      });

  }

  return (
    <MasterLayout>
      <Container>
          <Row>
              <Col className='mb-3' md='12'>
                      <h3 className='text-center my-4'>Invoice List</h3>
                      {foodItemname.map((item, i)=>(
                          <>
                          <ListGroup key={i} className='mb-4 shadow-sm'>
                            <ListGroup.Item>Invoice Number : {item.tran_id}</ListGroup.Item>
                            <ListGroup.Item>Customer : {item.cus_details}</ListGroup.Item>
                            <ListGroup.Item>Shipping : {item.ship_details}</ListGroup.Item>
                            {item.payment_status === "success"
                            ?
                            <ListGroup.Item className='d-flex'>Payment : <p className='statusColor'> {item.payment_status}</p></ListGroup.Item>
                            :
                            item.payment_status === "pending"
                            ?
                            <ListGroup.Item className='d-flex'>Payment : <p className='statusPendigColor'> {item.payment_status}</p></ListGroup.Item>
                            :
                            item.payment_status === "fail"
                            &&
                            <ListGroup.Item className='d-flex'>Payment : <p className='statusFailColor'> {item.payment_status}</p></ListGroup.Item>
                            }
                              <ListGroup.Item className='bg-ingo'>Delivery : {item.delivery_status}</ListGroup.Item>
                              <ListGroup.Item>Price : {item.total}</ListGroup.Item>
                              <ListGroup.Item>Vat(5%) : {item.vat}</ListGroup.Item>
                              <ListGroup.Item>After Vat Payable Total : {item.payable}</ListGroup.Item>
                              <div className='bg-white'>
                                <Button onClick={()=>handleInvoicedetails(item._id)} className='btn btn-success'>Details</Button>
                                <Button onClick={()=>handleInvoicedelete(item._id)} className='btn btn-danger ms-4'>Delete</Button>
                              </div>
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