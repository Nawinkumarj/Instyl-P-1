"use client"; 

import { MoveUp } from "lucide-react";

function handleClick() {
  alert("Button clicked");
}

const Breadcrumb = () => {
  return (
    <div className="breadcrumb-container">
      <div className="breadcrumb-main">
        <div className="breadcrumb-content">
          <h1>say hello</h1>
        </div>
        <div className="breadcrumb-button">
          <button onClick={handleClick}>
            FAQ,s
            <MoveUp />
          </button>
          <button onClick={handleClick}>
            get in touch
            <MoveUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
