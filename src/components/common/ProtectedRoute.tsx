
// components/common/ProtectedRoute.tsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isLogin = useSelector((state: RootState) => state.auth.isLogin);

  if (!isLogin) {
    return <Navigate to="/signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
