import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostRide from "./pages/PostRide";
import Findride from "./pages/FindRide";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postride" element={<PostRide />} />
          <Route path="/findride" element={<Findride />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
