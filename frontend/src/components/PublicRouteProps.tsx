import { JSX } from "react";
import { Navigate } from "react-router";
import { useCookies } from "react-cookie";

interface PublicRouteProps {
    element: JSX.Element;
    restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element }) => {
    const [cookies] = useCookies(["ud"]);


    return cookies.ud ? <Navigate to="/" /> : element;
};

export default PublicRoute;