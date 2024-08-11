import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAdminLoginMutation } from "../../redux/apiSlices/AuthApi";
import Swal from "sweetalert2";
import { setToLocalStorage } from "../../Util/local-storage"; 
import loginImage from "../../assets/login.png"
const Login = () => {
  const navigate = useNavigate();

  const [adminLogin, { isError, error, isLoading, isSuccess, data }] =
    useAdminLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      // console.log("you login successfully");
      if (data) {
        Swal.fire({
          title: "Login Successful",
          text: "Welcome to NiFi",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          setToLocalStorage("salonAuthToken", data?.data?.token);

          navigate("/");
          window.location.reload();
        });
      }
      // console.log(data?.data?.token);
    }
    if (isError) {
      Swal.fire({
        title: "Failed to Login",
        text: error?.data?.message,
        icon: "error",
      });
    }
  }, [isSuccess, isError, error, data, navigate]);

  const onFinish = async (values) => {

    try {
      await adminLogin(values).then(res=>{
        console.log(res);
      })
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div
    
      style={{
        width: "100%",
       backgroundImage:`url(${loginImage})` , 
       backgroundRepeat:"no-repeat" ,
       backgroundSize:"cover" ,
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "630px",
          background: "white",
          borderRadius: "12px",
          padding: "90px 57px",
          position: "relative",
          zIndex: 9999,
        }}
        onFinish={onFinish}
      >
        <h1 style={{ fontSize: "32px", color: "#6A6D7C", textAlign: "center" }}>
          Login in to Account
        </h1>
        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            {" "}
            Email{" "}
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="email"
            id="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              placeholder="Enter your email address"
              type="email"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label
            style={{ display: "block", marginBottom: "5px" }}
            htmlFor="password"
          >
            Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter your password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox style={{ color: "#6A6D7C" }}>Remember me</Checkbox>
          </Form.Item>
          <a
            className="login-form-forgot"
            style={{ color: "#6A6D7C" }}
            href="/forgot-password"
          >
            Forgot password
          </a>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            // onClick={()=>navigate('/')}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            style={{
              height: "52px",
              fontWeight: "400px",
              fontSize: "18px",
              background: "#8D4EE0",
              marginTop: "56px",
            }}
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
