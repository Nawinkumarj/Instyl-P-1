


"use client";
import { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";

const BookFlip = ({ menuData = [] }) => {
  const flipBook = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Calculate total pages (one category per page + covers)
  useEffect(() => {
    setTotalPages(menuData.length + 2); // +2 for front and back covers
  }, [menuData.length]);

  const onFlip = (e) => {
    setCurrentPageIndex(e.data);
  };

  const nextPage = () => {
    if (flipBook.current) {
      flipBook.current.getPageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBook.current) {
      flipBook.current.getPageFlip().flipPrev();
    }
  };

  const goToPage = (pageNumber) => {
    if (flipBook.current) {
      flipBook.current.getPageFlip().flip(pageNumber);
    }
  };

  return (
    <div className="flipbook-container">
      {menuData.length > 0 && (
        <HTMLFlipBook
          width={500}
          height={700}
          size="stretch"
          minWidth={350}
          maxWidth={650}
          minHeight={450}
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
            <p>Multiple Pricing Options</p>
            <p>Category-wise Selection</p>
          </div>

          {/* Dynamic Pages */}
          {menuData.map((category, categoryIndex) => (
            <div key={categoryIndex} className="page">
              <div className="category-page">
                <div className="category-header">
                  <h2>{category.name}</h2>
                  <p>{category.description}</p>
                </div>
                <div className="menu-table">
                  <div className="pricing-header">
                    <div className="dish-column">Dish</div>
                    <div>Regular</div>
                    <div>Premium</div>
                    <div>Elite Regular</div>
                    <div>Elite Premium</div>
                  </div>
                  <div className="menu-items-list">
                    {category.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="menu-item-row">
                        <div className="dish-info">
                          <div className="dish-name">{item.name}</div>
                        </div>
                        <div className="price-cell">
                          ${item.pricing.regular}
                        </div>
                        <div className="price-cell">
                          ${item.pricing.premium}
                        </div>
                        <div className="price-cell">
                          ${item.pricing.eliteRegular}
                        </div>
                        <div className="price-cell">
                          ${item.pricing.elitePremium}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="page-number">
                  Page {categoryIndex + 1} - {category.name}
                </div>
              </div>
            </div>
          ))}

          {/* Back Cover */}
          <div className="page cover back-cover">
            <h1>Thank You</h1>
            <p>For choosing our restaurant</p>
            <p>Visit us again!</p>
            <p>Enjoy our premium dining experience</p>
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
    // Simulate fetching categorized menu data
    const fetchMenuData = async () => {
      const mockData = [
        {
          name: "Appetizers",
          description: "Start your meal with these delicious options",
          items: [
            {
              name: "Caesar Salad",
              description:
                "Crisp romaine lettuce with parmesan cheese and croutons",
              pricing: {
                regular: "8.99",
                premium: "12.99",
                eliteRegular: "15.99",
                elitePremium: "19.99",
              },
            },
            {
              name: "Buffalo Wings",
              description: "Spicy chicken wings served with blue cheese dip",
              pricing: {
                regular: "10.99",
                premium: "14.99",
                eliteRegular: "17.99",
                elitePremium: "22.99",
              },
            },
            {
              name: "Bruschetta",
              description: "Toasted bread topped with fresh tomatoes and basil",
              pricing: {
                regular: "7.99",
                premium: "11.99",
                eliteRegular: "14.99",
                elitePremium: "18.99",
              },
            },
            {
              name: "Shrimp Cocktail",
              description: "Fresh shrimp served with cocktail sauce",
              pricing: {
                regular: "12.99",
                premium: "16.99",
                eliteRegular: "20.99",
                elitePremium: "25.99",
              },
            },
            {
              name: "Stuffed Mushrooms",
              description: "Button mushrooms stuffed with herb cream cheese",
              pricing: {
                regular: "9.99",
                premium: "13.99",
                eliteRegular: "17.99",
                elitePremium: "21.99",
              },
            },
          ],
        },
        {
          name: "Main Courses",
          description: "Hearty dishes to satisfy your appetite",
          items: [
            {
              name: "Grilled Salmon",
              description:
                "Fresh Atlantic salmon with lemon herbs and vegetables",
              pricing: {
                regular: "18.99",
                premium: "24.99",
                eliteRegular: "29.99",
                elitePremium: "35.99",
              },
            },
            {
              name: "Ribeye Steak",
              description: "Premium cut steak grilled to perfection",
              pricing: {
                regular: "25.99",
                premium: "32.99",
                eliteRegular: "39.99",
                elitePremium: "49.99",
              },
            },
            {
              name: "Chicken Alfredo",
              description:
                "Tender chicken breast over pasta with creamy alfredo sauce",
              pricing: {
                regular: "15.99",
                premium: "19.99",
                eliteRegular: "24.99",
                elitePremium: "29.99",
              },
            },
            {
              name: "Vegetarian Lasagna",
              description: "Layers of pasta with vegetables and ricotta cheese",
              pricing: {
                regular: "13.99",
                premium: "17.99",
                eliteRegular: "21.99",
                elitePremium: "26.99",
              },
            },
            {
              name: "Lobster Tail",
              description: "Fresh lobster tail with butter and herbs",
              pricing: {
                regular: "28.99",
                premium: "35.99",
                eliteRegular: "42.99",
                elitePremium: "52.99",
              },
            },
          ],
        },
        {
          name: "Pizzas",
          description: "Hand-tossed pizzas with fresh ingredients",
          items: [
            {
              name: "Margherita Pizza",
              description:
                "Classic pizza with fresh tomatoes, mozzarella, and basil",
              pricing: {
                regular: "12.99",
                premium: "16.99",
                eliteRegular: "20.99",
                elitePremium: "25.99",
              },
            },
            {
              name: "Pepperoni Supreme",
              description:
                "Pepperoni, mushrooms, bell peppers, and extra cheese",
              pricing: {
                regular: "14.99",
                premium: "18.99",
                eliteRegular: "23.99",
                elitePremium: "28.99",
              },
            },
            {
              name: "Meat Lovers",
              description: "Pepperoni, sausage, bacon, and ham",
              pricing: {
                regular: "16.99",
                premium: "21.99",
                eliteRegular: "26.99",
                elitePremium: "32.99",
              },
            },
            {
              name: "Hawaiian",
              description: "Ham, pineapple, and extra cheese",
              pricing: {
                regular: "13.99",
                premium: "17.99",
                eliteRegular: "22.99",
                elitePremium: "27.99",
              },
            },
            {
              name: "Vegetarian Supreme",
              description:
                "Bell peppers, mushrooms, olives, onions, and tomatoes",
              pricing: {
                regular: "14.99",
                premium: "18.99",
                eliteRegular: "23.99",
                elitePremium: "28.99",
              },
            },
          ],
        },
        {
          name: "Desserts",
          description: "Sweet endings to your perfect meal",
          items: [
            {
              name: "Chocolate Lava Cake",
              description:
                "Warm chocolate cake with molten center and vanilla ice cream",
              pricing: {
                regular: "6.99",
                premium: "9.99",
                eliteRegular: "12.99",
                elitePremium: "16.99",
              },
            },
            {
              name: "Tiramisu",
              description: "Classic Italian dessert with coffee and mascarpone",
              pricing: {
                regular: "7.99",
                premium: "10.99",
                eliteRegular: "13.99",
                elitePremium: "17.99",
              },
            },
            {
              name: "Cheesecake",
              description: "New York style cheesecake with berry compote",
              pricing: {
                regular: "5.99",
                premium: "8.99",
                eliteRegular: "11.99",
                elitePremium: "15.99",
              },
            },
            {
              name: "Crème Brûlée",
              description: "Vanilla custard with caramelized sugar top",
              pricing: {
                regular: "8.99",
                premium: "12.99",
                eliteRegular: "16.99",
                elitePremium: "20.99",
              },
            },
          ],
        },
        {
          name: "Beverages",
          description: "Refreshing drinks to complement your meal",
          items: [
            {
              name: "Fresh Juice",
              description: "Orange, apple, or cranberry juice",
              pricing: {
                regular: "3.99",
                premium: "5.99",
                eliteRegular: "7.99",
                elitePremium: "9.99",
              },
            },
            {
              name: "Specialty Coffee",
              description: "Espresso, cappuccino, or latte",
              pricing: {
                regular: "2.99",
                premium: "4.99",
                eliteRegular: "6.99",
                elitePremium: "8.99",
              },
            },
            {
              name: "Premium Tea",
              description: "Selection of fine teas from around the world",
              pricing: {
                regular: "2.49",
                premium: "3.99",
                eliteRegular: "5.99",
                elitePremium: "7.99",
              },
            },
            {
              name: "Wine Selection",
              description: "Red, white, or rosé wine by the glass",
              pricing: {
                regular: "6.99",
                premium: "9.99",
                eliteRegular: "14.99",
                elitePremium: "19.99",
              },
            },
            {
              name: "Craft Beer",
              description: "Selection of local and imported craft beers",
              pricing: {
                regular: "4.99",
                premium: "7.99",
                eliteRegular: "10.99",
                elitePremium: "13.99",
              },
            },
          ],
        },
      ];

      // Simulate loading delay
      setTimeout(() => {
        setMenuData(mockData);
        setLoading(false);
      }, 1000);
    };

    fetchMenuData();
  }, []);

  // if (loading) {
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         height: "100vh",
  //         fontSize: "1.2rem",
  //         color: "#7f8c8d",
  //         background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
  //       }}
  //     >
  //       Loading menu data...
  //     </div>
  //   );
  // }

  return <BookFlip menuData={menuData} />;
}
