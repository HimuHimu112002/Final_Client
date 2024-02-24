import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MasterLayout from '../../components/MasterLayout';

const Fupdate = () => {
    let navigate = useNavigate()
    let params = useParams()
    let [brandname, setBrandName] = useState([])
    let [categoryname, setCategoryName] = useState([])
    let [foodName, setFoodName] = useState("")
    let [foodprice, setFoodPrice] = useState("")
    let [foodbrand, setFoodbrand] = useState("")
    let [foodcate, setFoodcate] = useState("")
    let [fooddes, setFooddes] = useState("")

    // Read brand value
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get("http://localhost:5000/api/v1/brandget")
          setBrandName(data.data.data)
        }
        allproduct()
    },[])

    // read category value
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get("http://localhost:5000/api/v1/categoryget")
          setCategoryName(data.data.data)
        }
        allproduct()
    },[])

    let handleFoodName = (e)=>{
        setFoodName(e.target.value)
    }
    let handleFoodPrice = (e)=>{
        setFoodPrice(e.target.value)
    }
    let handleFoodbrand = (e)=>{
        setFoodbrand(e.target.value)
    }
    let handleFoodcate = (e)=>{
        setFoodcate(e.target.value)
    }
    let handleFooddes = (e)=>{
        setFooddes(e.target.value)
    }

    let handleFoodUpdate = async ()=>{
        let res = await axios.post(`http://localhost:5000/api/v1/updateFood/${params.id}`,
        {
            name: foodName,
            brand: foodbrand,
            category: foodcate,
            discription: fooddes,
            price: foodprice,

        })
        if(res.data['status'] === "success"){
            toast.success("Food Item Update")
            setTimeout(() => {
                navigate("/product")
            }, 2000);
        } 
    }
    
  return (
    <MasterLayout>
    <Container>
        <Row>
            <h1 className='my-4 text-center'>Update Food Items!</h1>
            <Col className='mt-5 mb-3'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Food Name</Form.Label>
                        <Form.Control onChange={handleFoodName} type="text" placeholder="Apple" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Food Price</Form.Label>
                        <Form.Control onChange={handleFoodPrice} type="text" placeholder="Price" />
                    </Form.Group>

                    <Form.Label>Select Brand Name</Form.Label>
                    <Form.Select onChange={handleFoodbrand} className="mb-3" aria-label="Default select example">
                        <option>Open this select menu</option>
                        {brandname.map((item, i)=>(
                            <option key={i}>{item.brand}</option>
                        ))}
                    </Form.Select>

                    <Form.Label>Select Category Name</Form.Label>
                    <Form.Select onChange={handleFoodcate} className="mb-3" aria-label="Default select example">
                        <option>Open this select menu</option>
                        {categoryname.map((item, i)=>(
                            <option key={i}>{item.category}</option>
                        ))}
                    </Form.Select>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Food Description</Form.Label>
                        <Form.Control onChange={handleFooddes} as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                <Button onClick={handleFoodUpdate} variant="primary">Update Food</Button>
                <Link className='mx-3' to="/product"><Button variant="primary">Back to product</Button></Link>
            </Col>
        </Row>
    </Container>
    </MasterLayout>
  )
}

export default Fupdate