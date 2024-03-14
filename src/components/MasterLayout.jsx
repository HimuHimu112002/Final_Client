import React from 'react'
import NavMenu from './NavMenu.jsx'
import Footer from './Footer.jsx'
const MasterLayout = (props) => {
  return (
    <>
      <NavMenu/>
          {props.children}
      <Footer/>
    </>
  )
}

export default MasterLayout