import React, { useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'

export default function Aboutus() {
  return (
    <>
      <Hero
        title={"Learn More About Us | MeeCare Medical Institute"}
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
    </>
  )
}
