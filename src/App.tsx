import { ConfigProvider } from "antd";
import "./App.css";
import { Layout } from "./components/layout";
import SignIn from "./pages/signIn/signIn";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Maxsulotlar } from "./pages/maxsulotlar/maxsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar/kategoriyalar";
import { Filiallar } from "./pages/filiallar";
// import { Buyurtmalar } from "./pages/buyurtmalar";
import { Mijozlar } from "./pages/mijozlar";
import { Xisobot } from "./pages/xisobot";
import { Buyurtmalar } from "./pages/buyurtmalar";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Routes>
          <Route path="/login" element={<SignIn />}></Route>
          <Route
            path="/"
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route path="/buyurtmalar" element={<Buyurtmalar />}></Route>
            <Route path="/maxsulotlar" element={<Maxsulotlar />}></Route>
            <Route path="/kategoriyalar" element={<Kategoriyalar />}></Route>
            <Route path="/filiallar" element={<Filiallar />}></Route>
            <Route path="/mijozlar" element={<Mijozlar />}></Route>
            <Route path="/xisobot" element={<Xisobot />}></Route>
          </Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
