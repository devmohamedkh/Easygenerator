
import { Routes, Route } from "react-router";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import NotFound from "./pages/404";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRouteProps";
import { PagesURL } from "./utility/pageURLs";

function App() {

  return (
    <Routes>
      <Route path={PagesURL.home} element={<PrivateRoute element={<Home />} />} />
      <Route path={PagesURL.signup} element={<PublicRoute element={<SignUp />} />} />
      <Route path={PagesURL.signin} element={<PublicRoute element={<SignIn />} />} />
      <Route path={PagesURL.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default App