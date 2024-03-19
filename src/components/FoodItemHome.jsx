import { useEffect, useState } from 'react'
import {Card, Col, Container, Row,Form } from 'react-bootstrap'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';

const FoodItemHome = () => {
  let navigate = useNavigate();
  let [foodItemname, setFoodIteme] = useState([])
  let [categoryname, setCategoryName] = useState([])
  let [brand, sethandleBrand] = useState("")
  let [category, sethandleCategory] = useState("")
  let [brandname, setBrandName] = useState([])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/foodget")
      setFoodIteme(data.data.data)
    }
    allproduct()
  },[])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/categoryget")
      setCategoryName(data.data.data)
    }
    allproduct()
  },[])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get(`http://localhost:5000/api/v1/brandget`)
      setBrandName(data.data.data)
    }
    allproduct()
  },[])

  let handleDetails = (id) =>{
    navigate(`/detail/${id}`)
  }
  
  // let handlBrangSearch = ()=>{
  //   navigate(`/search/${brand}`)
  // }
  // let handlCategorySearch = ()=>{
  //   navigate(`/search/${category}`)
  // }
return (
    <Container>
      <Row>
        {/* <Col md={4} className='my-4'>
          <Form.Label>Search Brand Name</Form.Label>
          <Form.Select onChange={(e)=>sethandleBrand(e.target.value)} className="mb-3" aria-label="Default select example">
              <option>Open this select menu</option>
              {brandname.map((item, i)=>(
                  <option key={i}>{item.brand}</option>
              ))}
          </Form.Select>
          <Button onClick={handlBrangSearch}>Search brand</Button><br/> <br/>
          <Form.Label>Search Category Name</Form.Label>
          <Form.Select onChange={(e)=>sethandleCategory(e.target.value)} className="mb-3" aria-label="Default select example">
              <option>Open this select menu</option>
              {categoryname.map((item, i)=>(
                  <option key={i}>{item.category}</option>
              ))}
          </Form.Select>
          <Button onClick={handlCategorySearch}>Search Category</Button>
        </Col> */}
        {foodItemname.map((item,i)=>(
          <Col key={i} className='my-4' md={4}>
            <Card className='shadow-sm' style={{ width: 'auto' }}>
              <Card.Img variant="top" src={`http://localhost:5000/images/${item.img}`}/>
              <Card.Body>
                <Card.Title>Product: - {item.name}</Card.Title>
                {/* <h5>Brand: - {item.brand}</h5>
                <h5>Category: - {item.category}</h5> */}
                <h5>Price: - {item.price}</h5>
                <p className='text-danger food__detail--button' onClick={()=>handleDetails(item._id)}>See more...........</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
export default FoodItemHome