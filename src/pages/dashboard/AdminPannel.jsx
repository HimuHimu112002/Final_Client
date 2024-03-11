import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card,Form, Button } from 'react-bootstrap';
import {Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MasterLayout from '../../components/MasterLayout';

const AdminPannel = () => {
    let [brand, setBrand] = useState("")
    let [brandname, setBrandName] = useState([])
    let [image, setImage] = useState("")
    let [foodItemname, setFoodIteme] = useState([])
    let [category, setCategory] = useState("")
    let [categoryname, setCategoryName] = useState([])
    
    let [foodname, setFoodName] = useState("")
    let [brandvalue, setBrandValue] = useState("")
    let [categoryvalue, setCategoryValue] = useState("")
    let [price, setPrice] = useState("")
    let [dis, setDis] = useState("")

    // Add brand value
    let handleBrand = async () =>{
        if(brand){
            let data = await axios.post("http://localhost:5000/api/v1/brandsave",
            {
                brand: brand,
            })
            if(data.data.error){
                setBrandError(data.data.error)
            }
            if(data.data['status'] === "success"){
                toast.success('Brand Add Success')
                setBrand("")
            }
        }

    }
    
    // Read brand value
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get("http://localhost:5000/api/v1/brandget")
          setBrandName(data.data.data)
        }
        allproduct()
    },[brandname])

    // Add category value
    let handleCategory = async () =>{
        if(category){
            let data = await axios.post("http://localhost:5000/api/v1/categorysave",
            {
                category: category,
            })
            if(data.data.error){
                //setBrandError(data.data.error)
            }
            if(data.data['status'] === "success"){
                toast.success('category Add Success')
                setBrand("")
            }
        }

    }

    // read category value
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get("http://localhost:5000/api/v1/categoryget")
          setCategoryName(data.data.data)
        }
        allproduct()
    },[categoryname])
    
    // Count total food
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get("http://localhost:5000/api/v1/foodget")
        setFoodIteme(data.data.data)
        }
        allproduct()
    },[])


    let handleFname =(e)=>{
        setFoodName(e.target.value)
    }
    let handleFprice =(e)=>{
        setPrice(e.target.value)
    }
    let handleFbrand =(e)=>{
        setBrandValue(e.target.value)
    }
    let handleFcategory =(e)=>{
        setCategoryValue(e.target.value)
    }
    let handleFdis =(e)=>{
        setDis(e.target.value)
    }
    let handleFoodSave = async ()=>{
        if(foodname && price && brandvalue && categoryvalue && dis){
            let data = await axios.post("http://localhost:5000/api/v1/addfood",
            {
                name: foodname,
                price: price,
                // img: image,
                brand: brandvalue,
                category: categoryvalue,
                discription: dis,
            })
            if(data.data.error){
                //setBrandError(data.data.error)
            }
            if(data.data['status'] === "success"){
                toast.success('Food Item Add Success')
            }
        }
    }
    
  return (
    <MasterLayout>
    <Container>
        <Row>
            <h1 className='my-4 text-center'>Welcome to the Admin Dashboard!</h1>
            <Col md={4}>
                <Card className='bg-warning text-white'>
                <Card.Body>
                    <Card.Title>Products</Card.Title>
                    <Card.Text>
                        <h3>Total products: {foodItemname.length}</h3>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className='bg-info text-white'>
                <Card.Body>
                    <Card.Title>Brand</Card.Title>
                    <Card.Text>
                        <h3>Total Brand: {brandname.length}</h3>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>
            <Col md={4}>
                <Card className='bg-info text-white'>
                <Card.Body>
                    <Card.Title>Category</Card.Title>
                    <Card.Text>
                        <h3>Total Category: {categoryname.length}</h3>
                    </Card.Text>
                </Card.Body>
                </Card>
            </Col>

            <Col className='mt-4 d-flex' md={12}>
                <Col md={6}>
                    <h5>Add Food Brand name</h5>
                    {/* <p className='text-danger'>{branderror}</p> */}
                    <Form.Control onChange={(e)=>setBrand(e.target.value)} size="lg" type="text" placeholder="Add Brand"/>
                    <Button onClick={handleBrand} className='mt-2' variant="primary">Save</Button>
                </Col>
                <Col className='mx-1' md={6}>
                    <h5>Add Food Category name</h5>
                    <Form.Control onChange={(e)=>setCategory(e.target.value)} size="lg" type="text" placeholder="Add Category" />
                    <Button onClick={handleCategory} className='mt-2' variant="primary">Save</Button>
                </Col>
            </Col>

            <Col className='mt-5 mb-3'>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Food Name</Form.Label>
                        <Form.Control onChange={handleFname} type="text" placeholder="Apple" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Food Price</Form.Label>
                        <Form.Control onChange={handleFprice} type="text" placeholder="Price" />
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mb-3">
                        <input
                        type="file"
                        id="image"
                        name="img"
                        onChange={(e) => setImage(e.target.files[0])}

                        />
                    </Form.Group>

                    <Form.Label>Select Brand Name</Form.Label>
                    <Form.Select onChange={handleFbrand} className="mb-3" aria-label="Default select example">
                        <option>Open this select Brand</option>
                        {brandname.map((item, i)=>(
                            <>
                                <option key={i}>{item.brand}</option>
                                <Button>delte</Button>
                            </>
                        ))}
                    </Form.Select>

                    <Form.Label>Select Category Name</Form.Label>
                    <Form.Select onChange={handleFcategory} className="mb-3" aria-label="Default select example">
                        <option>Open this select Category</option>
                        {categoryname.map((item, i)=>(
                            <option key={i}>{item.category}</option>
                        ))}
                    </Form.Select>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Food Description</Form.Label>
                        <Form.Control onChange={handleFdis} as="textarea" rows={3} />
                    </Form.Group>
                </Form>
                <Button onClick={handleFoodSave} variant="primary">Save Food</Button>
                <Link className='mx-3' to="/profile"><Button variant="primary">Back to profile</Button></Link>
            </Col>
        </Row>
    </Container>
    </MasterLayout>
  )
}

export default AdminPannel