export default function PriceList() {
  return (
    <div className="Pricelist-container">
      <div className="Pricelist-main">
        <div className="cover">
          <div className="book">
            {/* Cover Page */}
            <label htmlFor="page-1" className="book__page book__page--1">
              <img src="/Instyl.webp" alt="Price List Cover" />
            </label>

            {/* Page 3 (Right Side) */}
            <label htmlFor="page-2" className="book__page book__page--4">
              <div className="page__content">
                <h1 className="page__content-title">Service Details</h1>
                <table className="page__content-table">
                  <tbody>
                    <tr>
                      <td align="left">Haircut</td>
                      <td align="right">₹500</td>
                    </tr>
                    <tr>
                      <td align="left">Hair Coloring</td>
                      <td align="right">₹1500</td>
                    </tr>
                    <tr>
                      <td align="left">Facial</td>
                      <td align="right">₹1200</td>
                    </tr>
                    <tr>
                      <td align="left">Manicure</td>
                      <td align="right">₹600</td>
                    </tr>
                    <tr>
                      <td align="left">Pedicure</td>
                      <td align="right">₹800</td>
                    </tr>
                  </tbody>
                </table>
                <div className="page__number">3</div>
              </div>
            </label>

            {/* Radio Controls */}
            <input type="radio" name="page" id="page-1" />
            <input type="radio" name="page" id="page-2" />

            {/* Page 1-2 (Left Side) */}
            <label className="book__page book__page--2">
              <div className="book__page-front">
                <div className="page__content">
                  <h1 className="page__content-book-title">InStyl</h1>
                  <h2 className="page__content-author">Salon & Studio</h2>
                  <p className="page__content-credits">
                    Curated Price List
                    <span>Updated July 2025</span>
                  </p>
                  <div className="page__content-copyright">
                    <p>© InStyl</p>
                    <p>All Rights Reserved</p>
                  </div>
                </div>
              </div>

              <div className="book__page-back">
                <div className="page__content">
                  <h1 className="page__content-title">Services Overview</h1>
                  <table className="page__content-table">
                    <tbody>
                      <tr>
                        <td align="left">Basic Makeup</td>
                        <td align="right">₹2000</td>
                      </tr>
                      <tr>
                        <td align="left">Bridal Makeup</td>
                        <td align="right">₹15000</td>
                      </tr>
                      <tr>
                        <td align="left">Hair Spa</td>
                        <td align="right">₹1000</td>
                      </tr>
                      <tr>
                        <td align="left">Detan Pack</td>
                        <td align="right">₹700</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                      <tr>
                        <td align="left">Body Polishing</td>
                        <td align="right">₹3500</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="page__number">2</div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
