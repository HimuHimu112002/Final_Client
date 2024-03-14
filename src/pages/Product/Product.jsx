import { useEffect } from 'react'
import MasterLayout from '../../components/MasterLayout'
import { useSelector } from 'react-redux'
import {useNavigate } from 'react-router-dom'
import {Container, Row } from 'react-bootstrap'
import FoodItems from '../../components/FoodItems'

const Product = () => {
  let navigate = useNavigate()
  let data = useSelector((state)=> state.userLoginInfo.userInfo)

  useEffect(()=> {
    if(!data){
      navigate("/login")
    }
  },[])

return (
    <MasterLayout>
      <Container>
        <Row>
          <h1 className='text-center my-4'>All Popular Product</h1>
          <FoodItems/>
        </Row>
      </Container>
    </MasterLayout>
  )
}
export default Product