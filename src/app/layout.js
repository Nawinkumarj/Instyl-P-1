import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import WhatsAppHoverCard from "./components/Whatsapp";
import FooterWrapper from "./components/FooterWrapper"; // client component
import MemberIcon from "./components/Member";

export const metadata = {
  title: "Instyl Hair n Bridal Studio",
  description: "#",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <WhatsAppHoverCard />
        <MemberIcon/>

        <div className="main-content" style={{ paddingLeft: "220px" }}>
          <main>{children}</main>
          <FooterWrapper /> 
        </div>
      </body>
    </html>
  );
}
