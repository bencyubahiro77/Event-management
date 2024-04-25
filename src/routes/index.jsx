import { createBrowserRouter} from "react-router-dom";
import BuyerHome from "../pages/BuyerHome";
// import AdminHome from "../pages/AdminHome";
// import BuyerBooking from "../pages/BuyerBooking";
import CreateBooking from "../pages/CreateBooking";
import Login from "../pages/Login";
import PrivateRoutes from "./privateRoute";

const router = createBrowserRouter([
  {
        path: "/",
        element: <Login />
   },
  {
    path: "/buyerDash",
    element: <BuyerHome />
  },
//   {
//     path: "/admin",
//     element: (
//       <PrivateRoutes>
//         <AdminHome />
//       </PrivateRoutes>
//     )
//   }
]);

export default router;
