import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useDeleteAdminDataMutation,
  useGetAdminsDataQuery,
  usePostAdminDataMutation,
} from "../../redux/apiSlices/MakeAdminApi";

const SalonCategoryList = () => {
  const [openAddModel, setOpenAddModel] = useState(false);

  const [form] = Form.useForm();

  // // get , post , delete
  const { data, refetch } = useGetAdminsDataQuery();

  const [postAdminData] = usePostAdminDataMutation();
  const [deleteAdminData] = useDeleteAdminDataMutation();

  const datas = data?.data?.map((value, index) => ({
    key: index + 1,
    id: value?._id,
    email: value?.email,
    name: value?.name,
    role: value?.role,
    password: value?.password,
    phone: value?.phone,
  }));

  const onFinish = async (values) => {
    // console.log(values); 
    await postAdminData(values).then((res) => {
      // console.log(res); 
      if (res?.data?.statusCode === 200) {
        Swal.fire({
          title: "Admin Added!",
          text: res?.data?.message,
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          refetch();  
          form.resetFields()
          setOpenAddModel(false)
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

  const dropdownRef = useRef();

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
        await deleteAdminData(id).then((res) => {
          // console.log(res); 
          if (res?.data?.statusCode === 200) {
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
              text: res?.error?.data?.message,
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDate(false);
        setOpen("");
        setFilter(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
      width: 150,
    },
    {
      title: "Admin Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Admin Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Admin Type",
      dataIndex: "role",
      key: "role",
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
          }}
        >
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
              Make Admin
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
              Create admin profile
            </Button>
          </div>
        </div>
        <div>
          <Table columns={columns} style={{}} dataSource={datas} />
        </div>
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          // null;

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
            Create New Admin
          </h1>
          <Form
            onFinish={onFinish}
            form={form}
            initialValues={{
              role: "ADMIN",
            }}
          >
            <div>
              <p className="text-[#6D6D6D] py-1">Name</p>
              <Form.Item
                name="name"
                placeholder="Enter your Name"
                rules={[
                  {
                    required: true,
                    message: "Please input Your Name",
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
              <p className="text-[#6D6D6D] py-1">Email </p>
              <Form.Item
                name="email"
                placeholder="Enter your Email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email",
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
              <label
                style={{ display: "block", marginBottom: "5px" }}
                htmlFor="password"
              >
                Password
              </label>
              <Form.Item
                style={{ marginBottom: 10 }}
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
                  className="w-[100%] border outline-none px-3 py-[10px]"
                />
              </Form.Item>
            </div>

            <div style={{ width: "100%" }}>
              <p className="text-[#6D6D6D] py-1">type </p>
              <Form.Item
                name="role"
                rules={[
                  {
                    required: true,
                    message: "Please input role",
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
              <p className="text-[#6D6D6D] py-1">Phone Number </p>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input Phone Number",
                  },
                ]}
              >
                <Input
                  className="w-[100%] border outline-none px-3 py-[10px]"
                  type="number"
                />
              </Form.Item>
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

export default SalonCategoryList;
