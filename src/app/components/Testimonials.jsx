import { CgProfile } from "react-icons/cg";


const testimonialData = [
  {
    text: `Fantastic service and friendly staff. My hair has never felt better!`,
    name: "Tusmitha Gunabalan",
    tag: "#instylifed",
  },
  {
    text: `The best keratin treatment I’ve ever had. So smooth and shiny.`,
    name: "Aruna Devi",
    tag: "#instylifed",
  },
  {
    text: `The hairstylist was very professional and gave me exactly what I wanted.`,
    name: "Shruthi Menon",
    tag: "#instylifed",
  },
  {
    text: `Highly recommended salon! Affordable and amazing quality.`,
    name: "Neha Bhatia",
    tag: "#instylifed",
  },
  {
    text: `My go-to place for hair care now. Never disappointed!`,
    name: "Sanjana Rao",
    tag: "#instylifed",
  },
  {
    text: `Wonderful ambiance and talented staff.`,
    name: "Kavitha S",
    tag: "#instylifed",
  },
];

const TestimonialRow = ({ data, direction = "left" }) => {
  const duplicated = [...data, ...data]; // once only
  return (
    <div className="testi-scroll-wrapper">
      <div
        className={`testi-scroll-track ${
          direction === "right" ? "scroll-right" : "scroll-left"
        }`}
      >
        {duplicated.map((item, index) => (
          <div className="test-content" key={index}>
            <div className="test-descrip">
              <p>{item.text}</p>
            </div>
            <div className="test-name">
              <CgProfile color="white" size={30} />
              <h2>{item.name}</h2>
            </div>
            <div className="test-branding">
              <h1>{item.tag}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export const Testimonials = () => {

 const mid = Math.ceil(testimonialData.length / 2);
 const firstRow = testimonialData.slice(0, mid);
 const secondRow = testimonialData.slice(mid);

 // Optional: pad second row to match first row's length
 while (secondRow.length < firstRow.length) {
   secondRow.push(firstRow[0]);
 }


  return (
    <div className="testimonial-container">
      <div className="test-main">
        <div className="test-head">
          <h1>What Client speak about us</h1>
        </div>
        <TestimonialRow data={firstRow} direction="left" />
        <TestimonialRow data={secondRow} direction="right" />
      </div>
    </div>
  );
};
