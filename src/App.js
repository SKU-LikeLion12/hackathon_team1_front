import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";


function App() {
  return (
    <div className="App text-red-500">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Mainpage/>} />
          <Route path="/mypage" element={<Mypage/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
