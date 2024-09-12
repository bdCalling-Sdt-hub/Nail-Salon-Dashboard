import { useEffect, useRef, useState } from "react";
import { Dropdown, Input, Modal, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { RiLoader3Fill } from "react-icons/ri";
import { useTotalUserQuery } from "../../redux/apiSlices/AllUserApi";
import { GrClose } from "react-icons/gr";
import { imageURL } from "../../redux/api/apislice";
import { FaSearch } from "react-icons/fa";
const { Search } = Input;
const UserDetailsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");

  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const { data } = useTotalUserQuery({page:currentPage ,search:keyword}); 
  console.log(data);

  const totalPage = data?.data?.meta?.total;
  const datas = data?.data?.users?.map((value, index) => ({
    key: index + 1,

    user: {
      name: value?.name,
      img: value?.profileImage?.startsWith("https")
        ? value?.profileImage
        : `${imageURL}${value?.profileImage}`,
    },
    email: value?.email,
    contact: value?.contact,
    location: value?.location,
  }));

  const showModal = (value) => {
    setOpen(true);
    setDetails(value);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key", 
      render:(key)=><p>{((currentPage-1)*10)+key}</p>
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (user) => {
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
              src={user?.img}
              alt="ok"
            />
            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
              }}
            >
              {user?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <p
 
        >
          <button
            onClick={() => showModal(record)}
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
          >
            <svg
              width="13"
              height="14"
              viewBox="0 0 13 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5208 4.40396L1.91421 13.0105L0.5 11.5963L9.10659 2.98975H1.52082V0.989746H12.5208V11.9897H10.5208V4.40396Z"
                fill="#6A5ECC"
              />
            </svg>
          </button>
        </p>
      ),
    },
  ];

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
              All user list
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Input
             
              style={{
                width: 350,
                background: "#F2F2F2",
                boxShadow: "none",
                color: "black",
              }}
              className=" h-12  border-0 text-primary placeholder:text-black hover:text-black"
              placeholder="Search by location..." 
              prefix={<FaSearch color="gray"  size={18}/> }
              onChange={(e) => setKeyword(e.target.value)}
              // value={keyword}
            />

          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={datas}
            pagination={{
              total: { totalPage },
              current: currentPage,
              onChange: handlePage,
            }}
          />
        </div>
      </div>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={500}
      >
        <div className="p-6">
          <div className="flex justify-center items-center flex-col py-5 gap-4">
            <img
              className="w-20 h-20 rounded-full"
              src={details?.user?.img}
              alt=""
            />
            <p className="text-base font-semibold">{details?.user?.name}</p>
          </div>
          <div className="flex flex-col justify-start items-start gap-3">
            <div>
              <p className="text-sm font-semibold mb-1">Name</p>
              <p className=" text-xs">{details?.user?.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Email</p>
              <p className=" text-xs">{details?.email}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Address</p>
              <p className=" text-xs">{details?.location}</p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Contact No</p>
              <p className=" text-xs">{details?.contact}</p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDetailsList;
