import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

export default function Aboutus() {
  return (
    <>
      <Hero
        title={"Learn More About Us | ZeeCare Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  )
}
