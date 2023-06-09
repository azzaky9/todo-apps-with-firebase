import { createBrowserRouter } from "react-router-dom";
import SignUpScreen from "./pages/SIgnUpScreen";
import SignInScreen from "./pages/SignInScreen";
import AddNewPostScreen from "./pages/AddNewPostScreen";
import RootLayouts from "./layouts/RootLayouts";
import RenderPost from "./components/RenderPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayouts />,
  },
  {
    path: "/:IdPost",
    element: <RenderPost />,
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
    path: "/add-new-post",
    element: <AddNewPostScreen />,
  },
]);

export default router;
