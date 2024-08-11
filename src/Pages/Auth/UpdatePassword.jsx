import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useResetPasswordMutation } from "../../redux/apiSlices/AuthApi";
import { useParams } from "react-router-dom";
import loginImage from "../../assets/login.png" 

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const param = useParams();

  const [updateProfile] = useResetPasswordMutation();

  const validatePasswordChange = (values) => {
    let errors = {};

    if (values?.password !== values.confirmPassword) {
      errors.conPassError = "New Password and Confirm Password Don't Match";
      setConPassError(errors.conPassError);
    } else {
      setConPassError("");
    }

    return errors;
  };

  const onFinish = async (values) => {
    const errors = validatePasswordChange(values);
    const value = {
      email: param?.email,
      password: values?.password,
      confirmPassword: values?.confirmPassword,
    };
    console.log(value);

    if (Object.keys(errors).length === 0) {
      await updateProfile(value).then((response) => {
        // console.log(response);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            title: "Successfully",
            text: "Your password has been updated, please change your password regularly to avoid this happening",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "Confirm",
          }).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response?.error?.data?.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
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
        }}
        onFinish={onFinish}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "#6A6D7C",
            marginBottom: "13px",
            textAlign: "center",
          }}
        >
          Set a new password
        </h1>
        <p
          style={{
            width: "275px",
            color: "#6A6D7C",
            fontSize: "14px",
            fontWeight: 400,
            margin: "0 auto 0 auto",
          }}
        >
          Create a new password. Ensure it differs from previous ones for
          security
        </p>

        <div style={{ margin: "45px 0 20px 0" }}>
          <label
            style={{ display: "block", color: "#6A6D7C", marginBottom: "5px" }}
            htmlFor=""
          >
            New Password
          </label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your new Password!",
              },
            ]}
            style={{ marginBottom: 0 }}
          >
            <Input.Password
              type="password"
              placeholder="Enter New password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
          {newPassError && (
            <label style={{ display: "block", color: "red" }} htmlFor="error">
              {newPassError}
            </label>
          )}
        </div>

        <div style={{ marginBottom: "40px" }}>
          <label
            style={{ display: "block", color: "#6A6D7C", marginBottom: "5px" }}
            htmlFor="email"
          >
            Confirm Password
          </label>
          <Form.Item
            style={{ marginBottom: 0 }}
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Confirm Password!",
              },
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Enter Confirm password"
              style={{
                border: "1px solid #E0E4EC",
                height: "52px",
                background: "white",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </Form.Item>
          {conPassError && (
            <label style={{ display: "block", color: "red" }} htmlFor="error">
              {conPassError}
            </label>
          )}
        </div>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{
              border: "none",
              height: "51px",
              background: "#8D4EE0",
              color: "white",
              borderRadius: "8px",
              outline: "none",
              marginTop: "",
            }}
          >
            UPDATE
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePassword;
