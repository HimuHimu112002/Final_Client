import React, {useState} from 'react'
import { Button, Form,Container,Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-loader-spinner'
import MasterLayout from '../../components/MasterLayout'
import axios from 'axios';

const Otp = () => {
    let params = useParams()
    let navigate = useNavigate();
    let [otp, setOtp] = useState("")
    let [userEmailerror, setuserEmailerror] = useState("")
    let [loading, setloading] = useState(false)

    let handleuserLoginEmail = (e)=>{
        setOtp(e.target.value)
        setuserEmailerror("")
    }
   
    let handleLoginSubmit = async ()=>{
        if(!otp){
            setuserEmailerror("Please Input Your Otp Here !")
        }
        if( otp){
            setloading(true)
            let res = await axios.post(`http://localhost:5000/api/v1/otp/${params.email}`,
            {
                otp
            })
            if(res.data['status'] != "success"){
                setloading(false)
            }else if(res.data['status'] === "success"){
                setTimeout(()=>{
                    setloading(false)
                },1000)
                setTimeout(()=>{
                    navigate('/login')
                },2000)
            }
  
        }
       
    }
  return (
    <MasterLayout>
        <Container className='registration_top'>
            {/* <ToastContainer position="top-right" theme="dark"/> */}
            <Row className='res rounded my-4'>
                <div className='text-center mb-3 registration_text'><h1><span>Verify Otp</span> Here</h1></div>
                <Col md="6" className='m-auto'>

                    <FloatingLabel className='registration_icon--section' onChange={handleuserLoginEmail} controlId="floatingInput" label="Otp verify">
                        <Form.Control type="number" placeholder="name@example.com" />
                    </FloatingLabel>
                    <p className='text-danger'>{userEmailerror}</p>

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

                    <Button onClick={handleLoginSubmit} className='mt-4 w-100 login_button'>Verify</Button>
                    
                    }
                </Col>
            </Row>
        </Container>
    </MasterLayout>
  )
}

export default Otp
