import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import Mainpage from "./pages/Mainpage";
import Mypage from "./pages/Mypage";
import Mainpage1 from "./pages/Mainpage1";
import VerticalProgressTracker from "./pages/VerticalProgressTracker";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import BasicInfo from "./pages/BasicInfo";
import FindId from "./pages/FindId";
import FindIdFailure from "./pages/FindIdFailure";
import FindIdSuccess from "./pages/FindIdSuccess";
import ResetPasswordAuth from "./pages/ResetPasswordAuth";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordSuccess from "./pages/ResetPasswordSuccess";
import ModalTest from "./pages/ModalTest";
import Community from "./pages/community";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PostPhoto from "./pages/PostPhoto";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/main" element={<Mainpage />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mainpage1" element={<Mainpage1 />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/info" element={<BasicInfo />} />
          <Route path="/findid" element={<FindId />} />
          <Route path="/findfail" element={<FindIdFailure />} />
          <Route path="/findsuccess" element={<FindIdSuccess />} />
          <Route path="/resetauth" element={<ResetPasswordAuth />} />
          <Route path="/resetpw" element={<ResetPassword />} />
          <Route path="/resetsuccess" element={<ResetPasswordSuccess />} />
          <Route path="/modal" element={<ModalTest />} />

          <Route path="/community" element={<Community />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/postdetail" element={<PostDetail />} />
          <Route path="/postphoto" element={<PostPhoto />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
