import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PrivateRoutes = ({ children, restrictedTo }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("userRole");

    if (!token || (restrictedTo && userRole !== restrictedTo)) {
      localStorage.clear()
      navigate("/");
    }
  }, []);

  return children;
};

export default PrivateRoutes;
