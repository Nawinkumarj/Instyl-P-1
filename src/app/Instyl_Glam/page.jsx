"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const BookFlip = ({ menuData = [] }) => {
  const flipBook = useRef(null);

  const onFlip = (e) => {
    console.log("Current Page:", e.data);
  };

  return (
    <div className="flipbook-container" style={{
      backgroundImage: "url('/mbg.svg')",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      position: "relative",
      width: "100%",
      height: "100%",
      // zIndex: -9,
    }}>
      {menuData.length > 0 && (
        <HTMLFlipBook
          width={630}
          height={910}
          size="stretch"
          minWidth={350}
          maxWidth={650}
          minHeight={550}
          maxHeight={850}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onFlip}
          ref={flipBook}
          className="flipbook"
        >
          {/* Front Cover */}
          <div className="page cover">
            <h1>Menu Book</h1>
            <p>Premium Dining Experience</p>
            <p>Freshly Prepared Dishes</p>
          </div>

          {/* Pages */}
          {menuData.map((item, index) => (
            <div key={index} className="page">

              {/* Main Image */}
              <div className="instyl-glam-image">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="instyl-glam-img"
                />
              </div>
            </div>
          ))}

          {/* Back Cover */}
          <div className="page cover back-cover">
            <h1>Thank You</h1>
            <p>For choosing our restaurant</p>
            <p>Visit us again!</p>
          </div>
        </HTMLFlipBook>
      )}
    </div>
  );
};

export default function Home() {
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for single dish
    const fetchMenuData = async () => {
      const mockData = [
        {
          packageName: "Instyl Director Package",
          packageDescription: "Airbrush make-up",
          image: "/PriceList/glam1.png",
          extraImages: [
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "makeup",
            },
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "hairstyling",
            },
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "saree drape",
            },
          ],
          mainDescription: "",
          pricing: "8.99",
        },
        {
          packageName: "Instyl Director Package",
          packageDescription: "Airbrush make-up",
          image:
            "https://4.img-dpreview.com/files/p/E~TS590x0~articles/3925134721/0266554465.jpeg",
          extraImages: [
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "makeup",
            },
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "hairstyling",
            },
            {
              src: "https://imgs.search.brave.com/kBh53hOzMmKhsbHwi1B8vnqnTnOrYKC_V7jXoHD8fb8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzFiLzZj/LzY5LzFiNmM2OTUz/YmY1ZjBkMzk3OTg4/YWI2MTJhNGI1NGQy/LmpwZw",
              name: "saree drape",
            },
          ],
          mainDescription: "",
          pricing: "8.99",
        },
      ];

      setTimeout(() => {
        setMenuData(mockData);
        setLoading(false);
      }, 800);
    };

    fetchMenuData();
  }, []);

  return <BookFlip menuData={menuData} />;
}