import { useLocation, Outlet, Navigate } from "react-router-dom";
import  useAuth  from "./useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.role?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.mail
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/dang-nhap" state={{ from: location }} replace />
    );
}

export default RequireAuth;