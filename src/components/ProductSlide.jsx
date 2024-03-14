import { Col, Container, Row } from 'react-bootstrap'
import FoodItemHome from './FoodItemHome'

const ProductSlide = () => {
  return (
    <Container className='my-5'>
      <Row>
        <Col>
          <h1>Popular Product</h1>
          <FoodItemHome/>
        </Col>
      </Row>
    </Container>
  )
}
export default ProductSlide