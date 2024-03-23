import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col,Form, Button } from 'react-bootstrap';
import {Link, useNavigate, useParams } from 'react-router-dom';
import {toast } from 'react-toastify';
import MasterLayout from '../../components/MasterLayout';

const Fupdate = () => {
    let navigate = useNavigate()
    let params = useParams()
    let [brandname, setBrandName] = useState([])
    let [categoryname, setCategoryName] = useState([])
    let [image, setImage] = useState("")

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

    const [fromData, setFromData] = useState({name:"",price:"",brand:"",category:"",dis:""})
    let handleFromdata =(e)=>{
        setFromData({...fromData, [e.target.name]:e.target.value})
    }
    let handleFoodUpdate = async ()=>{
        let res = await axios.post(`http://localhost:5000/api/v1/updateFood/${params.id}`,
        {
            name: fromData.name,
            brand: fromData.brand,
            category: fromData.category,
            discription: fromData.dis,
            price: fromData.price,

        })
        if(res.data['status'] === "success"){
            toast.success("Update Success")
            setTimeout(() => {
                navigate("/dash")
            }, 2000);
        } 
        // let config = {
        //     method: "post",
        //     maxBodyLength: Infinity,
        //     url: `http://localhost:5000/api/v1/updateFood/${params.id}`,
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },
        //     data: {
        //         name: fromData.name,
        //         brand: fromData.brand,
        //         category: fromData.category,
        //         discription: fromData.dis,
        //         price: fromData.price,
        //         img:image
        //     },
        //   };
        //   axios
        //     .request(config)
        //     .then((response)=>{
        //         toast.success('Product Item Add Success')
        //         if(response.data['status'] === "success"){
        //             setTimeout(() => {
        //                 navigate("/dash")
        //             }, 2000);
        //         } 
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //     });
    }
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get(`http://localhost:5000/api/v1/foodDetail/${params.id}`)
        setFromData(data.data.data[0])
        }
        allproduct()
    },[])
  return (
    <MasterLayout>
        <Container>
            <Row>
                <h1 className='my-4 text-center'>Update Your Product!</h1>
                <Col className='mt-5 mb-3 bg-white py-5 px-5 rounded'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control value={fromData.name} name="name"  onChange={handleFromdata} type="text" placeholder="Apple" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control value={fromData.price} name="price"  onChange={handleFromdata} type="text" placeholder="Price" />
                        </Form.Group>

                        {/* <Form.Label>Product Image</Form.Label>
                        <Form.Group controlId="formFile" className="mb-3">
                            <input
                            
                            type="file"
                            id="image"
                            name="img"
                            onChange={(e) => setImage(e.target.files[0])}
                            
                            />
                        </Form.Group> */}

                        <Form.Label>Select Brand Name</Form.Label>
                        <Form.Select value={fromData.brand} name="brand"  onChange={handleFromdata} className="mb-3" aria-label="Default select example">
                            <option>Open this select menu</option>
                            {brandname.map((item, i)=>(
                                <option key={i}>{item.brand}</option>
                            ))}
                        </Form.Select>

                        <Form.Label>Select Category Name</Form.Label>
                        <Form.Select value={fromData.category} name="category"  onChange={handleFromdata} className="mb-3" aria-label="Default select example">
                            <option>Open this select menu</option>
                            {categoryname.map((item, i)=>(
                                <option key={i}>{item.category}</option>
                            ))}
                        </Form.Select>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Food Description</Form.Label>
                            <Form.Control value={fromData.discription} name="discription"  onChange={handleFromdata} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    <Button onClick={handleFoodUpdate} variant="primary">Update</Button>
                    <Link className='mx-3' to="/dash"><Button variant="primary">Back to Dashboard</Button></Link>
                </Col>
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default Fupdate