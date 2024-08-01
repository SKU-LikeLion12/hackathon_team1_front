import React from "react";
import Lottie from "react-lottie-player";
import HeartJson from "../json/Heart.json";

export default function Heart() {
  return <Lottie loop animationData={HeartJson} play />;
}
