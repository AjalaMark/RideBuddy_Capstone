import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostRide from "./pages/PostRide";
import Findride from "./pages/FindRide";
import BookRide from "./pages/Bookride";

const routes = [
  { path: "/home", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/postride", element: <PostRide /> },
  { path: "/findride", element: <Findride /> },
  { path: "/book-ride/:rideId", element: <BookRide /> },
];

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
