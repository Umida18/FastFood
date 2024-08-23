import { ConfigProvider } from "antd";
import "./App.css";
import { Layout } from "./components/layout";
import SignIn from "./pages/signIn/signIn";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
<<<<<<< HEAD
import { Maxsulotlar } from "./pages/maxsulotlar/maxsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar/kategoriyalar";
=======
import { Mahsulotlar } from "./pages/maxsulotlar";
import { Kategoriyalar } from "./pages/kategoriyalar";
>>>>>>> cc6de8b4bb4eb7fa18428171f77f98fa444a2a2a
import { Filiallar } from "./pages/filiallar";
import { Mijozlar } from "./pages/mijozlar";
import { Xisobot } from "./pages/xisobot";
import { Buyurtmalar } from "./pages/buyurtmalar";
import { Xarita } from "./pages/xarita";
import { YetkazishNarxi } from "./pages/YetkazishNarxi";
import { LavozimSozlamalari } from "./pages/lavozimSozlamalari";
import { Hodimlar } from "./pages/hodimlar";

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
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
=======
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
          <Route path="/maxsulotlar" element={<Mahsulotlar />}></Route>
          <Route path="/kategoriyalar" element={<Kategoriyalar />}></Route>
          <Route path="/filiallar" element={<Filiallar />}></Route>
          <Route path="/mijozlar" element={<Mijozlar />}></Route>
          <Route path="/xisobot" element={<Xisobot />}></Route>
          <Route path="/hodimlar" element={<Hodimlar />}></Route>
          <Route
            path="/lavozimSozlamalari"
            element={<LavozimSozlamalari />}
          ></Route>
          <Route path="/yetkazishNarxi" element={<YetkazishNarxi />}></Route>
          <Route path="/xarita" element={<Xarita />}></Route>
        </Route>
        <Route path="/chiqish" element={<SignIn />}></Route>
      </Routes>
>>>>>>> cc6de8b4bb4eb7fa18428171f77f98fa444a2a2a
    </BrowserRouter>
  );
}

export default App;
