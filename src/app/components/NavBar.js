"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        <Link href="/Instyl_Glam" onClick={() => setIsOpen(false)} className="nav-link-with-badge">
          Instyl Glam
          <span className="new-badge">NEW</span>
        </Link>
        <Link href="/Membership" onClick={() => setIsOpen(false)}>
          Instyl Book
        </Link>
        <Link href="/Contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
      </div>
      <div className="navbar-grid1">
        <p>
          <span>@</span>instyl_hairnbridalstudio
        </p>
        <p>
          {" "}
          <span>@</span>binduinstyl_
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
