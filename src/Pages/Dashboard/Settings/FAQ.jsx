import { Form, Input, Modal, Table, Button, Row, Col } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { GoQuestion } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

import Swal from "sweetalert2";
import {
  useCreateFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../../redux/apiSlices/FAQApi";

const FAQ = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // get data
  const { data, refetch } = useGetFAQQuery();
  // console.log(data?.data); 
  // update data
  const [updateFAQ] = useUpdateFAQMutation();
  // create data
  const [createFAQ] = useCreateFAQMutation();
  // DELETE DATA
  const [deleteFAQ] = useDeleteFAQMutation();
  const [form] = Form.useForm();

  const handleEditModal = (values) => {
    setEditData(values);
    // console.log(editData); 
  }; 

  useEffect(() => {
    if (editData) {
      form.setFieldsValue(editData);  
    }
  }, [editData]); 

  const handelsubmit = async (values) => { 
    if (editData?._id) {
      await updateFAQ({ id: editData?._id, value: value }).then((res) => {
        // console.log(res); 
        if (res?.data?.statusCode === 200) {
          Swal.fire({
            title: "Category Updated!",
            text: "Your category has been update.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();
            setOpenAddModel(false);
          });
        } else {
          Swal.fire({
            title: "Oops",
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          setOpenAddModel(false);
        }
      });
    }else{
      await createFAQ(values).then((res) => {
        // console.log(res); 
        if (res?.data?.statusCode === 200) {
          Swal.fire({
            title: "Category Added!",
            text: "Your category has been added.",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            refetch();
            form.resetFields() 
            setOpenAddModel(false); 
          });
        } else {
          Swal.fire({
            title: "Oops",
            text: res?.error?.data?.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
          });
          setOpenAddModel(false);
        }
      });
    }  
  };
  //update faq


  // delete faq
  const handleDelete = async (value) => {
    const id = value?._id;
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
        await deleteFAQ(id).then((response) => {
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

  return (
    <div>
      <div style={{ margin: "24px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <h3 style={{ fontSize: "24px", fontWeight: 600, color: "#2F2F2F" }}>
            Frequently Asked Questions
          </h3>
          <button
            onClick={() =>{ setOpenAddModel(true) , form.resetFields()  }}
            style={{
              borderRadius: "4px",
              color: "#F2F2F2",
              backgroundColor: "#6A5ECC",
              border: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "4px",
              padding: "10px 20px",
              fontWeight: "500",
            }} 
          >
            <FaPlus
              style={{
                marginTop: "-2px",
              }}
            /> 
            
            Add FAQ
          </button>
        </div>
      </div>
      <div className="bg-white py-6 px-4 rounded-md">
        {data?.data.map((item, index) => (
          <div key={index} className="flex justify-between items-start gap-4 ">
            <div className="mt-3">
              <GoQuestion color="#6A5ECC" size={25} />
            </div>
            <div className="w-full ">
              <p className="text-base font-medium border-b rounded-xl py-2 px-4 flex items-center gap-8">
                <span className=" flex-1 "> {item?.question}</span>
              </p>
              <div className="flex justify-start items-start gap-2 border-b  py-2 px-4  rounded-xl my-4">
                <p className="text-[#919191] leading-[24px] mb-6 ">
                  {item?.answer}
                </p>
              </div>
            </div>
            <div className="w-[4%] flex justify-start items-center pt-4 gap-2">
              <CiEdit
                onClick={() => {
                  setOpenAddModel(true);
                  handleEditModal(item);
                }}
                className="text-2xl cursor-pointer"
              />
              <RxCross2
                onClick={() => {
                  handleDelete(item);
                }}
                className="text-2xl cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
      {/* add modal  */}
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          setOpenAddModel(false); 
          form.resetFields()
        }}
        width={500}
        footer={false} 
      >
        <div className="p-6">
       
          <Form onFinish={handelsubmit} form={form}>
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <Form.Item
                name="question"
                rules={[
                  {
                    required: true,
                    message: "Please write your Question",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <Form.Item
                name="answer"
                rules={[
                  {
                    required: true,
                    message: "Please write your Answer",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  className="w-[100%] border outline-none "
                  type="text"
                />
              </Form.Item>

              <Form.Item>
                <div className="text-center mt-6">
                  <button className="bg-[#6A5ECC] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
                    Confirm
                  </button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal>

      {/* update modal  */}
      {/* <Modal
        centered
        open={openEditModal}
        onCancel={() => setOpenEditModal(false)}
        width={500}
        footer={false}
      >
        <div className="p-6">
          <h1 style={{ marginBottom: "12px" }}>Update FAQ</h1>
          <Form
            onFinish={handleUpdate}
           form={form}
            initialValues={{
              question: editData?.question,
              answer: editData?.answer,
            }}
          >
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Question
              </label>
              <Form.Item
                name="question"
                rules={[
                  {
                    required: true,
                    message: "Please write your Question",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="text"
                />
              </Form.Item>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Answer
              </label>
              <Form.Item
                name="answer"
                rules={[
                  {
                    required: true,
                    message: "Please write your Answer",
                  },
                ]}
              >
                <Input.TextArea
                  rows={6}
                  className="w-[100%] border outline-none "
                  type="text"
                />
              </Form.Item>

              <Form.Item>
                <div className="text-center mt-6">
                  <button className="bg-[#6A5ECC] px-6 py-3 w-full text-[#FEFEFE] rounded-md">
                    Confirm
                  </button>
                </div>
              </Form.Item>
            </div>
          </Form>
        </div>
      </Modal> */}

    </div>
  );
};

export default FAQ;
