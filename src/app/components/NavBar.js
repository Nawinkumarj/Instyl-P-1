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
          <Image
            src={scrolled ? "/Instyl.webp" : "/instyl-s.png"}
            alt="Logo"
            width={100}
            height={80}
            priority
          />
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
        <Link href="/Portfolio" onClick={() => setIsOpen(false)}>
          Portfolio
        </Link>
        <Link href="/Contact" onClick={() => setIsOpen(false)}>
          Contact
        </Link>
        <Link href="/Pricelist" onClick={() => setIsOpen(false)}>
          Pricelist
        </Link>
        <Link href="/Offers" onClick={() => setIsOpen(false)}>
          Offers
        </Link>
        <Link href="/Membership" onClick={() => setIsOpen(false)}>
          Membership
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
  