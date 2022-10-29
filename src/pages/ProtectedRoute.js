// Imports
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

// Component
const ProtectedRoute = ({ children }) => {

	// Store
	const { user } = useSelector((store) => { return store.user; });

    // Returns
	if (!user){
		return <Navigate to="/landing"/>;
	}
    return children;
    
};

// Export
export default ProtectedRoute;