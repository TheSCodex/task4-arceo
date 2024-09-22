import { useRoutes, BrowserRouter as Router, Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from "./pages/Register.jsx";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("authToken");

  return isLoggedIn ? children : <Navigate to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
  ]);

  return routes;
};

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
