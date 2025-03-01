import { JSX } from "react";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";

interface PrivateRouteProps {
    element: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const [cookies] = useCookies(["ud"]);


    return cookies.ud ? element : <Navigate to="/signin" />;
};

export default PrivateRoute;
