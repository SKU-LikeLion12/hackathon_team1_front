import "./App.css";
import { BrowserRouter, Route, Routes, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";

import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import MainStatus from "./pages/MainpageStatus";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BasicInfo from "./pages/BasicInfo";
import FindId from "./pages/FindId";
import FindIdSuccess from "./pages/FindIdSuccess";
import ResetPasswordAuth from "./pages/ResetPasswordAuth";
import Community from "./pages/Community";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PostPhoto from "./pages/PostPhoto";
import "./fonts/fonts.css";

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to="/login" />;
};

const PublicRoute = ({ element }) => {
  const token = localStorage.getItem("token");
  return !token ? element : <Navigate to="/main" />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/mypage"
            element={<PrivateRoute element={<Mypage />} />}
          />

          <Route
            path="/main"
            element={<PrivateRoute element={<Mainpage />} />}
          />
          <Route
            path="/mainstatus"
            element={<PrivateRoute element={<MainStatus />} />}
          />
          <Route path="/login" element={<PublicRoute element={<Login />} />} />
          <Route
            path="/signup"
            element={<PublicRoute element={<SignUp />} />}
          />
          <Route
            path="/info"
            element={<PublicRoute element={<BasicInfo />} />}
          />
          <Route
            path="/findid"
            element={<PublicRoute element={<FindId />} />}
          />
          <Route
            path="/findsuccess"
            element={<PublicRoute element={<FindIdSuccess />} />}
          />
          <Route
            path="/resetauth"
            element={<PublicRoute element={<ResetPasswordAuth />} />}
          />

          <Route
            path="/community"
            element={<PrivateRoute element={<Community />} />}
          />
          <Route
            path="/post/:postId"
            element={<PrivateRoute element={<PostDetail />} />}
          />
          <Route path="/post" element={<PrivateRoute element={<Post />} />} />
          <Route
            path="/postdetail"
            element={<PrivateRoute element={<PostDetail />} />}
          />
          <Route
            path="/postphoto"
            element={<PrivateRoute element={<PostPhoto />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
