import { useEffect, useRef, useState } from "react";
import BackButton from "../Dashboard/BackButton";
import { MdOutlineFilterList } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Calendar, Dropdown, Input, Slider, Table } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { CiMenuKebab } from "react-icons/ci";

const data = [
  {
    key: "1",
    name: "Tushar",
    email: "tushar@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "2",
    name: "Rahman",
    email: "rahman@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "3",
    name: "Rafsan",
    email: "rafsan@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "4",
    name: "jusef",
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "5",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "6",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "7",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "8",
    name: "Tushar",
    email: "tushar@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "9",
    name: "Rahman",
    email: "rahman@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "10",
    name: "Rafsan",
    email: "rafsan@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "11",
    name: "jusef",
    email: "jusef@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "12",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "13",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "14",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
  {
    key: "15",
    name: "Asad",
    email: "asad@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "16",
    name: "Fahim",
    email: "fahim@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Inactive",
    selling: "500",
    balance: "600",
  },
  {
    key: "17",
    name: "Nadir",
    email: "nadir@gmail.com",
    date: "18 Jul, 2023  4:30pm",
    location: "Banasree",
    status: "Active",
    selling: "500",
    balance: "600",
  },
];

const TotalSellerList = () => {
  const [value, setValue] = useState(
    new URLSearchParams(window.location.search).get("date") ||
      new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
  );
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    new URLSearchParams(window.location.search).get("category") || "All"
  );
  const [page, setPage] = useState(
    new URLSearchParams(window.location.search).get("page") || 1
  );
  const [open, setOpen] = useState();
  const [filter, setFilter] = useState(false);
  const [date, setDate] = useState(false);
  const dropdownRef = useRef();
  const items = [
    {
      label: "Car",
      key: "Car",
    },
    {
      label: "Bike",
      key: "Bike",
    },
    {
      label: "Cycle",
      key: "Cycle",
    },
  ];

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
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
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          style={{
            width: "88px",
            height: "31px",
            borderRadius: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: record?.status === "Active" ? "#E0F9F7" : "#FFC3C3",
            color: record?.status === "Active" ? "#2FD5C7" : "#9C0101",
          }}
        >
          {record?.status}
        </p>
      ),
    },
    {
      title: "Total Selling",
      dataIndex: "selling",
      key: "selling",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },

    {
      title: "ACTION",
      dataIndex: "printView",
      key: "printView",
      render: (_, record) => (
        <div style={{ position: "relative" }}>
          <CiMenuKebab
            onClick={(e) => (e.stopPropagation(), setOpen(record.key))}
            size={20}
            color="black"
            style={{ cursor: "pointer" }}
          />

          <div
            onClick={(e) => e.stopPropagation()}
            ref={dropdownRef}
            style={{
              display: record?.key === open ? "block" : "none",
              width: "113px",
              height: "132px",
              borderRadius: "8px",
              zIndex: "2",
              position: "absolute",
              top: "12px",
              right: "92px",
              background: "white",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              padding: "10px 0",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                width: "88px",
                height: "31px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#E0F9F7",
                color: "#2FD5C7",
                margin: "0 auto 0 auto",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              Approve
            </p>
            <p
              onClick={handleDelete}
              style={{
                width: "88px",
                height: "31px",
                borderRadius: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#FFC3C3",
                color: "#9C0101",
                margin: "0 auto 0 auto",
                marginBottom: "8px",
              }}
            >
              Block
            </p>
            <Link to={`/seller-details/${record?.key}`}>
              <p
                style={{
                  width: "88px",
                  height: "31px",
                  borderRadius: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  color: "black",
                  margin: "0 auto 0 auto",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                View
              </p>
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setPage(page);
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onClick = ({ key }) => {
    setCategory(key);
    const params = new URLSearchParams(window.location.search);
    params.set("category", key);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const onSelect = (newValue) => {
    const date = newValue.format("MMM-DD-YYYY");
    setValue(date);
    const params = new URLSearchParams(window.location.search);
    params.set("date", date);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <BackButton link="/" />
      </div>
      <div
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
        }}
      >
        <h1 style={{ fontSize: "20px", fontWeight: 600, color: "#2F2F2F" }}>
          Total Seller List
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "16px 0",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "197px",
                height: "30px",
                borderRadius: "8px",
                border: "1px solid #E9E9E9",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "5px 8px",
                color: "#8B8B8B",
              }}
            >
              Category
              <Dropdown menu={{ items, onClick }}>
                <p
                  style={{
                    cursor: "pointer",
                    color: "#717171",
                    borderRadius: "4px",
                  }}
                  onClick={(e) => e.preventDefault()}
                >
                  {category}
                  <DownOutlined
                    style={{ paddingLeft: "18px" }}
                    color="#717171"
                  />
                </p>
              </Dropdown>
            </div>

            <div
              style={{
                width: "304px",
                height: "30px",
                borderRadius: "8px",
              }}
            >
              <Input
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                prefix={<FiSearch size={14} color="#868FA0" />}
                suffix={
                  <IoClose
                    onClick={() => setSearch("")}
                    style={{ cursor: "pointer" }}
                    size={14}
                    color="#2B2A2A"
                  />
                }
                style={{
                  width: "100%",
                  height: "100%",
                  fontSize: "14px",
                }}
                size="middle"
                value={search}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              position: "relative",
            }}
          >
            <div
              onClick={(e) => (e.stopPropagation(), setFilter(true))}
              style={{
                width: "85px",
                height: "30px",
                borderRadius: "4px",
                border: "1px solid #E9E9E9",
                color: "#717171",
                display: "flex",
                alignItems: "center",
                padding: "0 8px",
                cursor: "pointer",
                justifyContent: "space-between",
              }}
            >
              Filter
              <MdOutlineFilterList />
            </div>

            <div
              onClick={(e) => (e.stopPropagation(), setDate(true))}
              style={{
                background: "#F6F6F6",
                cursor: "pointer",
                color: "#717171",
                padding: "4px 10px",
                borderRadius: "8px",
              }}
            >
              {value}
            </div>

            {/* calender dropdown */}
            <div
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "328px",
                display: date ? "block" : "none",
                zIndex: "2",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                background: "white",
                height: "fit-content",
                position: "absolute",
                right: "0",
                top: "50px",
                padding: "16px",
              }}
            >
              <Calendar fullscreen={false} onSelect={onSelect} />
            </div>

            {/* filter dropdown */}
            <div
              ref={dropdownRef}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: filter ? "block" : "none",
                width: "328px",
                zIndex: "2",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                background: "white",
                height: "fit-content",
                position: "absolute",
                right: "0",
                top: "50px",
                padding: "16px",
              }}
            >
              <label
                htmlFor=""
                style={{
                  color: "#8B8B8B",
                  display: "block",
                  marginBottom: "12px",
                }}
              >
                Date
              </label>
              <div
                style={{
                  border: "1px solid #6A6D7C",
                  marginBottom: "16px",
                  color: "#717171",
                  padding: "10px",
                  borderRadius: "8px",
                }}
              >
                {value}
              </div>
              {/* price range */}
              <label htmlFor="" style={{ color: "#8B8B8B", display: "block" }}>
                Price Range
              </label>
              <div style={{ marginTop: "15px" }}>
                <Slider
                  trackStyle={{
                    background: "#2FD5C7",
                    height: "6px",
                  }}
                  railStyle={{
                    background: "#6A6D7C",
                    height: "6px",
                  }}
                  handleStyle={{
                    borderColor: "#ff0000",
                    boxShadow: "none",
                  }}
                  min={1}
                  max={20}
                />
              </div>
            </div>
          </div>
        </div>

        <div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{
              pageSize: 10,
              defaultCurrent: parseInt(page),
              onChange: handlePageChange,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalSellerList;
