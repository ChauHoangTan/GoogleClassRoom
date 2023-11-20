import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
    const { userInfo } = useSelector(
        (state) => state.userLogin
    );
    
    return userInfo?.Authorization ? <Outlet /> : <Navigate to="/" />;
};

export { ProtectedRouter };