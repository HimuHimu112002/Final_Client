import { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const FoodItems = () => {

  let navigate = useNavigate();
  let [foodItemname, setFoodIteme] = useState([])

  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/foodget")
      setFoodIteme(data.data.data)
    }
    allproduct()
  },[])

  // Go to detail page
  let handleDetails = (id) =>{
    navigate(`/detail/${id}`)
  }

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

  // Go to edit page
  let handleEdit = (id) =>{
    navigate(`/update/${id}`)
  }
return (
  <Container>
    <Row>
      {foodItemname.map((item,i)=>(
        <Col key={i} className='my-4' md={4}>
          <Card style={{ width: 'auto' }}>
            <Card.Img variant="top" src={`http://localhost:5000/images/${item.img}`}/>
            <Card.Body>
              <Card.Title>Food Item: - {item.name}</Card.Title>
              <h5>Brand: - {item.brand}</h5>
              <h5>Category: - {item.category}</h5>
              <h5>Price: - {item.price}</h5>
              <h6 className='text-danger food__detail--button py-2' onClick={()=>handleDetails(item._id)}>learn more...........!</h6>
              <Button onClick={()=>handleDelete(item._id)} variant="danger">Delete</Button>
              <Button onClick={()=>handleEdit(item._id)} className='mx-3' variant="success">Edit</Button>    
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  )
}
export default FoodItems