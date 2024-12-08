import React from 'react'

function Hero({title, imageUrl}) {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          <p>
            MeeCare Medical Institute is a state-of-the-art facility dedicated
            to providing comprehensive healthcare services with compassion and
            expertise. Our team of skilled professionals is committed to
            delivering personalized care tailored to each patient's needs. At
            MeeCare, we prioritize your well-being, ensuring a harmonious
            journey towards optimal health and wellness. We believe in a patient-centered approach, 
            prioritizing your needs and ensuring you feel valued and informed throughout your 
            healthcare journey.
          </p>
        </div>
        <div className="banner">
          <img src={imageUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  )
}

export default Hero
