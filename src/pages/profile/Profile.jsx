import MasterLayout from '../../components/MasterLayout'
import {useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate } from 'react-router-dom';
import {AiOutlineUser, AiOutlineMail } from 'react-icons/ai';
import {FaPhoneFlip } from "react-icons/fa6";
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ProgressBar } from 'react-loader-spinner'
import axios from 'axios';
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

  let [loading, setloading] = useState(false)
  let [product, setProduct] = useState({name:"", email:"", phone:""})
  let handleUserFromdata =(e)=>{
    setProduct({...product, [e.target.name]:e.target.value})
  }

  let handleRegistrationsSubmit = async ()=>{
    setloading(true)
    const headers = {
      'user_id': localStorage.getItem('id'),
      'Content-Type': 'application/json',
    };
    let res = await axios.post("http://localhost:5000/api/v1/updateprofile",
    {
      name: product.name,
      email: product.email,
      phone: product.phone,
      
    },{headers})
    if(res.data['status'] != "success"){
        setloading(false)
    }else if(res.data['status'] === "success"){
      toast.success("Profile Update")
      setTimeout(()=>{
          setloading(false)
      },1000)
      
    }     
      
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
  },[])


  const [fromData, setFromData] = useState({cus_add:"",cus_city:"",cus_country:"",cus_fax:"",cus_name:"",cus_phone:"",cus_postcode:"",cus_state:"",ship_add:"",ship_city:"",ship_country:"",ship_name:"",ship_phone:"",ship_postcode:"",ship_state:""})
  let handleFromdata =(e)=>{
    setFromData({...fromData, [e.target.name]:e.target.value})
  }

  let saveProfile= async()=>{
    setloading(true)
      const headers = {
        'user_id': localStorage.getItem('id'),
        'Content-Type': 'application/json',
      };
      let res = await axios.post("http://localhost:5000/api/v1/UserProfile",
      {
        cus_name:fromData.cus_name,
        cus_phone:fromData.cus_phone,
        cus_fax:fromData.cus_fax,
        cus_country:fromData.cus_country,
        cus_city:fromData.cus_city,
        cus_state:fromData.cus_state,
        cus_postcode:fromData.cus_postcode,
        cus_add:fromData.cus_add,

        ship_name:fromData.ship_name,
        ship_phone:fromData.ship_phone,
        ship_country:fromData.ship_country,
        ship_city:fromData.ship_city,
        ship_state:fromData.ship_state,
        ship_postcode:fromData.ship_postcode,
        ship_add:fromData.ship_add,
        
      },{headers})
      if(res.data['status'] != "success"){
          setloading(false)
      }else if(res.data['status'] === "success"){
        toast.success("Shipping Profile Update")
        setTimeout(()=>{
            setloading(false)
        },1000)
        
      }
        
  }

  useEffect(()=>{
    const headers = {
      'user_id': localStorage.getItem('id'),
      'Content-Type': 'application/json',
    };
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/userredprofile",{headers})
      setFromData(data.data.data[0])
    }
    allproduct()
  },[])

  return (
    <MasterLayout>
      <Container className='registration_top'>
        <div className='profile__img--section m-auto mt-4 mb-2 shadow'>
          <img src='image/burger.jpg' alt='img'/>
        </div>
        <Row className='res shadow-md rounded my-4'>
          <div className='text-center mb-3 registration_text'><h1><span>Update Your Profile</span> Here</h1></div>

          <Col md="6" className='mt-1 m-auto shadow-sm p-5 bg-white rounded'>

            <FloatingLabel value="dfd" className='registration_icon--section' controlId="floatingInput" label="Name">
                <Form.Control value={product.name} name="name" onChange={handleUserFromdata} size="sm" type="text" placeholder="Name"/>
                <AiOutlineUser className='registration_icon'></AiOutlineUser>
            </FloatingLabel>

            <FloatingLabel className='registration_icon--section mt-3' controlId="floatingInput" label="Email">
                <Form.Control value={product.email} name="email" onChange={handleUserFromdata} type="email" placeholder="name@example.com" />
                <AiOutlineMail className='registration_icon'></AiOutlineMail>
            </FloatingLabel>

            <FloatingLabel className='registration_icon--section mt-3' controlId="floatingInput" label="phone">
                <Form.Control value={product.phone} name="phone" onChange={handleUserFromdata} type="number" placeholder="name@example.com" />
                <FaPhoneFlip  className='registration_icon'></FaPhoneFlip>
            </FloatingLabel>

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

          <Col md="5" className='mt-1 m-auto shadow-sm p-5 bg-white rounded'>
            <h4>User information</h4>
            <ListGroup>
              <ListGroup.Item>Email: - {product.name}</ListGroup.Item>
              <ListGroup.Item>Name: - {product.email}</ListGroup.Item>
              <ListGroup.Item>Phone: - {product.phone}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md='12'>
            <h1 className='mt-3 text-center'>Profile Shipping Information</h1>
            <div className="container mb-5">
              <div className="card p-5 rounded-3">
                  <h4>Customer Details</h4>
                  <hr/>
                    <div className="row mb-4">
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Name </label>
                            <input value={fromData.cus_name} name="cus_name"  onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">

                            <label className="form-label">Customer Phone </label>
                            <input value={fromData.cus_phone} name="cus_phone" onChange={handleFromdata} type="text" className="form-control"/>

                        </div>

                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Fax </label>
                            <input value={fromData.cus_fax} name="cus_fax" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Country </label>
                            <input value={fromData.cus_country} name="cus_country" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer City </label>
                            <input value={fromData.cus_city} name="cus_city" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer State </label>
                            <input value={fromData.cus_state} name="cus_state" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Post Code </label>
                            <input value={fromData.cus_postcode} name="cus_postcode" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                        <div className="col-md-3 p-2">
                            <label className="form-label">Customer Address</label>
                            <input value={fromData.cus_add} name="cus_add" onChange={handleFromdata} type="text" className="form-control "/>
                        </div>
                    </div>

                  <h4>Shipping Details</h4>
                  <hr/>
                  <div className="row">
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping Name </label>
                          <input value={fromData.ship_name} name="ship_name" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping Phone </label>
                          <input value={fromData.ship_phone} name="ship_phone" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping Country </label>
                          <input value={fromData.ship_country} name="ship_country" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping City </label>
                          <input value={fromData.ship_city} name="ship_city" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping State </label>
                          <input value={fromData.ship_state} name="ship_state" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping Post Code </label>
                          <input value={fromData.ship_postcode} name="ship_postcode" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                      <div className="col-md-3 p-2">
                          <label className="form-label">Shipping Address</label>
                          <input value={fromData.ship_add} name="ship_add" onChange={handleFromdata} type="text" className="form-control "/>
                      </div>
                  </div>

                  <div className="row mt-4">
                      <div className="col-md-3 p-2">
                          <button onClick={saveProfile} className="btn btn-success">Save</button>
                      </div>
                  </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </MasterLayout>
  )
}
export default Profile






