import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppHoverCard from "./components/Whatsapp";
import FooterWrapper from "./components/FooterWrapper"; // client component
import MemberIcon from "./components/Member";
import Particles from "./components/Galaxy";

export const metadata = {
  title: "Instyl Hair n Bridal Studio",
  description: "A luxury hair and bridal studio in Chennai dedicated to delivering exceptional beauty experiences. Our skilled artists specialize in elegant hairstyling, flawless bridal makeup, and personalized treatments, using premium products and techniques to ensure every client looks and feels radiant for their special day. Experience timeless glamour and sophisticated care in a serene, upscale environment.",
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