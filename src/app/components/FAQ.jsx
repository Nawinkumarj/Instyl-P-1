"use client";

import { useState } from "react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Inspiration",
      answer: (
        <div className="faq-content">
          <img
            src="https://imgs.search.brave.com/sqbcPAvHMpyATtHbxDr1I5xp-oL9voRTkRJ6iVGZ7k0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9zaWxo/b3VldHRlLXVmby1z/dGFycnktc2t5LWlj/b24taWNvbi1saW5l/YXItc3R5bGUtOTQ2/NzE3MzYuanBn"
            alt="Inspiration"
            className="faq-image"
          />
          <div className="faq-text">
            <p>
              The Social Media license is needed for any commercial use of the
              font on social platforms (Instagram, YouTube, TikTok, etc.).
            </p>
            <p>
              All of our fonts are free to try for personal use as long as it is
              not used in a commercial project...
            </p>
          </div>
        </div>
      ),
      color: "#ec407a",
    },
    {
      question: "Find work",
      answer: <p>Here is how you can find work and grow your career...</p>,
      color: "#ffb74d",
    },
    {
      question: "Learn Design",
      answer: (
        <p>Resources, tutorials, and tools to learn design effectively...</p>
      ),
      color: "#ff7043",
    },
    {
      question: "Hire Designers",
      answer: <p>Connect with top designers for your projects...</p>,
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
