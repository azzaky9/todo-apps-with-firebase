import { createBrowserRouter, Navigate } from "react-router-dom";
import SignUpScreen from "./pages/SIgnUpScreen";
import SignInScreen from "./pages/SignInScreen";
import HomeScreen from "./pages/HomeScreen";
import AddNewPostScreen from "./pages/AddNewPostScreen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to='/signup' />,
  },
  {
    path: "/signup",
    element: <SignUpScreen />,
  },
  {
    path: "/signin",
    element: <SignInScreen />,
  },
  {
    path: "/homepage",
    element: <HomeScreen />,
  },
  {
    path: "/add-new-post",
    element: <AddNewPostScreen />,
  },
]);

export default router;
