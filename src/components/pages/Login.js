import React from "react";
import { Menu, Form, Container } from "semantic-ui-react";

function Login() {
  const [activeItem, setActiveItem] = React.useState("register");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Container>
      <Menu widths="2">
        <Menu.Item
          activeItem={activeItem === "register"}
          onClick={() => setActiveItem("register")}
        >
          註冊
        </Menu.Item>
        <Menu.Item
          activeItem={activeItem === "signin"}
          onClick={() => setActiveItem("signin")}
        >
          登入
        </Menu.Item>
      </Menu>
      <Form>
        <Form.Input
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => (setEmail = e.target.value)}
        />
        <Form.Input
          label="Password"
          placeholder="Password"
          value={password}
          onChange={(e) => (setPassword = e.target.value)}
        />
        <Form.Button>
          {activeItem === "register" && "register"}
          {activeItem === "signin" && "signin"}
        </Form.Button>
      </Form>
    </Container>
  );
}

export default Login;
