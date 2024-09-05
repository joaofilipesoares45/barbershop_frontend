import React from "react";
import { Navigate } from "react-router-dom";

export function PrivateRoute({ children }) {
    const user = localStorage.getItem('currentUser')

    return user !== null ? children : <Navigate to='/'/>
}