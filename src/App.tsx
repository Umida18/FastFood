import { ConfigProvider } from "antd";
import "./App.css";
import SignIn from "./pages/signIn";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
