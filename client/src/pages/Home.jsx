import Header from '../components/Header'
import Navbar from '../components/Navbar'
import Bloglist from '../components/Bloglist'
import React from 'react'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Bloglist />
      <Newsletter/>
      <Footer/>
    </>
  )
}

export default Home
