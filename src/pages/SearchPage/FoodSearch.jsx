import { useEffect, useState } from 'react'
import {Card, Col, Container, Row,Form, Button } from 'react-bootstrap'
import axios from 'axios'
import MasterLayout from '../../components/MasterLayout'
import {useNavigate, useParams } from 'react-router-dom'

const FoodSearch = () => {

    let params = useParams()
    let navigate = useNavigate()

    let [foodItemname, setFoodIteme] = useState([])

    // this state using for brand
    let [brandNameList, setBrandNameList] = useState([])
    let [brandname, setBrandName] = useState([])
    let [brand, sethandleBrand] = useState("")

    // this state using for category
    let [cateNameList, setCateNameList] = useState([])
    let [cat, sethandleCat] = useState("")
    let [categoryname, setCategoryName] = useState([])

    // get food title name
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get(`http://localhost:5000/api/v1/foodsearch/${params.name}`)
        setFoodIteme(data.data.data)
        }
        allproduct()
    },[])

    // get brand name list
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get(`http://localhost:5000/api/v1/brandget`)
          setBrandName(data.data.data)
        }
        allproduct()
    },[])

    // get category name list
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get(`http://localhost:5000/api/v1/categoryget`)
          setCategoryName(data.data.data)
        }
        allproduct()
    },[])

    // search get brand name list
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get(`http://localhost:5000/api/v1/foodbrand/${params.name}`)
          setBrandNameList(data.data.data)
        }
        allproduct()
    },[params])

    // search get category name list
    useEffect(()=>{
        async function allproduct(){
          let data = await axios.get(`http://localhost:5000/api/v1/foodcate/${params.name}`)
          setCateNameList(data.data.data)
        }
        allproduct()
    },[params])

    let handlBrangSearch = ()=>{
        navigate(`/search/${brand}`)
    }

    let handlCatSearch = ()=>{
        navigate(`/search/${cat}`)
    }
  return (
    <MasterLayout>
        <Container>
            <Row>
                <Col md={6} className='my-4 d-flex'>
                    <div>
                        <Form.Label>Search Brand Name</Form.Label>
                        <Form.Select onChange={(e)=>sethandleBrand(e.target.value)} className="mb-3" aria-label="Default select example">
                            <option>Open this select menu</option>
                            {brandname.map((item, i)=>(
                                <option key={i}>{item.brand}</option>
                            ))}
                        </Form.Select>
                        <Button onClick={handlBrangSearch}>Search</Button><br/><br/>
                    </div>

                    <div className='mx-5'>
                        <Form.Label>Search Category Name</Form.Label>
                        <Form.Select onChange={(e)=>sethandleCat(e.target.value)} className="mb-3" aria-label="Default select example">
                            <option>Open this select menu</option>
                            {categoryname.map((item, i)=>(
                                <option key={i}>{item.category}</option>
                            ))}
                        </Form.Select>
                        <Button onClick={handlCatSearch}>Search</Button>
                    </div>
                </Col>
            </Row>

            <Row>     
                { foodItemname.map((item,i)=>(
                    <Col md={4} key={i} className='my-4'>
                    <Card style={{ width: 'auto' }}>
                        <Card.Img variant="top" src={item.img} />
                        <Card.Body>
                        <Card.Title>Food Item: - {item.name}</Card.Title>
                        <h5>Brand: - {item.brand}</h5>
                        <h5>Category: - {item.category}</h5>
                        <h5>Price: - {item.price}</h5>
                        <h5>Food Description</h5>
                        <span>{item.discription}</span>
                        </Card.Body>
                    </Card>
                    </Col>
                ))} 
               {brandNameList.map((item,i)=>(
                    <Col md={4} key={i} className='my-4'>
                    <Card style={{ width: 'auto' }}>
                        <Card.Img variant="top" src={item.img} />
                        <Card.Body>
                        <Card.Title>Food Item: - {item.name}</Card.Title>
                        <h5>Brand: - {item.brand}</h5>
                        <h5>Category: - {item.category}</h5>
                        <h5>Price: - {item.price}</h5>
                        <h5>Food Description</h5>
                        <span>{item.discription}</span>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}

               {cateNameList.map((item,i)=>(
                    <Col md={4} key={i} className='my-4'>
                    <Card style={{ width: 'auto' }}>
                        <Card.Img variant="top" src={item.img} />
                        <Card.Body>
                        <Card.Title>Food Item: - {item.name}</Card.Title>
                        <h5>Brand: - {item.brand}</h5>
                        <h5>Category: - {item.category}</h5>
                        <h5>Price: - {item.price}</h5>
                        <h5>Food Description</h5>
                        <span>{item.discription}</span>
                        </Card.Body>
                    </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default FoodSearch