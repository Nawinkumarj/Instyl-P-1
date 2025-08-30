"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Where is Instyl Located?",
      answer: "Instyl is located at Old Washermenpet, Chennai",
    },
    {
      question: "Do you take walk-ins?",
      answer: "Yes, but appointments are recommended to avoid waiting.",
    },
    {
      question: "What services do you offer?",
      answer: "We offer a wide range of beauty and wellness services.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">FAQ</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            {/* Question Row */}
            <button className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <img src="/plusIcon.png"
                className={`faq-icon ${openIndex === index ? "rotate" : ""}`}
              />
            </button>

            {/* Answer with animation */}
            <div
              className={`faq-answer-wrapper ${
                openIndex === index ? "open" : ""
              }`}
            >
              <p className="faq-answer">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
