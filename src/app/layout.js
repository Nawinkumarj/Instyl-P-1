import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppHoverCard from "./components/Whatsapp";
import FooterWrapper from "./components/FooterWrapper"; // client component
import MemberIcon from "./components/Member";
import Aurora from "./components/Aurora";
import Plasma from "./components/Plasma";

export const metadata = {
  title: "Instyl Hair n Bridal Studio",
  description: "#",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Plasma
          color="#9c27b0"
          speed={0.6}
          direction="forward"
          scale={2}
          opacity={0.6}
          mouseInteractive={true}
        />
        {/* <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
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
