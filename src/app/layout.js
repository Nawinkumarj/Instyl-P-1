import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppHoverCard from "./components/Whatsapp";
import FooterWrapper from "./components/FooterWrapper"; // client component
import MemberIcon from "./components/Member";
import Aurora from "./components/Aurora";
import Plasma from "./components/Plasma";
import Particles from "./components/Galaxy";
import Image from "next/image";

export const metadata = {
  title: "Instyl Hair n Bridal Studio",
  description: "#",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Particles
          particleColors={["#ffffff", "#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
        {/* <Plasma
          color="#9c27b0"
          speed={0.6}
          direction="forward"
          scale={1}
          opacity={0.8}
          mouseInteractive={true}
        /> */}
        {/* <Aurora
          colorStops={["#f8dfef", "#ffd6e8", "#9c27b0"]}
          blend={0.5}
          amplitude={0.5}
          speed={0.9}
        /> */}
        <Navbar />
        <WhatsAppHoverCard />
        <MemberIcon />

        <div className="main-content" style={{ paddingLeft: "220px" }}>
          <main>{children}</main>
          <FooterWrapper />
        </div>
      </body>
    </html>
  );
}