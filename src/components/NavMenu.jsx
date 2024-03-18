import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { CiSearch } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch} from 'react-redux';
import { userLoginInfo } from '../slices/userSlice';
import { Button } from 'react-bootstrap';
import { GoArrowRight } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { FaAppStore } from "react-icons/fa";
import axios from 'axios';
function NavMenu() {
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let data = useSelector((state)=> state.userLoginInfo.userInfo)

  let [show,setShow]= useState(false)
  let [name,setSearch]= useState("")

  let handleLogout = () =>{
    dispatch(userLoginInfo(null)),
    localStorage.removeItem("userInfo")
    localStorage.clear();
    navigate("/login")
  }
  let handleSearch = ()=>{
    navigate(`/search/${name}`)
  }

  let [foodItemname, setFoodIteme] = useState([])
  console.log(foodItemname);
  useEffect(()=>{
    async function allproduct(){
      let data = await axios.get("http://localhost:5000/api/v1/getwishlist")
      setFoodIteme(data.data)
    }
    allproduct()
  },[])
  return (
    <Navbar expand="lg shadow py-4 sticky-top bg-dark">
      <Container>

        <h2 className='text-white'>Pti.</h2>
        <div className='Nav__layout'>

          <Form className="NavSearchBox m-auto shadow-sm">
            <Form.Control
            onChange={(e)=>setSearch(e.target.value)}
            type="search"
            placeholder="Search Food"
            className="NavSearchBox__Size outline-none"
            aria-label="Search"
            />
            <CiSearch className='Search__icon' />
            <Button onClick={handleSearch} className='nav__search--btn'>Search <GoArrowRight className='footer__search--icon'/> </Button>
          </Form>

          <div className='menu__item'>
            <Link to="/"><p className='text-white'>Home</p></Link>
            <Link to="/product"><p className='text-white'>Product Order</p></Link>

            {!data &&
              <Link to="/login"><p className='LoginButton px-2 py-1 rounded text-white'>Login</p></Link>
            }
          </div>
        </div>
        {data &&
          <div className='profile__section'>
            <CiShoppingCart/>
          </div>
        }
        {data &&
          <div className='profile__section'>
            <Link to="/wish"><FaAppStore className='wish__icon'/></Link>
          </div>
        }
        {data &&
          <div className='profile__section'>
            <CgProfile onClick={()=>setShow(!show)}/>

            {show &&
              <div className='bg-dark profile__account'>
                <Button onClick={handleLogout} className='LogOutBtn'>Logout</Button>
                <Link to="/profile"><Button className='LogOutBtn'>Profile</Button></Link>
                <Link to="/dash"><Button className='LogOutBtn'>Dashboard</Button></Link>
              </div>
            }
          </div>
        }
      </Container>
    </Navbar>
  );
}
export default NavMenu;