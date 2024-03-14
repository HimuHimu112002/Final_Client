import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Card,Form, Button, Table } from 'react-bootstrap';
import {Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import MasterLayout from '../../components/MasterLayout';
import { AiFillEye } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const AdminPannel = () => {
    let data = useSelector((state)=> state.userLoginInfo.userInfo)
    let navigate = useNavigate();
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
    },[foodItemname])


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
    const handleFoodSave = () => {
        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "http://localhost:5000/api/v1/addfood",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: {
            name: foodname,
            price: price,
            img: image,
            brand: brandvalue,
            category: categoryvalue,
            discription: dis,
            uid:data.user_id._id
          },
        };
        axios
          .request(config)
          .then((response) => {
            if ("success" in response.data) {
                toast.success('Food Item Add Success')
            //   setTitle("");
            //   setImage("");
            //   setDesc("");
            //   setShowPage({
            //     add: false,
            //     table: true,
            //     edit: false,
            //   });
            //   setRealTime(!realTime);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };

      // Go to detail page
    let handleDetails = (id) =>{
        navigate(`/detail/${id}`)
    }

      // Go to detail page
 
    // delete food items
    let handleDelete = async (id) =>{
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
        let data = axios.post(`http://localhost:5000/api/v1/deletFood`,
        {
            id: id,
        })
        if(data.data['status'] === "success"){
            toast.success('Food Delete Success')
        }
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
                    <Col md={5}>
                        <h5>Create Product Brand name</h5>
                        {/* <p className='text-danger'>{branderror}</p> */}
                        <Form.Control onChange={(e)=>setBrand(e.target.value)} size="lg" type="text" placeholder="Add Brand"/>
                        <Button onClick={handleBrand} className='mt-2 w-100' variant="primary">Save</Button>
                    </Col>
                    <Col className='ms-5' md={5}>
                        <h5>Create Product Category name</h5>
                        <Form.Control onChange={(e)=>setCategory(e.target.value)} size="lg" type="text" placeholder="Add Category" />
                        <Button onClick={handleCategory} className='mt-2 w-100' variant="primary">Save</Button>
                    </Col>
                </Col>

                <Col className='mt-5 mb-3'>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Name</Form.Label>
                            <Form.Control onChange={handleFname} type="text" placeholder="Apple" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Price</Form.Label>
                            <Form.Control onChange={handleFprice} type="text" placeholder="Price" />
                        </Form.Group>

                        <Form.Label>Product Image</Form.Label>
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
                            <Form.Label>Product Description</Form.Label>
                            <Form.Control onChange={handleFdis} as="textarea" rows={3} />
                        </Form.Group>
                    </Form>
                    <Button onClick={handleFoodSave} variant="primary">Save Food</Button>
                    <Link className='mx-3' to="/profile"><Button variant="primary">Back to profile</Button></Link>
                </Col>

                <Col md='10'>
                    <div>
                    <h3 className='text-center my-4'>Access Your Product</h3>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Brand</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                    <th>View</th>
                                </tr>
                            </thead>
                            <tbody>
                            {foodItemname.map((item, i)=>(
                                (data.user_id._id === item.uid &&
                                <>
                                    <tr>
                                        <td>{i}</td>
                                        <td><Card.Img className='dashboard__img' variant="top" src={`http://localhost:5000/images/${item.img}`}/></td>
                                        <td>{item.name}</td>
                                        <td>{item.brand}</td>
                                        <td>{item.category}</td>
                                        <td>{item.price}</td>
                                        <td><div className='d-flex'><p className='text-bg-danger px-2 rounded dashboard__delete--item' onClick={()=>handleDelete(item._id)}>Delete</p> <p className='ms-2 text-bg-info px-2 text-white rounded'>Edit</p></div></td>
                                        <td><AiFillEye className='dashboard__delete--item' onClick={()=>handleDetails(item._id)}/></td>
                                    </tr>
                                </>)
                            ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default AdminPannel