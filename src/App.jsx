import React from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import CustomCreation from './components/CustomCreation'
import Marketplace from './components/Marketplace'
import Offers from './components/Offers'
import WhyUs from './components/WhyUs'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <CustomCreation />
      <Marketplace />
      <Offers />
      <WhyUs />
      <Footer />
    </div>
  )
}

export default App
