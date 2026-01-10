import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface protectedRouteProps {
  children: React.ReactNode;
}

const protectedRoute = ({children}: protectedRouteProps) =>{
    const {isAuthenticated, loading} = useAuth();
    if(loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border border-t-4 border-b-4 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        )
    } 
}

export default protectedRoute