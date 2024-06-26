import { createBrowserRouter } from "react-router-dom";
import BuyerHome from "../pages/BuyerHome";
import AdminHome from "../pages/AdminHome";
import BuyerBooking from "../pages/BuyerBooking";
import CreateEvent from "../pages/CreateEvent";
import Login from "../pages/Login";
import PrivateRoutes from "./privateRoute";
import AdminAllBooking from "../pages/AdminAllBooking";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/buyerDash",
    element: (
      <PrivateRoutes >
        <BuyerHome />
      </PrivateRoutes>
    )
  },
  {
    path: "/myBooking",
    element: (
      <PrivateRoutes >
        <BuyerBooking />
      </PrivateRoutes>
    )
  },
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoutes restrictedTo="Admin">
        <AdminHome />
      </PrivateRoutes>
    )
  },
  {
    path: "/admin/create",
    element: (
      <PrivateRoutes restrictedTo="Admin">
        <CreateEvent />
      </PrivateRoutes>
    )
  },
  {
    path: "/allBooking",
    element: (
      <PrivateRoutes restrictedTo="Admin">
        <AdminAllBooking />
      </PrivateRoutes>
    )
  }
]);

export default router;
