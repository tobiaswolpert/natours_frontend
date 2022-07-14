import { useSelector } from "react-redux";
import { selectUserIsLoggedIn } from "../../store/user/user.selector";
import { Navigate, useLocation, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const location = useLocation();
  const isLoggedIn = useSelector(selectUserIsLoggedIn);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
