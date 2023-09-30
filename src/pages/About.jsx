import React from "react";

export default function About() {
    return (
        <div>
            <div className="about--container--1">
                <img className="about--image--1" src="images/about1.jpg" />
                <div className="about--header--1">
                    <h1 className="about--header--top">Why do we Love Caravaning</h1>
                    <p className="about--header--bottom">To love caravanning is to embrace a lifestyle that celebrates the beauty of slowing down, connecting with nature, and savoring the joy of unhurried moments spent with loved ones around a campfire. It's a reminder that life's greatest pleasures often lie in the journey itself.</p>
                </div>
            </div>

            <img className="about--image--8" src="images/about8.jpg" />

            <div className="about--container--1">
                <div>
                    <ul className="reasons--list">
                        <li>A Fleet Beyond Compare: </li>
                        <p>We boast a diverse and meticulously maintained fleet of caravans to suit every traveler's needs. From cozy couples' retreats to spacious family caravans, we have the perfect home-on-wheels waiting for you.</p>
                        <li>Top-Notch Comfort:</li>
                        <p>Our caravans are designed with your comfort in mind. Enjoy plush interiors, modern amenities, and all the conveniences of home while you're on the road.</p>
                        <li>Safety First:</li>
                        <p>Your safety is our priority. Our caravans undergo rigorous inspections, and our team ensures they are in perfect working order before each rental. You can travel with peace of mind.</p>
                    </ul>
                </div>
                <img className="about--image--2" src="images/about2.jpg" />
            </div>
            <p className="final--message">Don't wait to start your next adventure! Choose Caravan World and experience the freedom, comfort, and excitement of caravanning like never before. Your dream getaway begins with us.Ready to roll? Contact us today to book your caravan and set your course for unforgettable memories!</p>
        </div>
    )
}