import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  const { pathname } = useLocation();
  return props.isLoggedIn ? <Component {...props} /> : <Navigate to={"/"} state={{ backUrl: pathname }} replace />;
};

export default ProtectedRouteElement;
