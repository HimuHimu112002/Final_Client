import MasterLayout from '../../components/MasterLayout'
import {useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate } from 'react-router-dom';
import {AiOutlineUser, AiOutlineMail, AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import {FaPhoneFlip } from "react-icons/fa6";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProgressBar } from 'react-loader-spinner'
import axios from 'axios';
import FoodItems from '../../components/FoodItems';
import { useSelector } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

const Profile = () => {
  let data = useSelector((state)=> state.userLoginInfo.userInfo)

  let navigate = useNavigate();
  useEffect(()=> {
    if(!data){
      navigate("/login")
    }
  },[])

  let [userName, setuserName] = useState("")
  let [userEmail, setuserEmail] = useState("")
  let [userpassword, setuserpassword] = useState("")
  let [userphone, setPhone] = useState("")

  let [userNameerror, setuserNameerror] = useState("")
  let [userEmailerror, setuserEmailerror] = useState("")
  let [userPhoneerror, setuserPhoneerror] = useState("")
  let [userpassworderror, setuserpassworderror] = useState("")

  let [passShow, setpassShow] = useState(false)
  let [loading, setloading] = useState(false)
  let [product, setProduct] = useState([])

  let handleRegistrationsName = (e)=>{
    setuserName(e.target.value)
    setuserNameerror("")
  }
  let handleRegistrationsEmal = (e)=>{
    setuserEmail(e.target.value)
    setuserEmailerror("")
  }
  // let handleRegistrationsPassword = (e)=>{
  //   setuserpassword(e.target.value)
  //   setuserpassworderror("")
  // }
  let handleRegistrationsPhone = (e)=>{
    setPhone(e.target.value)
    setuserPhoneerror("")
  }
  let handleRegistrationsSubmit = async ()=>{
    // if(!userName){
    //   setuserNameerror("Please Input Your Name Here !")
    // }
    // if(!userEmail){
    //   setuserEmailerror("Please Input Your Email Here !")
    // }
    // if(!userpassword){
    //   setuserpassworderror("Please Input Your Password Here !")
    // }
    // if(!userphone){
    //   setuserPhoneerror("Please Input Your Phone Number Here !")
    // }
    // else{
      setloading(true)
      const headers = {
        'user_id': localStorage.getItem('id'),
        'Content-Type': 'application/json',
      };
      let res = await axios.post("http://localhost:5000/api/v1/updateprofile",
      {
        name: userName,
        email: userEmail,
        phone: userphone,
        
      },{headers})
      if(res.data['status'] != "success"){
          setloading(false)
      }else if(res.data['status'] === "success"){
        toast.success("Profile Update")
        setTimeout(()=>{
            setloading(false)
        },1000)
        
      }
        
    // }
      
  }
  
  useEffect(()=>{
    const headers = {
      'user_id': localStorage.getItem('id'),
      'Content-Type': 'application/json',
    };
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/readprofile",{headers})
      setProduct(data.data.data[0])
    }
    allproduct()
  },[product])


  return (
    <MasterLayout>
      <Container className='registration_top'>
          <div className='profile__img--section m-auto mt-4 mb-2 shadow'>
            <img src='image/burger.jpg' alt='img'/>
          </div>
          <Row className='res shadow-md rounded my-4'>
            <div className='text-center mb-3 registration_text'><h1><span>Update Your Profile</span> Here</h1></div>

            <Col md="6" className='mt-1 m-auto'>

              <FloatingLabel value="dfd" className='registration_icon--section' onChange={handleRegistrationsName} controlId="floatingInput" label="Name">
                  <Form.Control size="sm" type="text" placeholder="Name"/>
                  <AiOutlineUser className='registration_icon'></AiOutlineUser>
              </FloatingLabel>
              <p className='text-danger'>{userNameerror}</p>

              <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsEmal} controlId="floatingInput" label="Email">
                  <Form.Control type="email" placeholder="name@example.com" />
                  <AiOutlineMail className='registration_icon'></AiOutlineMail>
              </FloatingLabel>
              <p className='text-danger'>{userEmailerror}</p>

              <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsPhone} controlId="floatingInput" label="phone">
                  <Form.Control type="number" placeholder="name@example.com" />
                  <FaPhoneFlip  className='registration_icon'></FaPhoneFlip>
              </FloatingLabel>
              <p className='text-danger'>{userPhoneerror}</p>

              {loading ?
              <div className='text-center'>
              <ProgressBar
                height="80"
                width="80"
                ariaLabel="progress-bar-loading"
                wrapperStyle={{}}
                wrapperClass="progress-bar-wrapper"
                borderColor = '#fff'
                barColor = '#51E5FF'
              />
              </div>
              :
                <Button onClick={handleRegistrationsSubmit} className='mt-4 w-100 login_button'>Update Profile</Button>
              }
            </Col>

            <Col md="6" className='mt-1 m-auto'>
              <ListGroup>
                <ListGroup.Item>Email: - {product.name}</ListGroup.Item>
                <ListGroup.Item>Name: - {product.email}</ListGroup.Item>
                <ListGroup.Item>Phone: - {product.phone}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
      </Container>
    </MasterLayout>
  )
}
export default Profile