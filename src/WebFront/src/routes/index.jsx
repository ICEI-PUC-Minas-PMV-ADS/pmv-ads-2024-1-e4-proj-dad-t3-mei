import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Home from "../pages/Home/Home";
import Cadastrar from "../pages/Auth/Cadastrar";
import Login from "../pages/Auth/Login";
import Recuperar from "../pages/Auth/Recuperar";
import MeuMei from "../pages/MeuMei/MeuMei";
import Gerenciamento from "../pages/Gerenciamento/Gerenciamento";
import Registros from "../pages/Registros/Registros";
import Perfil from "../pages/Perfil/Perfil";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/recuperar",
      element: <Recuperar />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "/meumei",
          element: <MeuMei />,
        },
        {
          path: "/gerenciamento",
          element: <Gerenciamento />,
        },
        {
          path: "/registros",
          element: <Registros />,
        },
        {
          path: "/perfil",
          element: <Perfil />,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/cadastrar",
      element: <Cadastrar />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/recuperar",
      element: <Recuperar />,
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
