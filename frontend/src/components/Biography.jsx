import React from 'react'

export default function Biography({imageUrl}) {
  return (
    <>
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="whoweare" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
        MeeCare is a state-of-the-art healthcare facility committed to providing exceptional patient 
        care. Our experienced team of medical professionals offers a wide range of specialized 
        services, from routine check-ups to complex surgeries. We prioritize patient comfort and 
        satisfaction, ensuring a positive and healing experience. A leading healthcare provider 
        committed to delivering exceptional patient care through advanced medical treatments, 
        cutting-edge technology, and compassionate staff.
        </p> 
        <p>
        MeeCare is more than just a hospital; it's a place where healing meets innovation. 
        Our cutting-edge technology and compassionate approach to healthcare set us apart. 
        We're dedicated to delivering the highest quality medical care, tailored to your individual 
        needs.Experience world-class healthcare at our state-of-the-art facility, where patient comfort
         and satisfaction are paramount.
        </p>
        <p>Your health, our priority. Visit us today.</p>
        <p>Your health, our mission. Book an appointment now.</p>
      </div>
    </div>
  </>
  )
}
