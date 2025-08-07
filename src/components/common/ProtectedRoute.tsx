// components/common/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // e.g., ["admin", "manager"]
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLogin, user } = useSelector((state: RootState) => state.auth);

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
