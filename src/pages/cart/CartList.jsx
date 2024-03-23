import React, { useEffect, useState } from 'react'
import MasterLayout from '../../components/MasterLayout'
import axios from 'axios'
import { Button, Card, Col, Container, ListGroup, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { MdDelete } from "react-icons/md";

const CartList = () => {
  let result = useSelector((state)=> state.userLoginInfo.userInfo)
  let navigate = useNavigate()

  useEffect(()=> {
    if(!result){
      navigate("/login")
    }
  },[])

  let [cartItemname, setCartIteme] = useState([])
  let [CartTotal, setCartTotal] = useState("")
  let [CartVatTotal, setCartVatTotal] = useState("")
  let [CartPayableTotal, setCartPayableTotal] = useState("")

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/getcartlist")
      setCartIteme(data.data)
      let total=0
      let vat=0
      let payable=0
      data.data.forEach((item,i)=>{
        if(result.user_id._id === item.userID){
          total = total + parseInt(item.qty) * parseInt(item.price)
          vat = parseInt(total * 0.05);
          payable = vat+total
          setCartTotal(total)
          setCartVatTotal(vat)
          setCartPayableTotal(payable)
        }
    
      })

    }
    allproduct()
  },[cartItemname])

  let handlecartremove =(id)=>{
    console.log(id);
    const headers = {
      'user_id': result.user_id._id,
      'Content-Type': 'application/json',
    };
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
        axios.post(`http://localhost:5000/api/v1/removecartlist`,{_id:id},{headers})
        toast.success("Cart Remove Success")
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
        <Row className='mt-5'>
          <Col md="12" className='m-auto'>
            <h1 className='text-center'>Buy Now Your Favourite Product</h1>
            <Table className='shadow-sm' responsive="sm">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>price</th>
                    <th>Qty</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                {cartItemname.map((item, i)=>(
                  (result.user_id._id === item.userID &&
                  <>
                    <tr key={i}>
                      <td><Card.Img className='dashboard__img' variant="top" src={`http://localhost:5000/images/${item.image}`}/></td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>{item.category}</td>
                      <td>{item.price}</td>
                      <td>{item.qty}</td>
                      <td><div className='d-flex'><p onClick={()=>handlecartremove(item._id)} className='text-bg-danger px-2 rounded dashboard__delete--item'><MdDelete /></p></div></td>
                    </tr>
                  </>)
                ))}
                </tbody>
            </Table>
          </Col>
          <Col md="12">
            <ListGroup className='my-5 shadow-sm'>
              <ListGroup.Item>Total: - {CartTotal}</ListGroup.Item>
              <ListGroup.Item>Vat(5%): - {CartVatTotal}</ListGroup.Item>
              <ListGroup.Item>Payable: - {CartPayableTotal}</ListGroup.Item>
              <Button className='mt-2' variant="success">Check Out</Button>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </MasterLayout>
  )
}

export default CartList