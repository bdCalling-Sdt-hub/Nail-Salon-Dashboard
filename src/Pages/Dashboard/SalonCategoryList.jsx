import { useEffect, useRef, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegImage, FaRegTrashAlt } from "react-icons/fa";
import { Button, Form, Input, Modal, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import {
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useTotalCategoryQuery,
  useUpdateCategoryMutation,
} from "../../redux/apiSlices/CategoriesApi";
import { imageURL } from "../../redux/api/apislice";

const SalonCategoryList = () => {
  const [openAddModel, setOpenAddModel] = useState(false);
  const [imgFile, setImgFile] = useState(null);

  const [itemForEdit, setItemForEdit] = useState(null);
  const dropdownRef = useRef();
  const { data: categories, refetch } = useTotalCategoryQuery();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [form] = Form.useForm();

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const data = categories?.data?.map((value, index) => ({
    key: index + 1,
    id: value?._id,
    services_photo: value.image?.startsWith("https")
      ? value.image
      : `${imageURL}${value.image}`,
    service_title: value?.name,
  }));

  const handleDelete = async (id) => {
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
        await deleteCategory(id).then((response) => {
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

  useEffect(() => {
    if (itemForEdit) {
      form.setFieldsValue({ name: itemForEdit?.service_title });
      setImageUrl(itemForEdit?.services_photo);
    }
  }, [itemForEdit]);

  console.log(imageUrl);
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
      title: "Services Photo",
      dataIndex: "services_photo",
      key: "services_photo",
      width: 200,
      render: (img) => {
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
                width: 48,
                borderRadius: 8,
                backgroundSize: "cover",
              }}
              src={img}
            />
          </div>
        );
      },
    },

    {
      title: "Service title",
      dataIndex: "service_title",
      key: "service_title",
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
              setOpenAddModel(true), setItemForEdit(record);
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
    const formData = new FormData();
    if (imgFile) {
      formData.append("image", imgFile);
    }
    console.log(values);
    formData.append("name", values?.name);

    if (itemForEdit?.id) {
      await updateCategory({ id: itemForEdit?.id, data: formData }).then(
        (res) => {
          console.log(res);
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
          }
        }
      );
    } else {
      await addCategory(formData).then((res) => {
        console.log(res);
        if (res?.data?.statusCode === 200) {
          Swal.fire({
            title: "Category Added!",
            text: "Your category has been added.",
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
        }
      });
    }
  };

  return (
    <div className=" mt-5">
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
              Manage Service Category
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
              Add Service
            </Button>
          </div>
        </div>
        <div>
          <Table columns={columns} style={{}} dataSource={data} />
        </div>
      </div>
      <Modal
        centered
        open={openAddModel}
        onCancel={() => {
          // null;
          setItemForEdit(null);
          setImageUrl(null);
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
            {" "}
            {itemForEdit?.id ? "Update Category " : "Add Category"}
          </h1>
          <Form onFinish={onFinish} form={form}>
            <div>
              <p className="text-[#6D6D6D] py-1">Category Name</p>
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
              <p className="text-[#6D6D6D] py-1">Service Image</p>
              <label
                htmlFor="image"
                style={{ display: "block", margin: "4px 0" }}
                className="p-3 border"
              >
                <Form.Item name="image">
                  <div className="flex justify-center items-center w-full h-full border-dashed border border-gray-400 py-10 ">
                    {imageUrl ? (
                      <img src={imageUrl} alt="" />
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

export default SalonCategoryList;
