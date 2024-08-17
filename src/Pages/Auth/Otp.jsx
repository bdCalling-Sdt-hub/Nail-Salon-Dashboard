import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useForgetPasswordMutation,
  useOtpCodeMutation,
} from "../../redux/apiSlices/AuthApi";
import OtpInput from "react-otp-input";
import { useParams } from "react-router-dom";
import loginImage from "../../assets/login.png"
import OTPInput from "react-otp-input";
const OtpVerify = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [otpCode] = useOtpCodeMutation();
  const [forgetPassword] = useForgetPasswordMutation(); 
  const param = useParams(); 
  const userEmail = param?.email  
  localStorage.setItem("email", userEmail);
const email = localStorage.getItem("email") 
// console.log(email);  

  const handleResendEmail = async () => {
    const data = {
      email: email,
    };
    await forgetPassword(data).then((res) => {
      // console.log(res); 
    });
  };


  const handleSubmit = async () => {
    // console.log(otp); 
    const value = {
      email: param?.email,
      oneTimeCode: otp,
    };
    await otpCode(value).then((res) => {
      // console.log(res); 
      if (res?.data?.statusCode === 200) {
        Swal.fire({
          title: "Password Reset",
          text: "Your password has been successfully reset. Click confirm to set a new password",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          navigate(`/update-password/${param?.email}`);
        });
      } else {
        Swal.fire({
          title: "Oops",
          text: res?.error?.data?.message,
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
      <div
        style={{
          width: "630px",
          background: "white",
          borderRadius: "12px",
          padding: "90px 57px",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            color: "#6A6D7C",
            marginBottom: "13px",
            textAlign: "center",
          }}
        >
          Check your email
        </h1>
        <p className=" px-6"
          style={{ color: "#B8B8B8", }} 
        >
          We sent a reset link to{" "}
          <span style={{ color: "#545454" }}> {param?.email} </span>
          enter the 6-digit code mentioned in the email.
        </p>
        <div >
          <div className="flex justify-center items-center py-4">
          <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              inputStyle={{
                height: "50px",
                width: "50px",
                borderRadius: "8px",
                marginRight: "16px",
                fontSize: "20px",
                border: "1px solid #A9A9A9",
                color: "#2B2A2A",
                outline: "none",
              }}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex justify-center items-center">
            <Button 
              className="bg-[#8D4EE0] h-12 text-white text-lg w-[100px] mt-6"
              htmlType="submit" 
              onClick={handleSubmit} 
            > 
              Send
            </Button>
          </div>
        </div>

        <p
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          Didn’t receive code?
          <span
            onClick={handleResendEmail}
            style={{
              color: "#8D4EE0",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
};

export default OtpVerify;
