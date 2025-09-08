


// "use client";
// import { useState, useEffect, useRef } from "react";
// import HTMLFlipBook from "react-pageflip";

// const BookFlip = ({ menuData = [] }) => {
//   const flipBook = useRef(null);
//   const [currentPageIndex, setCurrentPageIndex] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Calculate total pages (one category per page + covers)
//  useEffect(() => {
//    // total pages = front + back + (split pages for each category)
//    let pages = 2; // front + back
//    menuData.forEach((category) => {
//      const chunks = Math.ceil(category.items.length / 7);
//      pages += chunks;
//    });
//    setTotalPages(pages);
//  }, [menuData]);

//   const onFlip = (e) => {
//     setCurrentPageIndex(e.data);
//   };

//   const nextPage = () => {
//     if (flipBook.current) {
//       flipBook.current.getPageFlip().flipNext();
//     }
//   };

//   const prevPage = () => {
//     if (flipBook.current) {
//       flipBook.current.getPageFlip().flipPrev();
//     }
//   };

//   const goToPage = (pageNumber) => {
//     if (flipBook.current) {
//       flipBook.current.getPageFlip().flip(pageNumber);
//     }
//   };

//     const chunkArray = (arr, size) => {
//       return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
//         arr.slice(i * size, i * size + size)
//       );
//     };

//   return (
//     <div className="flipbook-container">
//       {menuData.length > 0 && (
//         <HTMLFlipBook
//           width={700}
//           height={800}
//           size="stretch"
//           minWidth={350}
//           maxWidth={650}
//           minHeight={450}
//           maxHeight={850}
//           maxShadowOpacity={0.5}
//           showCover={true}
//           mobileScrollSupport={true}
//           onFlip={onFlip}
//           ref={flipBook}
//           className="flipbook"
//         >
//           {/* Front Cover */}
//           <div className="page cover">
//             <h1>Menu Book</h1>
//             <p>Premium Dining Experience</p>
//             <p>Multiple Pricing Options</p>
//             <p>Category-wise Selection</p>
//           </div>

//           {/* Dynamic Pages */}
//           {menuData.map((category, categoryIndex) => {
//             const chunks = chunkArray(category.items, 7);
//             return chunks.map((chunk, chunkIndex) => (
//               <div key={`${categoryIndex}-${chunkIndex}`} className="page">
//                 <div className="category-page">
//                   {chunkIndex === 0 ? (
//                     <div className="category-header">
//                       <h2>{category.name}</h2>
//                       <p>{category.description}</p>
//                     </div>
//                   ) : (
//                     /* Next chunks → description only */
//                     <div className="category-header">
//                       <p>{category.description}</p>
//                     </div>
//                   )}

//                   <div className="menu-table">
//                     <div className="pricing-header">
//                       <div className="dish-column"></div>
//                       <div>Regular</div>
//                       <div>Premium</div>
//                       <div>
//                         <img src="/elite.svg" alt="" className="elite-img" />{" "}
//                         Regular
//                       </div>
//                       <div>
//                         <img src="/elite.svg" alt="" className="elite-img" />{" "}
//                         Premium
//                       </div>
//                     </div>
//                     <div className="menu-items-list">
//                       {chunk.map((item, itemIndex) => (
//                         <div key={itemIndex} className="menu-item-row">
//                           <div className="dish-info">
//                             <div className="dish-name">{item.name}</div>
//                           </div>
//                           <div className="price-cell">
//                             ₹{item.pricing.regular}
//                           </div>
//                           <div className="price-cell">
//                             ₹{item.pricing.premium}
//                           </div>
//                           <div className="price-cell">
//                             ₹{item.pricing.eliteRegular}
//                           </div>
//                           <div className="price-cell">
//                             ₹{item.pricing.elitePremium}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="page-number">
//                     Page {categoryIndex + 1} - {category.name}
//                   </div>
//                 </div>
//               </div>
//             ));
//           })}

//           {/* Back Cover */}
//           <div className="page cover back-cover">
//             <h1>Thank You</h1>
//             <p>For choosing our restaurant</p>
//             <p>Visit us again!</p>
//             <p>Enjoy our premium dining experience</p>
//           </div>
//         </HTMLFlipBook>
//       )}
//     </div>
//   );
// };


// export default function Home() {
//   const [menuData, setMenuData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate fetching categorized menu data
//     const fetchMenuData = async () => {
//       const mockData = [
//         {
//           name: "Routine Rituals",
//           description: "Waxing",
//           items: [
//             {
//               name: "Upper Lip",
//               description: "",
//               pricing: {
//                 regular: "50",
//                 premium: "110",
//                 eliteRegular: "40",
//                 elitePremium: "60",
//               },
//             },
//             {
//               name: "chin",
//               pricing: {
//                 regular: "50",
//                 premium: "110",
//                 eliteRegular: "40",
//                 elitePremium: "60",
//               },
//             },
//             {
//               name: "sides",
//               pricing: {
//                 regular: "60",
//                 premium: "220",
//                 eliteRegular: "50",
//                 elitePremium: "110",
//               },
//             },
//             {
//               name: "neck",
//               pricing: {
//                 regular: "60",
//                 premium: "220",
//                 eliteRegular: "50",
//                 elitePremium: "110",
//               },
//             },
//             {
//               name: "full face",
//               pricing: {
//                 regular: "160",
//                 premium: "300",
//                 eliteRegular: "110",
//                 elitePremium: "200",
//               },
//             },
//             {
//               name: "under arms",
//               pricing: {
//                 regular: "160",
//                 premium: "300",
//                 eliteRegular: "110",
//                 elitePremium: "200",
//               },
//             },
//             {
//               name: "full arms",
//               pricing: {
//                 regular: "300",
//                 premium: "550",
//                 eliteRegular: "200",
//                 elitePremium: "400",
//               },
//             },
//             {
//               name: "half legs",
//               pricing: {
//                 regular: "300",
//                 premium: "550",
//                 eliteRegular: "200",
//                 elitePremium: "400",
//               },
//             },
//             {
//               name: "full legs",
//               pricing: {
//                 regular: "500",
//                 premium: "800",
//                 eliteRegular: "400",
//                 elitePremium: "650",
//               },
//             },
//             {
//               name: "full back",
//               pricing: {
//                 regular: "500",
//                 premium: "800",
//                 eliteRegular: "400",
//                 elitePremium: "650",
//               },
//             },
//             {
//               name: "upper / lower back",
//               pricing: {
//                 regular: "330",
//                 premium: "500",
//                 eliteRegular: "200",
//                 elitePremium: "400",
//               },
//             },
//             {
//               name: "bikini line",
//               pricing: {
//                 regular: "650",
//                 premium: "1000",
//                 eliteRegular: "500",
//                 elitePremium: "750",
//               },
//             },
//             {
//               name: "full arms, half legs&under arms",
//               pricing: {
//                 regular: "850",
//                 premium: "1300",
//                 eliteRegular: "500",
//                 elitePremium: "1000",
//               },
//             },
//           ],
//         },

//         {
//           name: "Pizzas",
//           items: [
//             {
//               name: "Margherita Pizza",
//               pricing: {
//                 regular: "12.99",
//                 premium: "16.99",
//                 eliteRegular: "20.99",
//                 elitePremium: "25.99",
//               },
//             },
//             {
//               name: "Pepperoni Supreme",
//               pricing: {
//                 regular: "14.99",
//                 premium: "18.99",
//                 eliteRegular: "23.99",
//                 elitePremium: "28.99",
//               },
//             },
//             {
//               name: "Meat Lovers",
//               pricing: {
//                 regular: "16.99",
//                 premium: "21.99",
//                 eliteRegular: "26.99",
//                 elitePremium: "32.99",
//               },
//             },
//             {
//               name: "Hawaiian",
//               pricing: {
//                 regular: "13.99",
//                 premium: "17.99",
//                 eliteRegular: "22.99",
//                 elitePremium: "27.99",
//               },
//             },
//             {
//               name: "Vegetarian Supreme",
//               pricing: {
//                 regular: "14.99",
//                 premium: "18.99",
//                 eliteRegular: "23.99",
//                 elitePremium: "28.99",
//               },
//             },
//           ],
//         },
//         {
//           name: "Desserts",
//           items: [
//             {
//               name: "Chocolate Lava Cake",
//               pricing: {
//                 regular: "6.99",
//                 premium: "9.99",
//                 eliteRegular: "12.99",
//                 elitePremium: "16.99",
//               },
//             },
//             {
//               name: "Tiramisu",
//               pricing: {
//                 regular: "7.99",
//                 premium: "10.99",
//                 eliteRegular: "13.99",
//                 elitePremium: "17.99",
//               },
//             },
//             {
//               name: "Cheesecake",
//               pricing: {
//                 regular: "5.99",
//                 premium: "8.99",
//                 eliteRegular: "11.99",
//                 elitePremium: "15.99",
//               },
//             },
//             {
//               name: "Crème Brûlée",
//               pricing: {
//                 regular: "8.99",
//                 premium: "12.99",
//                 eliteRegular: "16.99",
//                 elitePremium: "20.99",
//               },
//             },
//           ],
//         },
//         {
//           name: "Beverages",
//           items: [
//             {
//               name: "Fresh Juice",
//               pricing: {
//                 regular: "3.99",
//                 premium: "5.99",
//                 eliteRegular: "7.99",
//                 elitePremium: "9.99",
//               },
//             },
//             {
//               name: "Specialty Coffee",
//               pricing: {
//                 regular: "2.99",
//                 premium: "4.99",
//                 eliteRegular: "6.99",
//                 elitePremium: "8.99",
//               },
//             },
//             {
//               name: "Premium Tea",
//               pricing: {
//                 regular: "2.49",
//                 premium: "3.99",
//                 eliteRegular: "5.99",
//                 elitePremium: "7.99",
//               },
//             },
//             {
//               name: "Wine Selection",
//               pricing: {
//                 regular: "6.99",
//                 premium: "9.99",
//                 eliteRegular: "14.99",
//                 elitePremium: "19.99",
//               },
//             },
//             {
//               name: "Craft Beer",
//               pricing: {
//                 regular: "4.99",
//                 premium: "7.99",
//                 eliteRegular: "10.99",
//                 elitePremium: "13.99",
//               },
//             },
//           ],
//         },
//       ];

//       // Simulate loading delay
//       setTimeout(() => {
//         setMenuData(mockData);
//         setLoading(false);
//       }, 1000);
//     };

//     fetchMenuData();
//   }, []);



//   return <BookFlip menuData={menuData} />;
// }



"use client";
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const BookFlip = ({ menuData = [] }) => {
  const flipBook = useRef(null);

  const onFlip = (e) => {
    console.log("Current Page:", e.data);
  };

  return (
    <div className="flipbook-container">
      {menuData.length > 0 && (
        <HTMLFlipBook
          width={750}
          height={850}
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
              {/* <div className="instyl-glam-card"> */}
                {/* Dish Title */}
                {/* <h3 className="instyl-glam-title">{item.packageName}</h3> */}

                {/* Main Image */}
                <div className="instyl-glam-image">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="instyl-glam-img"
                  />
                  {/* <p className="instyl-glam-image-name">
                    {item.packageDescription}
                  </p> */}
                </div>

                {/* Three Flex Images */}
                {/* <div className="instyl-glam-flex-images">
                  {(item.extraImages || []).slice(0, 3).map((img, idx) => (
                    <div key={idx} className="instyl-glam-flex-image-item">
                      <img
                        src={img.src}
                        alt={img.name}
                        className="instyl-glam-thumb-img"
                      />
                      <p>{img.name}</p>
                    </div>
                  ))}
                </div> */}
                {/* <p className="instyl-glam-description">
                  {item.mainDescription}
                </p>
                <div className="instyl-glam-price-tag">INR.{item.pricing}/-</div> */}
              {/* </div> */}
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

  // if (loading) {
  //   return (
  //     <div style={{ textAlign: "center", padding: "50px" }}>Loading...</div>
  //   );
  // }

  return <BookFlip menuData={menuData} />;
}
