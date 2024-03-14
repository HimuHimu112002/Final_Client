import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMail, AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { FaPhoneFlip } from "react-icons/fa6";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-loader-spinner'
import MasterLayout from '../../components/MasterLayout';
import axios from 'axios';

const Registration = () => {
    let navigate = useNavigate();
    
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
    let [error, setError] = useState('')


    let handleRegistrationsName = (e)=>{
        setuserName(e.target.value)
        setuserNameerror("")
    }
    let handleRegistrationsEmal = (e)=>{
        setuserEmail(e.target.value)
        setuserEmailerror("")
    }
    let handleRegistrationsPassword = (e)=>{
        setuserpassword(e.target.value)
        setuserpassworderror("")
    }
    let handleRegistrationsPhone = (e)=>{
        setPhone(e.target.value)
        setuserPhoneerror("")
    }
    let handleRegistrationsSubmit = async ()=>{
        if(!userName){
            setuserNameerror("Please Input Your Name Here !")
        }
        if(!userEmail){
            setuserEmailerror("Please Input Your Email Here !")
        }
        if(!userpassword){
            setuserpassworderror("Please Input Your Password Here !")
        }
        if(!userphone){
            setuserPhoneerror("Please Input Your Phone Number Here !")
        }
        if(userName && userEmail && userpassword && userphone){
            setloading(true)
            let data = await axios.post("http://localhost:5000/api/v1/registration",
            {
                name: userName,
                email: userEmail,
                phone: userphone,
                password: userpassword
            })
            if(data.data.error){
                setError(data.data.error)
            }
            if(data.data['status'] != "success"){
                setloading(false)
            }else if(data.data['status'] === "success"){
                toast.success('Registration Success')
                setTimeout(()=>{
                    setloading(false)
                },1000)
                setTimeout(()=>{
                    navigate(`/otp/${userEmail}`)
                },2000)
            }
           
        }
        
    }

return (
    <MasterLayout>
        <Container className='registration_top shadow my-5'>
            <Row className='res shadow-md rounded my-4'>
                <div className='text-center mb-3 registration_text'><h1><span>Registration</span> Here</h1></div>
                <div className='text-center mb-3 text-danger'><p>{error}</p></div>
                <Col md="6" className='mt-1 m-auto py-4'>
                
                    <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsName} controlId="floatingInput" label="Your's name here">
                        <Form.Control size="sm" type="text" placeholder="Name" />
                        <AiOutlineUser className='registration_icon'></AiOutlineUser>
                    </FloatingLabel>
                    <p className='text-danger'>{userNameerror}</p>

                    <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsEmal} controlId="floatingInput" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" />
                        <AiOutlineMail className='registration_icon'></AiOutlineMail>
                    </FloatingLabel>
                    <p className='text-danger'>{userEmailerror}</p>

                    <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsPhone} controlId="floatingInput" label="Phone Number">
                        <Form.Control type="number" placeholder="name@example.com" />
                        <FaPhoneFlip  className='registration_icon'></FaPhoneFlip>
                    </FloatingLabel>
                    <p className='text-danger'>{userPhoneerror}</p>

                    <FloatingLabel className='registration_icon--section' onChange={handleRegistrationsPassword} controlId="floatingPassword" label="Password">
                        <Form.Control type={passShow ? "text":"password"} placeholder="Password" />
                        {passShow ?
                        <AiFillEye onClick={()=>setpassShow(!passShow)} className='registration_icon'></AiFillEye>
                        
                         :
                        <AiTwotoneEyeInvisible onClick={()=>setpassShow(!passShow)} className='registration_icon'></AiTwotoneEyeInvisible>
                         
                        }
                    </FloatingLabel>
                    <p className='text-danger'>{userpassworderror}</p>

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
                    <Button onClick={handleRegistrationsSubmit} className='mt-4 w-100 login_button'>Sign-up</Button>
                    
                    }

                    <p className='registration_sub--heading text-center mt-3 text-primary'>👉 Already You have an account <Link to="/login"><span>Log-in</span></Link></p>
                </Col>
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default Registration
