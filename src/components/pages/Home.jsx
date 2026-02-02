import React from 'react'
import '../../App.css'
import HeroSection from '../HeroSection'
import Cards from '../Cards'
import Footer from '../Footer'
import About from '../About'



function Home() {
  return (
    <div id="Home">
       <HeroSection />
       <div id="about">
         <About/>
       </div>
       <Cards/>
       <Footer/>
       
    </div>
  )
}

export default Home