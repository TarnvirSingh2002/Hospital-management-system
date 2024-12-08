import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    const procedures = [
        {
          day: "Proton Therapy",

        },
        {
          day: "Cosmetic Surgery",
        },
        {
          day: "Bone Marrow Transplant",
        },
        {
          day: "Hip Arthroscopy",
        },
        {
          day: "Knee Surgery",
        },
        {
          day: "Dialysis",
        },
      ];

      const hours = [
        {
          id: 1,
          day: "Monday:",
          time: " 9:00 AM - 8:00 PM",
        },
        {
          id: 2,
          day: "Tuesday:",
          time: " 9:00 AM - 8:00 PM",
        },
        {
          id: 3,
          day: "Wednesday:",
          time: " 9:00 AM - 8:00 PM",
        },
        {
          id: 4,
          day: "Thursday:",
          time: " 9:00 AM - 8:00 PM",
        },
        {
          id: 5,
          day: "Friday:",
          time: " 9:00 AM - 8:00 PM",
        },
        {
          id: 6,
          day: "Saturday:",
          time: " 11:00 AM - 3:00 PM",
        },
      ];

    return (
        <>
            <footer className={"container"}>
                <hr />
                <div className={"byme"}>
                    
                    <div>
                        <h4 className="headd">Quick Links</h4>
                        <ul>
                            <Link id="mami" to={"/"}>Home</Link><br/>
                            <Link id="mami" to={"/appointment"}>Appointment</Link><br/>
                            <Link id="mami" to={"/about"}>About</Link>
                        </ul>
                    </div>
                    <div>
                        <h4 className="headd">Hours</h4>
                        <ul>
                        {hours.map((element) => (
                            <li key={element.id}>
                            <span>{element.day}</span>
                            <span>{element.time}</span>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="headd">Medical Procedures</h4>
                        <ul>
                        {procedures.map((element) => (
                            <li>
                            <span>{element.day}</span>
                            </li>
                        ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="headd">Contact</h4>
                        <div>
                            <FaPhone className="headd"/>
                            <span>999-999-9999</span>
                        </div>
                        <div>
                            <MdEmail className="headd"/>
                            <span>meecare@gmail.com</span>
                        </div>
                        <div>
                            <FaLocationArrow className="headd"/>
                            <span>Hoshiarpur, Punjab, India</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
