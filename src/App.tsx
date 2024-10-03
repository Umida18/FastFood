import { ConfigProvider } from "antd";
import "./App.css";
import { Layout } from "./components/layout";
import SignIn from "./pages/signIn/signIn";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Maxsulotlar } from "./pages/maxsulotlar/maxsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar/kategoriyalar";
import { Filiallar } from "./pages/filiallar/filiallar";
import { Mijozlar } from "./pages/mijozlar/mijozlar";
import { YetkazishNarxi } from "./pages/YetkazishNarxi";
import { Hodimlar } from "./pages/hodimlar";
import { Buyurtmalar } from "./pages/buyurtmalar/buyurmalar";
import { Xarita } from "./pages/xarita";
import Xisobot from "./pages/xisobot/xisobot";
import { Provider } from "react-redux";
import store from "./store";
import { useState } from "react";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  children: JSX.Element;
}

// Protected route to restrict access unless logged in
const ProtectedRoute = ({ isAuthenticated, children }: ProtectedRouteProps) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Public SignIn Route */}
          <Route
            path="/"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Layout Routes */}
          <Route
            path="/layout"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Layout>
                  <Outlet />
                </Layout>
              </ProtectedRoute>
            }
          >
            {/* Nested Routes within /layout */}
            <Route path="buyurtmalar" element={<Buyurtmalar />} />
            <Route path="maxsulotlar" element={<Maxsulotlar />} />
            <Route path="kategoriyalar" element={<Kategoriyalar />} />
            <Route path="filiallar" element={<Filiallar />} />
            <Route path="mijozlar" element={<Mijozlar />} />
            <Route path="xisobot" element={<Xisobot />} />
            <Route path="hodimlar" element={<Hodimlar />} />
            <Route path="yetkazishNarxi" element={<YetkazishNarxi />} />
            <Route path="xarita" element={<Xarita />} />
          </Route>

          {/* Redirect to SignIn */}
          <Route
            path="/chiqish"
            element={<SignIn setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
