import React, { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { Button, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useCreateSliderMutation,
  useDeleteSliderMutation,
  useGetSliderQuery,
  useUpdateSliderMutation,
} from "../../../redux/apiSlices/SliderSettingApi";
import { imageURL } from "../../../redux/api/apislice";

const SliderSetting = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  // post
  const [createSlider] = useCreateSliderMutation();
  // get
  const { data, refetch } = useGetSliderQuery();
  // console.log(data); 
 
  // update
  const [updateSlider] = useUpdateSliderMutation();
  // delete
  const [deleteSlider] = useDeleteSliderMutation();
  const [updateData, setUpdateData] = useState(null);
  // console.log(updateData); 
  const [form] = Form.useForm();
  const [imgFile, setImgFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    const url = URL.createObjectURL(file);
    setImgUrl(url);
  };


  useEffect(() => {
    if (updateData) {
      form.setFieldsValue({
        name: updateData?.slider_name,
      }); 
      setImgUrl(updateData?.slider_image)
    }
  }, [updateData, form]);

  // console.log(data?.data); 
  const datas = data?.data?.map((value, index) => ({
    key: index + 1,
    slider_image: value?.bannerImage.startsWith("https")
      ? value?.bannerImage
      : `${imageURL}${value?.bannerImage}`,
    slider_name: value?.name,
    id: value?._id,
  }));

  const handleDelete = async (id) => {
    // console.log(id); 
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteSlider(id).then((response) => {
          // console.log(response); 
          if (response?.data?.statusCode === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();
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
      }
    });
  };


  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      width: 100,
    },
    {
      title: "Slider image",
      dataIndex: "slider_image",
      key: "slider_image",
      width: 200,
      render: (_, record) => {
        return (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <img
              style={{
                height: 48,
                width: 147,
                borderRadius: 8,
                backgroundSize: "cover",
              }}
              src={record?.slider_image}
              alt="ok"
            />
          </div>
        );
      },
    },

    {
      title: "Slider Name",
      dataIndex: "slider_name",
      key: "slider_name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      textAlign: "center",
      render: (_, record) => (
        <p
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <button
            onClick={() => {
              setOpenAddModel(true), setUpdateData(record);
            }}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              color: "#6A5ECC",
              background: "white",
            }}
          >
            <CiEdit size={25} />
          </button>
          <button
            onClick={() => handleDelete(record?.id)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
              background: "white",
              color: "#808080",
            }}
          >
            <FaRegTrashAlt size={20} />
          </button>
        </p>
      ),
    },
  ];

 

  const onFinish = async (values) => {
    // console.log(values); 
    const formData = new FormData();
    if (imgFile) {
      formData.append("bannerImage", imgFile);
    }
    formData.append("name", values?.name);

    if (updateData?.id) {
      await updateSlider({ id: updateData?.id, value: formData }).then(
        (res) => {
          // console.log(res); 
          if (res?.data?.statusCode === 200) {
            Swal.fire({
              title: "Slider Updated!",
              text: "Your Slider has been update.",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              refetch();  
              setOpenAddModel(false);  
              setImgUrl(null)
              form.resetFields() 
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
        }
      );
    } else {
      await createSlider(formData).then((res) => {
        // console.log(res); 
        if (res?.data?.statusCode === 200) {
          Swal.fire({
            title: "Slider Added!",
            text: "Your Slider has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch(); 
            setOpenAddModel(false); 
            setImgUrl(null) 
            form.resetFields() 
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
    }
  };

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
              Slider Setting
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Button
              onClick={() => setOpenAddModel(true)}
              style={{
                borderRadius: 8,
                background: "#6A5ECC",
                height: 40,
                color: "white",
                fontSize: 14,
                fontWeight: "400",
              }}
              icon={<PlusOutlined />}
            >
              Add Slider
            </Button>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            dataSource={datas}
            // pagination={{
            //   total: { totalPage },
            //   current: currentPage,
            //   onChange: (e) => handlePage(e),
            // }}
          />
        </div>
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          // null;
          setUpdateData(null);
          setImgUrl(null)
          setOpenAddModel(false);
          form.resetFields();
        }}
        width={500}
        footer={false}
      >
        <div className="p-6 ">
          <h1
            className="font-semibold text-[#555555]"
            style={{ marginBottom: "12px" }}
          >
            {updateData?.id ? `Update Slider` : `Add Slider`}
          </h1>
          <Form onFinish={onFinish} form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Slider Name</p>
              <Form.Item
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input Package Name",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>
            <div>
              <p className="text-[#6D6D6D] py-1">Slider Image</p>

              <label
                htmlFor="image"
                style={{ display: "block", margin: "4px 0" }}
                className="p-3 border"
              >
                <Form.Item name="image">
                  <div className="flex justify-center items-center w-full h-full border-dashed border border-gray-400 py-10 ">
                    {imgUrl ? (
                      <img src={imgUrl} alt="" />
                    ) : (
                      <FaRegImage className="text-6xl text-gray-400" />
                    )}
                  </div>

                  <div className="hidden">
                    <Input
                      id="image"
                      type="file"
                      onInput={handleChange}
                      style={{
                        border: "1px solid #E0E4EC",
                        height: "52px",
                        background: "white",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                    />
                  </div>
                </Form.Item>
              </label>
            </div>
            <div className="text-center mt-6">
              <button className="bg-[#6A5ECC] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
                Confirm
              </button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SliderSetting;
