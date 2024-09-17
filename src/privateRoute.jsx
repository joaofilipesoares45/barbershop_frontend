import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export function PrivateRoute() {
    const user = localStorage.getItem('currentUser')

    return !!user ? <Outlet /> : <Navigate to='/barbershop_frontend/'/>
}