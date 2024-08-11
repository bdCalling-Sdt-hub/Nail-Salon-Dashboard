import { Button, Form, Input, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useForgetPasswordMutation } from "../../redux/apiSlices/AuthApi";
import loginImage from "../../assets/login.png"
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword, { isError, isSuccess, data }] =
    useForgetPasswordMutation();

  const onFinish = async (values) => {
    console.log(values);
    await forgetPassword({ email: values?.email }).then((response) => {
      if (response?.data?.statusCode == 200) {
        Swal.fire({
          title: "Sending",
          text: "Otp Send Your Email. Check It",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate(`/otp/${values?.email}`);
        });
      } else {
        Swal.fire({
          title: "Oops",
          text: response?.error?.data?.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
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
      }}
    >
      <Form
        name="normal_login"
        className="password-form"
        initialValues={{
          remember: true,
        }}
        style={{
          width: "630px",
          background: "white",
          borderRadius: "12px",
          padding: "90px 57px",
        }}
        onFinish={onFinish}
      >
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "54px",
            color: "#494949",
            textAlign: "center",
          }}
        >
          Forgot Password
        </h1>

        <div style={{ marginBottom: "24px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "5px" }}
          >
            {" "}
            Email Address
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

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            style={{
              height: "45px",
              fontWeight: "400px",
              fontSize: "18px",
              background: "#8D4EE0",
              color: "white",
              alignSelf: "bottom",
              marginTop: "30px",
            }}
          >
            Send a Code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ForgotPassword;
