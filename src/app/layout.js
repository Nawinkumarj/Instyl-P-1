  import "./globals.css";
  import Navbar from "./components/NavBar";
  import  Footer  from "./components/Footer";

  export const metadata = {
    title: "Instyl Hair n Bridal Studio",
    description: "#",
  };

  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <Navbar />
          <div style={{ paddingLeft: "220px" }}>
            <main>{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    );
  }
