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
import InstructorRoute from "./InstructorRoute.jsx";
import AddClass from "../pages/Dashboard/AddClass/AddClass.jsx";
import ManageClasses from "../pages/Dashboard/ManageClasses/ManageClasses.jsx";
import UpdateClass from "../pages/Dashboard/UpdateClass/UpdateClass.jsx";

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
            {
                path: "manage-classes",
                element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
            },
            // instructor routes
            {
                path: "add-class",
                element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
            },
            {
                path: "my-classes",
                element: <InstructorRoute><MyClasses></MyClasses></InstructorRoute>
            },
            {
                path: "update-class/:id",
                element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>,
                loader: ({params}) => fetch(`http://localhost:3000/class/${params.id}`)
            }
        ]
    }
]);