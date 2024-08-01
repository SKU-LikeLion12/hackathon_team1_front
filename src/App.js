import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Community from "./pages/Community";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PostPhoto from "./pages/PostPhoto";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
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
