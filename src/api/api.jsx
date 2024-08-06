import axios from "axios";

export default function api() {
  const token = localStorage.getItem("token");

  //baseURL 설정 전
  const instance = axios.create({ baseURL: "https://team1back.sku-sku.com" });

  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return instance;
}
