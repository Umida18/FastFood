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
import img1 from "../img/signIn.png";
import { useNavigate } from "react-router";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // if (email !== password) {
    //   message.error("Email and Password must be the same");
    //   return;
    // }

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
        message.success("Successfully signed in");

        navigate("/buyurtmalar");
      } else {
        message.error(data.message || "Sign in failed");
      }
    } catch (error) {
      message.error("An error occurred while signing in");
    } finally {
      setLoading(false);
    }
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
              height: "141px",
              width: "300px",
              backgroundColor: "white",
              marginBlock: 20,
            }}
            onFinish={handleSubmit}
          >
            <Form.Item
              rules={[
                { type: "email", message: "The input is not a valid email" },
                { required: true, message: "Please input your email!" },
              ]}
            >
              <Input
                type="email"
                placeholder="Email"
                style={{ border: "0px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>
            <Divider />
            <Form.Item>
              <Input
                type="password"
                placeholder="Parol"
                style={{ border: "0px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
          </Form>
          <Button
            style={{
              backgroundColor: "#2D3A45",
              height: "70px",
              width: "300px",
              color: "white",
            }}
            onClick={handleSubmit}
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
