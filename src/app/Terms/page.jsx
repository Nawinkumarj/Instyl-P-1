


const TermsConditionData = [
  {
    id: 1,
    title: " Introduction",
    content: `
      <p>Welcome to EEBEDCS, an engineering and design consultancy firm providing professional services
      across various domains including civil, mechanical, electrical, and architectural design.</p>
      <p>By accessing or using our services, you agree to be bound by these Terms & Conditions. If you do
       not agree with any part of the terms, you must not use our services.</p>
      
    `,
  },
  {
    id: 2,
    title: "Services",
    content: `
       <p>We provide consulting, design, drafting, planning, and related engineering solutions as per client
       requirements. All services are customized based on the project scope and agreed-upon deliverables.</p>
    `,
  },
  {
    id: 3,
    title: "Client Responsibilities",
    content: `
     <ul>
        <li>Provide clear project requirements, timelines, and access to necessary information.</li>
        <li>Review deliverables and provide timely feedback.</li>
        <li>Ensure all regulatory, statutory, or third-party approvals are obtained as needed unless agreed otherwise.</li>
      </ul>
    `,
  },
  {
    id: 4,
    title: " Payment Terms",
    content: `
      <ul>
        <li>All invoices must be paid within [15/30] days from the invoice date unless otherwise stated.</li>
        <li>A late fee of % per month may be applied to overdue payments.</li>
        <li>Project commencement may require an upfront deposit or milestone-based payments.</li>
      </ul>
    `,
  },
  {
    id: 5,
    title: "Intellectual Property",
    content: `
     <ul>
        <li>All design concepts, reports, drawings, and documentation remain the intellectual property of EEBEDCS unless otherwise agreed in writing.</li>
        <li>Final deliverables may be transferred to the client upon full payment.</li>
      </ul>
    `,
  },
  {
    id: 6,
    title: "Confidentiality",
    content: `
     <p>We maintain strict confidentiality regarding all client data, project details, and proprietary
      information. Non-disclosure agreements (NDAs) can be signed upon request.</p>
    `,
  },
  {
    id: 7,
    title: "Limitation of Liability",
    content: `
     <ul>
        <li>EEBEDCS shall not be liable for indirect, incidental, or consequential damages.</li>
        <li>Our liability is limited to the amount paid by the client for the specific service causing the issue.</li>
      </ul>
    `,
  },
  {
    id: 8,
    title: "Termination",
    content: `
     <p>Either party may terminate the engagement with [15/30] days' notice. In such a case, the client shall pay for all work completed up to the termination date.</p>
    `,
  },
  {
    id: 9,
    title: "Governing Law",
    content: `
     <p>These Terms shall be governed in accordance with the laws of [Tamil Nadu / India].</p>
    `,
  },
];



const TermsCondition = () => {
  return (
    <div className="privacy-policy-container">
      <h1 className="t-c-title">Terms & Conditions</h1>
      {TermsConditionData.map((section) => (
        <div className="privacy-card" key={section.id}>
          <div className="number-badge">{section.id}</div>
          <div className="text-content">
            <h3 className="section-title">{section.title}</h3>
            <strong className="subtitle">{section.subtitle}</strong>
            {/* <div className="content-box">{section.content}</div> */}
            <div
              className="content-box"
              dangerouslySetInnerHTML={{ __html: section.content }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TermsCondition;
