import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [animateButton, setAnimateButton] = useState(false);

    useEffect(() => {
        // Add the animation class after a delay (e.g., 1000 milliseconds = 1 second)
        const timer = setTimeout(() => {
            setAnimateButton(true);
        }, 500);

        // Clear the timer if the component unmounts before the delay
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home--container">
            <div className="home--conatiner--text">
                <h1 className="home--welcome">Begin Your Caravan Story Today</h1>
                <p className="home--welcome--paragraph">Whether you're dreaming of weekend getaways, cross-country road trips, or epic adventures, we invite you to begin your caravan story with us. Explore our range of caravans, connect with fellow travelers in our community, and embark on a new chapter of exploration and freedom.</p>  
            </div>
            <Link className={`home--caravan--button ${animateButton ? 'animate-slide-up' : ''}`} to="caravans">
                Find your caravan
            </Link>
        </div>
    )
}