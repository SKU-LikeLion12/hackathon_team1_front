import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import Mainpage1 from "./pages/Mainpage1";
import VerticalProgressTracker from "./pages/VerticalProgressTracker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Mainpage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mainpage1" element={<Mainpage1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
