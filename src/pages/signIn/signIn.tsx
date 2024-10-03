import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  message,
} from "antd";
import img1 from "../../img/signIn.png";
import { useNavigate } from "react-router";
import "./signIn.css";
import axios from "axios";

interface IData {
  email: string;
  parol: number;
}

interface SignInProps {
  setIsAuthenticated: (authenticated: boolean) => void;
}

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<IData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://544287c7d245201c.mokky.dev/SingIn"
        );
        setData(response.data);
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handeSubmit = async () => {
    if (!email || !password) {
      message.error("Iltimos, email va parolni kiriting!");
      return;
    }

    setLoading(true);

    try {
      const user = data.find(
        (item) => item.email === email && item.parol.toString() === password
      );

      if (user) {
        message.success("Muvaffaqiyatli tizimga kirildi");
        setIsAuthenticated(true);
        navigate("/layout/buyurtmalar");
      } else {
        message.error("Email yoki parol noto'g'ri");
      }
    } catch (error) {
      message.error("Tizimga kirishda xato yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleActiveInp = (item: string) => {
    setActiveInput(item);
  };

  const handleBlur = () => {
    setActiveInput(null);
  };

  return (
    <div className="!h-[100vh] p-0">
      <Row>
        <Col span={13} className="w-full">
          <img
            src={img1}
            alt="Sign In"
            className="w-full"
            style={{ objectFit: "cover", height: "100vh" }}
          />
        </Col>
        <Col
          span={11}
          style={{
            backgroundColor: "#F6F6F6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ marginLeft: "8px" }}>
            <Typography
              style={{
                color: "#2D3A45",
                fontSize: "24px",
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Tizimga xush kelibsiz!
            </Typography>
            <Typography
              style={{
                color: "#8D9BA8",
                fontSize: "16px",
                width: "311px",
                textAlign: "left",
              }}
            >
              Tizimga kirish uchun, login va parol orqali autentifikatsiya
              jarayonidan o’ting
            </Typography>
          </div>
          <Form
            style={{
              width: "300px",
              backgroundColor: "white",
              marginBlock: 20,
              padding: "6px",
            }}
          >
            <Form.Item
              className={activeInput === "email" ? "selectedInput" : ""}
              style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Input
                type="email"
                placeholder="fastfood@gmail.com"
                style={{ border: "0px" }}
                onFocus={() => handleActiveInp("email")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleBlur}
                className={activeInput === "email" ? "selectedInput" : ""}
              />
            </Form.Item>
            <Divider />
            <Form.Item
              className={activeInput === "password" ? "selectedInput" : ""}
              style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Input
                type="password"
                placeholder="123"
                style={{ border: "0px", outline: "none", marginBottom: "0px" }}
                onFocus={() => handleActiveInp("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Form>

          <Button
            style={{
              backgroundColor: "#2D3A45",
              height: "60px",
              width: "300px",
              color: "white",
            }}
            onClick={handeSubmit}
            loading={loading}
          >
            Tizimga kirish
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
