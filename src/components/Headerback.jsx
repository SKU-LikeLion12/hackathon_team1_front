import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Header() {
  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px",
    borderBottom: "1px solid #ccc",
  };

  const logoStyle = {
    height: "65px",
    margin: "0 auto", // 로고 가운데 정렬
  };

  return (
    <div style={headerStyle}>
      <FaArrowLeft className="text-lg" />
      <img src="/image/Logo.png" style={logoStyle} alt="Logo" />
      <div style={{ width: "24px" }} />
    </div>
  );
}
