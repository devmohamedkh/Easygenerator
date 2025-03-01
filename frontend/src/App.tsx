
import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRouteProps";
import { PagesURL } from "./utility/pageURLs";

function App() {

  return (
    <Routes>
      <Route path={PagesURL.home} element={<PrivateRoute element={<Home />} />} />
      <Route path={PagesURL.signup} element={<PublicRoute element={<SignUp />} />} />
      <Route path={PagesURL.signin} element={<PublicRoute element={<SignIn />} />} />
    </Routes>
  )
}

export default App