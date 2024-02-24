import React, { useState } from 'react'
import { Col, Container,Row,Button } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import { GoArrowRight } from "react-icons/go";
import { FaGoogle } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { FaLinkedinIn } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Footer = () => {

    let [error, setError] = useState("")
    let [mail, setMail] = useState("")

    let handleCusEmail = (e) =>{
        setMail(e.target.value)
        setError("")
    }


    let handleSubmitEmail = () =>{
        if(!mail){
            setError("Please Enter Your Email Here !")
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(mail)){
            setError("Invalid Email")
        }else{
            toast.success("Subscribe Successfull.");
            setMail("")
        }
    }

  return (
    <div className='footer__main--section'>
        <Container>
        <ToastContainer position="top-center" theme="dark"/>
            <Row>
                <Col className='pt-5' md="7">

                    <p className='text-white'>{error}</p>
                    <Form onChange={handleCusEmail} className="FooterSearchBox m-auto">
                        <Form.Control
                        type="search"
                        placeholder="Enter Your Email"
                        className="footerSearchBox__Size outline-none"
                        aria-label="Search"
                        />
                        <Button  onClick={handleSubmitEmail} className='footer__btn'>Subscribe <GoArrowRight className='footer__search--icon'/> </Button>
                    </Form>

                    <div className='footer__socialIcon--section py-3'>
                        <Row className='Col__change'>

                            <Col className='m-auto' sm="10" md="6">
                                <div>
                                <h2 className='pt-5 footer__left--subDes'>Pti.</h2>
                                <p className='py-3 footer__left--subDes'>Copy Right Wirth pti</p>
                                </div>
                            </Col>

                            <Col className='m-auto' sm="10" md="6">
                                <div className='footer__social mt-5'>
                                    <div className='footer__social--icon'>
                                        <FaGoogle />
                                    </div>
                                    <div className='footer__social--icon'>
                                        <IoLogoTwitter />
                                    </div>
                                    <div className='footer__social--icon'>
                                        <FaLinkedinIn />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>

                <Col className='text-center' md="5">
                    <img className='img-fluid w-50' src='image/footerLogo.png'/>
                </Col>

            </Row>
        </Container>
    </div>
  )
}
export default Footer