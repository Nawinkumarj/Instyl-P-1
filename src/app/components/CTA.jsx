import Image from "next/image";

export default function CTA() {
    return (
      <div className="cta-container">
        <div className="cta-main">
          <div className="cta-main-icon">
            <Image src="/Instyl.webp" width={50} height={50} alt="" />
          </div>
          <div className="cta-content-call">
            <h1>Ready to Transform your scheduling?</h1>
            <p>
              Join thousands of professionals wo had already streamined their
              scheduling wuth our AI assed
            </p>
          </div>
          <div className="cta-button">
            <button class="animated-button">
              <svg
                viewBox="0 0 24 24"
                class="arr-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
              <span class="text">Get Started</span>
              <span class="circle"></span>
              <svg
                viewBox="0 0 24 24"
                class="arr-1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
}