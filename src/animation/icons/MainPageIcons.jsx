import React from "react";
import "../../css/IconStyles.css";

const CheckIcon = () => (
  <div className="icon-container">
    <div className="green-circle">
      <div className="check-mark">✔</div>
    </div>
  </div>
);

const DotsIcon = () => (
  <div className="icon-container">
    <div className="light-green-circle">
      <div className="dots">•••</div>
    </div>
  </div>
);

export { CheckIcon, DotsIcon };
