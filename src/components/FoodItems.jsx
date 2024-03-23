import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const FoodItems = () => {
  let data = useSelector((state)=> state.userLoginInfo.userInfo)
  let navigate = useNavigate();
  let [foodItemname, setFoodIteme] = useState([])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/foodget")
      setFoodIteme(data.data.data)
    }
    allproduct()
  },[foodItemname])

  // Go to detail page
  let handleDetails = (id) =>{
    navigate(`/detail/${id}`)
  }

  let handleWishlist = async (e) =>{
    toast.success("Wish List Add Success")
    const headers = {
      'user_id': data.user_id._id,
      'Content-Type': 'application/json',
    };
    await axios.post("http://localhost:5000/api/v1/wishlist",{productID:e},{ headers })
    .then(()=>{
      setTimeout(()=>{
        navigate("/wish")
      },2000)
    })
  }
  
  let handleCartDetails = (id) =>{
    navigate(`/cart/${id}`)
  }
return (
  <Container>
    <Row>
      {foodItemname.map((item,i)=>(
        <Col key={i} className='my-4' md={4}>
          <Card className='shadow-sm' style={{ width: 'auto' }}>
            <Card.Img variant="top" src={`http://localhost:5000/images/${item.img}`}/>
            <Card.Body>
              <Card.Title>Product : - {item.name}</Card.Title>
              <h5>Price: - {item.price}</h5>
              <h6 className='text-danger food__detail--button py-2' onClick={()=>handleDetails(item._id)}>learn more...........!</h6>
              {data.user_id._id === item.uid ?
                <Button className='w-100' variant="success">Personal Product</Button> 
               :
                <>
                <Button onClick={()=>handleCartDetails(item._id)} variant="primary">Buy Now</Button>
                <Button onClick={()=>handleWishlist(item._id)} className='mx-3' variant="success">Add Wish List</Button>
                </>
              }
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  )
}
export default FoodItems