import React, { useEffect, useState } from 'react'
import MasterLayout from '../../components/MasterLayout'
import axios from 'axios'
import { Card, Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const WishListPage = () => {
  let data = useSelector((state)=> state.userLoginInfo.userInfo)
  let navigate = useNavigate()
  
  useEffect(()=> {
    if(!data){
      navigate("/login")
    }
  },[])

  let [foodItemname, setFoodIteme] = useState([])
  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/getwishlist")
      setFoodIteme(data.data)
    }
    allproduct()
  },[foodItemname])

  let handlewishremove =(id)=>{
    const headers = {
      'user_id': data.user_id._id,
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
        axios.post(`http://localhost:5000/api/v1/removewishlist`,{productID:id},{headers})
        toast.success("Wish List Remove Success")
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
          <Col md="10" className='m-auto'>
            <h1 className='text-center py-3'>Your Favourite Product</h1>
            <Table className='shadow-sm' responsive="sm">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                
                {foodItemname.map((item, i)=>(
                  (data.user_id._id === item.userID &&
                  <>
                    <tr key={i}>
                      <td><Card.Img className='dashboard__img' variant="top" src={`http://localhost:5000/images/${item.productID.img}`}/></td>
                      <td>{item.productID.name}</td>
                      <td>{item.productID.brand}</td>
                      <td>{item.productID.category}</td>
                      <td>{item.productID.price}</td>
                      <td><div className='d-flex'><p onClick={()=>handlewishremove(item.productID._id)} className='text-bg-danger px-2 rounded dashboard__delete--item'>remove</p></div></td>
                    </tr>
                  </>)
                ))}
                </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </MasterLayout>
  )
}

export default WishListPage