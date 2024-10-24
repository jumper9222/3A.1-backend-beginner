import { Navigate, Outlet, useNavigate } from 'react-router-dom';
export default function ReqAuth() {
    const authToken = localStorage.getItem("authToken");

    if (authToken) {
        return <Outlet />;
    } else {
        <Navigate to="/" replace />
    }
}