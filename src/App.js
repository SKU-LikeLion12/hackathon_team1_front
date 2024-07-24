import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BasicInfo from "./pages/BasicInfo";
import FindId from "./pages/FindId";
import FindIdFailure from "./pages/FindIdFailure";
import FindIdSuccess from "./pages/FindIdSuccess";
import ResetPasswordAuth from "./pages/ResetPasswordAuth";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<BasicInfo />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findfail" element={<FindIdFailure />} />
          <Route path="/findsuccess" element={<FindIdSuccess />} />
          <Route path="/resetauth" element={<ResetPasswordAuth />} />
          <Route path="/resetpw" element={<ResetPassword />} />
          <Route path="/resetsuccess" element={<ResetPasswordSuccess />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
