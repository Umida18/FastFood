import { ConfigProvider } from "antd";
import "./App.css";
import { Layout } from "./components/layout";
import SignIn from "./pages/signIn";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Mahsulotlar } from "./pages/mahsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar";
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
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </ConfigProvider>
      <SignIn />
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/buyurtmalar" element={<Buyurtmalar />}></Route>
          <Route path="/maxsulotlar" element={<Mahsulotlar />}></Route>
          <Route path="/kategoriyalar" element={<Kategoriyalar />}></Route>
          <Route path="/filiallar" element={<Filiallar />}></Route>
          <Route path="/mijozlar" element={<Mijozlar />}></Route>
          <Route path="/xisobot" element={<Xisobot />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
