import { createBrowserRouter,} from "react-router-dom";
import Main from "../Layout/Main.jsx";
import Home from "../pages/Home/Home.jsx";
import SignUp from "../pages/SignUp/SignUp.jsx";
import Login from "../pages/Login/Login.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import Dashboard from "../Layout/Dashboard.jsx";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers.jsx";
import AdminRoute from "./AdminRoute.jsx";
import StudentRoute from "./StudentRoute.jsx";
import MyClasses from "../pages/Dashboard/MyClasses/MyClasses.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "signup",
                element: <SignUp></SignUp>
            },
            {
                path: "login",
                element: <Login></Login>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // admin routes
            {
                path: "manage-users",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            // student routes
            {
                path: "my-classes",
                element: <StudentRoute><MyClasses></MyClasses></StudentRoute>
                // element: <MyClasses></MyClasses>
            }
        ]
    }
]);