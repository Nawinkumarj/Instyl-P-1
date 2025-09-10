"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Where is your studio located?",
      answer: (
        <div className="faq-content">
          <img
            src="/faq1.png"
            alt="Inspiration"
            className="faq-image"
          />
          <ul className="faq-text">
            <li> We are located at Old Washermenpet.</li>
            <li> Our studio is easily accessible via public (Sir Thiyagaraya College Metro) and private transport.</li>
          </ul>
        </div>
      ),
      color: "#ec407a",
    },
    {
      question: "What services do you Instyl offer?",
      answer: ( <div className="faq-content">
      <img
        src="/faq1.png"
        alt="Inspiration"
        className="faq-image"
      />
      <ul className="faq-text">
        <li> Haircuts & Hair Styling</li>
        <li> Hair Coloring % Hair Treatments</li>
        <li> Bridal Makeup & Hairstyling</li>
        <li> Facials, Threading & Waxing</li>
      </ul>
    </div>),
      color: "#ffb74d",
    },
    {
      question: "Do Instyl offer bridal packages?",
      answer: ( <div className="faq-content">
        <img
          src="/faq1.png"
          alt="Inspiration"
          className="faq-image"
        />
        <ul className="faq-text">
          <li> Yes! We offer customizable bridal packages that include makeup, hair styling, saree draping, pre-bridal skin care, and more. We also offer packages for destination weddings and group bookings.</li>
        </ul>
      </div>),
      color: "#ff7043",
    },
    {
      question: "How early should I book my bridal appointment?",
      answer: ( <div className="faq-content">
        <img
          src="/faq1.png"
          alt="Inspiration"
          className="faq-image"
        />
        <ul className="faq-text">
          <li> We recommend booking at least 2–3 Weeks in advance to secure your preferred date, especially during peak wedding season in Chennai.</li>
        </ul>
      </div>),
      color: "#ab47bc",
    },
    {
      question: "How can I book an appointment?",
      answer: ( <div className="faq-content">
        <img
          src="/faq1.png"
          alt="Inspiration"
          className="faq-image"
        />
        <ul className="faq-text">
          <li> You can book online through our website, call us at 8056168713, or message us on WhatsApp. A 50% advance may be required to confirm your appointment.</li>
        </ul>
      </div>),
      color: "#ab47bc",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <div className="faq-heading">
        <h1>FAQ'S</h1>
      </div>
      <div className="faq-main">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-wrapper">
            <div
              className={`faq-item ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="faq-question">{faq.question}</h3>
              <div
                className={`faq-answer-wrapper ${
                  openIndex === index ? "open" : ""
                }`}
              >
                {faq.answer}
              </div>
            </div>
            {/* External round button */}
            <button
              className={`faq-toggle ${openIndex === index ? "open" : ""}`}
              style={{ backgroundColor: faq.color }}
              onClick={() => toggleFAQ(index)}
            >
              <div className="plus-minus-icon">
                <span className="line line1"></span>
                <span className="line line2"></span>
                <span className="line line3"></span>
                <span className="line line4"></span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
