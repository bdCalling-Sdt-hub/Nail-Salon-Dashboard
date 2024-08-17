import { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row } from "antd";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/apiSlices/AuthApi";
import { imageURL } from "../../redux/api/apislice";

const AdminProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const { data , refetch } = useGetProfileQuery();
  const [updateProfile ] = useUpdateProfileMutation();
  const profileData = data?.user;
  // console.log(data); 

  const [newPassError, setNewPassError] = useState("");
  const [conPassError, setConPassError] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  // console.log(imgFile); 
  const [form] = Form.useForm();

  // change Password
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handleImage = (e) => {
    const file = e.target?.files[0];
    setImgFile(file);
    setImgUrl(URL.createObjectURL(file));
  };

  const validatePasswordChange = (values) => {
    let errors = {};

    if (values?.currentPass === values.newPass) {
      errors.newPassError = "The New password is similar to the old Password";
      setNewPassError(errors.newPassError);
    } else {
      setNewPassError("");
    }

    if (values?.newPass !== values.confirmPass) {
      errors.conPassError = "New Password and Confirm Password Don't Match";
      setConPassError(errors.conPassError);
    } else {
      setConPassError("");
    }

    return errors;
  };

  const handleChangePassword = async (values) => {
    const errors = validatePasswordChange(values);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // formData.append("values", values);
    if (Object.keys(errors).length === 0) {
      await changePassword(formData).then((response) => {
        // console.log(response);
        if (response?.data?.statusCode === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Password Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          form.resetFields()
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
    // console.log(values); 
  };

  const onFinish = async (values) => {
    const formData = new FormData();
    if (imgFile) {
      formData.append("profileImage", imgFile);
    }
    Object.entries(values).forEach(([field, value]) =>
      formData.append(field, value)
    );
    await updateProfile(formData).then((res) => {
      // console.log(res);
      if (res?.data?.statusCode === 200) {
        Swal.fire({
          title: "Profile Updated!",
          text: "Your Profile has been updated.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          refetch();
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


  const src = imgUrl
    ? imgUrl
    : profileData?.profileImage?.startsWith("https")
    ? profileData?.profileImage
    : `${imageURL}/${profileData?.profileImage}`;

  return (
    <div className="mt-5">
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "16px 0",
          }}
        >
          <div>
            <h3
              style={{
                color: "#6A5ECC",
                fontSize: 18,
                fontWeight: "500",
              }}
            >
              Admin Profile
            </h3>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "16px" }}
          ></div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
        

            <div
              style={{
                position: "relative",
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  height: 114,
                  width: 119,
                  borderRadius: "50%",
                  objectFit: "cover",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.35)",
                }}
              /> 
                 {
                isEdit &&      <label
                htmlFor="imageUpload"
                style={{
                  position: "absolute",
                  bottom: 20,
                  right: -10,
                  backgroundColor: "white",
                  width: 35,
                  height: 35,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              > 
           
                <CiEdit size={25} color="#929394" />
              </label>
              }
          
            </div>
            <p
              style={{
                fontSize: 32,
                fontWeight: 500,
                color: "#333333",
              }}
            >
              {profileData?.name}
            </p>
          </div>
          <input
            id="imageUpload"
            type="file"
            src=""
            onChange={handleImage}
            style={{ display: "none" }}
            alt=""
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 35,
              marginBottom: 35,
            }}
          >
            <div
              style={{
                display: "flex",
                gap: 33,
              }}
            >
              <p
                onClick={() => setIsEdit(true)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#6A5ECC" : "#818181",
                  cursor: "pointer",
                  borderBottom: isEdit ? "3px solid #6A5ECC" : "none",
                  padding: "6px 0px",
                }}
              >
                Edit Profile
              </p>
              <p
                onClick={() => setIsEdit(false)}
                style={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: isEdit ? "#818181" : "#6A5ECC",
                  cursor: "pointer",
                  borderBottom: isEdit ? "none" : "3px solid #6A5ECC",
                  padding: "6px 0px",
                }}
              >
                Change Password
              </p>
            </div>
          </div>
          {isEdit ? (
            <div className="px-20">
              <p
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: "#333333",
                  textAlign: "center",
                }} 
                className=" py-5"
              >
                Edit Your Profile
              </p>
              <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                  name: profileData?.name,
                  email: profileData?.email,
                  phone: profileData?.phone,
                  role: profileData?.role,
                }} 
             
              >
                <Row
                  gutter={{
                    xs: 8,

                    lg: 15,
                  }} 
                  
                >
                  <Col span={12}>
               
                    <Form.Item label={<div className="">Name</div>} name="name">
                      <Input
                        size="large"
                        className="bg-transparent border text-black border-[#3a3a3a] placeholder:text-gray-400 pb-3 hover:bg-transparent focus:bg-transparent"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={<div className="">Email</div>}
                      name="email"
                    >
                      <Input
                        size="large"
                        className="bg-transparent border text-black border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={<div className="">Phone number</div>}
                      name="phone"
                    >
                      <Input
                        size="large"
                        className="bg-transparent border text-black border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label={<div className="">User Type</div>}
                      name="role"
                    >
                      <Input
                        size="large"
                        className="bg-transparent border text-black border-[#3a3a3a] placeholder:text-gray-400 py-3 hover:bg-transparent focus:bg-transparent"
                        readOnly
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item className=" flex justify-center items-center">
                  <Button
                    type="primary"
                    style={{
                      height: 44,
                      width: 150,
                      backgroundColor: "#6A5ECC",
                      color: "white",
                      borderRadius: "8px",
                      fontWeight: 500,
                      fontSize: 14,
                    }}
                    htmlType="submit"
                  >
                    Save changes
                  </Button>
                </Form.Item>
              </Form>
            </div>
          ) : (
            <div
              className=" mx-20 "
              // style={{
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              // }}
            >
              <div className=" w-2/3">
                <Form
                  className=""
                  layout="vertical"
                  form={form} 
                  onFinish={handleChangePassword}
                >
                  <Form.Item
                    name="currentPass"
                    label={
                      <p className=" text-sm leading-5 poppins-semibold">
                        Current Password
                      </p>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Current Password!",
                      },
                    ]}
                  >
                    <Input.Password
                      style={{ background: "transparent" }}
                      placeholder="Enter current password"
                      className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 "
                    />
                  </Form.Item>

                  <Form.Item
                    name="newPass"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter New Password!",
                      },
                    ]}
                    label={
                      <p className=" text-sm leading-5 poppins-semibold">
                        New Password
                      </p>
                    }
                    style={{ marginBottom: newPassError ? 0 : null }}
                  >
                    <Input.Password
                      style={{ background: "transparent" }}
                      placeholder="Enter current password"
                      className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 "
                    />
                  </Form.Item>
                  {newPassError && (
                    <label
                      style={{ display: "block", color: "red" }}
                      htmlFor="error"
                    >
                      {newPassError}
                    </label>
                  )}

                  <Form.Item
                    label={
                      <p className=" text-sm leading-5 poppins-semibold">
                        Confirm Password
                      </p>
                    }
                    name="confirmPass"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Confirm Password!",
                      },
                    ]}
                    style={{ marginBottom: conPassError ? 0 : null }}
                  >
                    <Input.Password
                      style={{ background: "transparent" }}
                      placeholder="Enter current password"
                      className="h-12 bg-transparent hover:bg-transparent focus:bg-transparent placeholder:text-gray-500 "
                    />
                  </Form.Item>
                  {conPassError && (
                    <label
                      style={{ display: "block", color: "red" }}
                      htmlFor="error"
                    >
                      {conPassError}
                    </label>
                  )}

                  <Form.Item
                    style={{
                      marginBottom: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      htmlType="submit"
                      block
                      style={{
                        width: 178,
                        height: 48,
                        fontWeight: "400px",
                        background: "#6A5ECC",
                        color: "white",
                      }}
                      className="roboto-medium  text-sm leading-4"
                    >
                      {isLoading ? "Changing" : "Update"}
                    </Button>
                  </Form.Item>
                </Form>
              </div>

             
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
