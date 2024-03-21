import { useEffect, useState } from 'react'
import {Card, Col, Container, Row, Table } from 'react-bootstrap'
import axios from 'axios'
import MasterLayout from '../../components/MasterLayout'
import {useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { FaCartArrowDown } from 'react-icons/fa'

const Cartdetails = () => {
    let data = useSelector((state)=> state.userLoginInfo.userInfo)
    let params = useParams()
    let navigate = useNavigate()
    let [foodItemname, setFoodIteme] = useState([])
    let [count, setCount]=useState(1)
    
    // get product cart item
    useEffect(()=>{
        async function allproduct(){
        let data = await axios.get(`http://localhost:5000/api/v1/foodDetail/${params.id}`)
        setFoodIteme(data.data.data)
        }
        allproduct()
    },[])
   
    let handleCartlist = async (e) =>{
        toast.success("Cart List Add Success")
        const headers = {
          'user_id': data.user_id._id,
          'Content-Type': 'application/json',
        };
        await axios.post("http://localhost:5000/api/v1/cartlist",{
            image:e.img,
            name:e.name,
            brand:e.brand,
            category:e.category,
            price:e.price,
            qty:count
        },{ headers })
        .then(()=>{
          setTimeout(()=>{
            navigate("/cart")
          },2000)
        })
    }
  return (
    <MasterLayout>
        <Container>
            <Row>
                <Col md="12" className='m-auto'>
                    <h1 className='text-center my-5'>Add To Cart Your Favourite Item</h1>
                    <Table className='shadow-sm' responsive="sm">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>price</th>
                            <th className='text-center'>Qty</th>
                            <th>Add Cart</th>
                        </tr>
                        </thead>
                        <tbody>
                        
                        {foodItemname.map((item, i)=>(
                        <>
                        
                            <tr key={i}>
                            <td><Card.Img className='dashboard__img' variant="top" src={`http://localhost:5000/images/${item.img}`}/></td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.category}</td>
                            <td>{item.price}</td>
                            <td className='d-flex justify-content-around'>
                            <p className='bg-dark text-white px-2 rounded Counter__incress' onClick={()=>setCount(count >= 2 ? count - 1 : count)}>-</p>
                            {count}
                            <p className='bg-dark text-white px-2 rounded Counter__incress' onClick={()=>setCount(count+1)}>+</p>
                            </td>
                            <td><div className='d-flex'><p onClick={()=>handleCartlist(item)} className='text-bg-danger px-2 rounded dashboard__delete--item'><FaCartArrowDown /></p></div></td>
                            </tr>

                        </>)
                        )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default Cartdetails