import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import {useGetProfileQuery} from "../redux/apiSlices/AuthApi"

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { data: profile, isLoading, isFetching, isError } = useGetProfileQuery();

    if (isLoading || isFetching) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if (profile?.user?.role && (profile?.user?.role === "ADMIN" || profile?.user?.role === "SUPER_ADMIN")) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} />;
};

export default PrivateRoute;

