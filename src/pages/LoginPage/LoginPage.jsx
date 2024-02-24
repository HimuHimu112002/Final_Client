import {useState} from 'react'
import { Button, Form,Container,Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link,useNavigate } from 'react-router-dom';
import { AiOutlineMail, AiFillEye, AiTwotoneEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ProgressBar } from 'react-loader-spinner'
import MasterLayout from '../../components/MasterLayout'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { userLoginInfo } from '../../slices/userSlice';

const LoginPage = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    let [email, setuserEmail] = useState("")
    let [password, setuserpassword] = useState("")

    let [userEmailerror, setuserEmailerror] = useState("")
    let [userpassworderror, setuserpassworderror] = useState("")
    
    let [error, setError] = useState("")
    let [passShow, setpassShow] = useState(false)
    let [loading, setloading] = useState(false)


    let handleuserLoginEmail = (e)=>{
        setuserEmail(e.target.value)
        setuserEmailerror("")
    }
    let handleuserLoginPassword = (e)=>{
        setuserpassword(e.target.value)
        setuserpassworderror("")
    }

    let handleLoginSubmit = async ()=>{
        if(!email){
            setuserEmailerror("Please Input Your Email Here !")
        }
        if(!password){
            setuserpassworderror("Please Input Your Password Here !")
        }
        if( email && password){
            setloading(true)
            let data = await axios.post("http://localhost:5000/api/v1/login",
            {
                email,
                password

            })
            if(data.data.error){
                setError(data.data.error)
            }
            if(data.data['status'] != "success"){
                setloading(false)
            }else if(data.data['status'] === "success"){
                dispatch(userLoginInfo(data.data))
                localStorage.setItem("userInfo", JSON.stringify(data.data))
                localStorage.setItem("id", data.data.user_id._id)
                toast.success("Login Success")
                setTimeout(()=>{
                    setloading(false)
                },1000)
                setTimeout(()=>{
                    navigate('/product')
                },2000)
            }
  
        }
       
    }
  return (
    <MasterLayout>
        <Container className='registration_top'>
            <Row className='res rounded my-4'>
                <div className='text-center mb-3 registration_text'><h1><span>Login</span> Here</h1></div>
                <div className='text-center mb-3 text-danger'><p>{error}</p></div>
                <Col md="6" className='m-auto'>

                    <FloatingLabel className='registration_icon--section' onChange={handleuserLoginEmail} controlId="floatingInput" label="Email address">
                        <Form.Control type="email" placeholder="name@example.com" />
                        <AiOutlineMail className='registration_icon'></AiOutlineMail>
                    </FloatingLabel>
                    <p className='text-danger'>{userEmailerror}</p>

                    <FloatingLabel className='registration_icon--section' onChange={handleuserLoginPassword} controlId="floatingPassword" label="Password">
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

                    <Button onClick={handleLoginSubmit} className='mt-4 w-100 login_button'>Login</Button>
                    
                    }

                    <p className='registration_sub--heading text-primary text-center mt-3'>👉 You don't have an account <Link to="/registration"><span>Sign-up</span></Link></p>
                </Col>
            </Row>
      </Container>
    </MasterLayout>
  )
}
export default LoginPage