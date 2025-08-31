"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Real-time clock effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <nav className={`navbar-container ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-header">
        <div className="navbar-logo">
          <div className="logo-wrapper">
            {/* Full logo */}
            <Image
              src="/Instyl.webp"
              alt="Large Logo"
              fill
              className={`logo-image large ${scrolled ? "visible" : "hidden"}`}
              style={{ objectFit: "contain" }}
              priority
            />

            {/* Small logo */}
            <Image
              src="/instyl-s.png"
              alt="Small Logo"
              fill
              className={`logo-image small ${!scrolled ? "visible" : "hidden"}`}
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </div>

        {/* Hamburger button */}
        <button className="hamburger" onClick={toggleMenu}>
          {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
        </button>
      </div>

      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <Link href="/" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link href="/About" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <Link href="/Services" onClick={() => setIsOpen(false)}>
          Services
        </Link>
        <Link href="/Portfolio" onClick={() => setIsOpen(false)}>
          Portfolio
        </Link>
        <Link href="/Offers" onClick={() => setIsOpen(false)}>
          Offers
        </Link>
        <Link href="/Membership" onClick={() => setIsOpen(false)}>
          Instyl Book
        </Link>
        <Link href="/Instyl_Glam" onClick={() => setIsOpen(false)} className="nav-link-with-badge">
          Instyl Glam
          <span className="new-badge">NEW</span>
        </Link>
        <Link href="/Contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
      </div>
      
      <div className="navbar-grid1">
        <p>
          <span>@</span>instylhairnbridalstudio
        </p>
        <p>
          <span>@</span>instylwithbindu
        </p>
        
        {/* Location and Time  */}
        <div className="location-time-section">
          <div className="location">
            <span className="location-icon">📍</span>
            <span className="location-span">Chennai, Tamil Nadu</span>
          </div>
          <div className="current-time">
            <span className="time-icon">🕒</span>
            <span className="location-span">{formatTime(currentTime)}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
