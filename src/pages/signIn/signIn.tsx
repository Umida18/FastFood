import React, { useState } from "react";
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
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [activeInput, setActiveInput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handeSubmit = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        "https://544287c7d245201c.mokky.dev/SingIn",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.success("Muvaffaqiyatli tizimga kirildi");
      } else {
        message.error(data.message || "Tizimga kirish muvaffaqiyatsiz bo'ldi");
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
    <div>
      <Row>
        <Col span={13} style={{ objectFit: "cover" }}>
          <img src={img1} alt="Sign In" />
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
              // height: "141px",
              width: "300px",
              backgroundColor: "white",
              marginBlock: 20,
              padding: "6px",
            }}
          >
            <Form.Item
              rules={[
                { type: "email", message: "The input is not a valid email" },
                { required: true, message: "Please input your email!" },
              ]}
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
                placeholder="Email"
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
              rules={[
                { type: "email", message: "The input is not a valid email" },
                { required: true, message: "Please input your email!" },
              ]}
              className={activeInput === "password" ? "selectedInput" : ""}
              style={{ height: "70px", display: "flex", alignItems: "center" }}
            >
              <Input
                type="password"
                placeholder="Parol"
                style={{ border: "0px", outline: "none", marginBottom: "0px" }}
                onFocus={() => handleActiveInp("password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Form>
          {/* <Link to={`/buyurtmalar`}>
            {" "} */}
          <Button
            style={{
              backgroundColor: "#2D3A45",
              height: "60px",
              width: "300px",
              color: "white",
            }}
            onClick={handeSubmit}
          >
            Tizimga kirish
          </Button>
          {/* </Link> */}
        </Col>
      </Row>
    </div>
  );
};

export default SignIn;
