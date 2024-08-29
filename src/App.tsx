import { ConfigProvider } from "antd";
import "./App.css";
import { Layout } from "./components/layout";
import SignIn from "./pages/signIn/signIn";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Maxsulotlar } from "./pages/maxsulotlar/maxsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar/kategoriyalar";
import Filiallar from "./pages/filiallar/filiallar";
import Mijozlar from "./pages/mijozlar/mijozlar";
import { Xisobot } from "./pages/xisobot";
import { YetkazishNarxi } from "./pages/YetkazishNarxi/YetkazishNarxi";
import { Hodimlar } from "./pages/hodimlar";
import { Buyurtmalar } from "./pages/buyurtmalar/buyurmalar";
import { Xarita } from "./pages/xarita";

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/hodimlar" element={<Hodimlar />}></Route>
          <Route path="/yetkazishNarxi" element={<YetkazishNarxi />}></Route>
          <Route path="/xarita" element={<Xarita />}></Route>
        </Route>
        <Route path="/chiqish" element={<SignIn />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
