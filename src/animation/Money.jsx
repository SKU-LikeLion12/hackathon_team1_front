import React from "react";
import Lottie from "react-lottie-player";
import MoneyJson from "../json/Money.json";

export default function Money() {
  return <Lottie loop animationData={MoneyJson} play />;
}
