import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "src/sections/auth/utils/useAuth";

export const ProtectedLayout = () => {
  const { authUser } = useAuth();
  const outlet = useOutlet();

  if (!authUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      { outlet }
    </div>
  )
};