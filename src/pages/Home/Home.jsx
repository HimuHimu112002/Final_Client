import React from 'react'
import NavMenu from '../../components/NavMenu'
import Footer from '../../components/Footer'
import HeroSection from '../../components/HeroSection'
import ProductSlide from '../../components/ProductSlide'
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  return (
    <>
      <ScrollToTop smooth/>
      <NavMenu/>
      <HeroSection/>
      <ProductSlide/>
      <Footer/>
    </>
  )
}

export default Home