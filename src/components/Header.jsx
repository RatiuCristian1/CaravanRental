import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header>
        <Link className="site--logo" to="/" >
            <div className="site--logo--image">
            </div>
            {/* <img src="/assets/images/alpina_Caravan_cover.jpg" /> */}
        </Link>
            <nav className="navigation--el">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/caravans">Caravans</Link>
                <Link to="/login"><span className="material-symbols-outlined">account_circle</span></Link>
            </nav>
        </header>
    )
}