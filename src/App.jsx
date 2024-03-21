import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Product from './pages/Product/Product.jsx';
import Registration from './pages/Registration/Registration.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import Profile from './pages/profile/Profile.jsx';
import Otp from './pages/OtpVerify/Otp.jsx';

function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home/> ,
    },
    {
      path: "/product",
      element: <Product/> ,
    },
    {
      path: "/registration",
      element: <Registration/> ,
    },
    {
      path: "/login",
      element: <LoginPage/> ,
    },
    {
      path: "/profile",
      element: <Profile/> ,
    },
    {
      path: "/otp/:email",
      element: <Otp/> ,
    },
    {
      path: "/dash",
      element: <AdminPannel/> ,
    },
    {
      path: "/detail/:id",
      element: <Details/> ,
    },
    {
      path: "/update/:id",
      element: <Fupdate/> ,
    },
    {
      path: "/search/:name",
      element: <FoodSearch/> ,
    },
    {
      path: "/wish",
      element:  <WishListPage/>,
    },
    {
      path: "/cart/:id",
      element:  <Cartdetails/>,
    },
    {
      path: "/cart",
      element:  <CartList/>,
    },
    
  ]
  )
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}
import AdminPannel from './pages/dashboard/AdminPannel.jsx';
import Details from './pages/FoodDetails/Details.jsx';
import Fupdate from './pages/FoodUpdate/Fupdate.jsx';
import FoodSearch from './pages/SearchPage/FoodSearch.jsx';
import WishListPage from './pages/wishList/WishListPage.jsx';
import CartList from './pages/cart/CartList.jsx';
import Cartdetails from './pages/CartDetails/Cartdetails.jsx';

export default App
