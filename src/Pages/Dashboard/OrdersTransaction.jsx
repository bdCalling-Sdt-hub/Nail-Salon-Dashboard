import { useEffect, useRef, useState } from "react";
import {  Input, Select, Table } from "antd";

import { useOderHistoryQuery } from "../../redux/apiSlices/OrderApi";
import { imageURL } from "../../redux/api/apislice";
import OrdersTransactionModal from "../../Components/OrdersTransactionModal";
import { MdOutlineArrowOutward } from "react-icons/md";

const OrderTransaction = () => {
  const [modalData, setModalData] = useState({});
  const [open, setOpen] = useState(false);
  const [statusData, setStatusData] = useState("");
  const [keyword, setKeyword] = useState("");
  const values = {
    date: keyword,
    status: statusData,
  };
  console.log(values);
  const { data } = useOderHistoryQuery(values);

  console.log(data);
  const totalPage = data?.data?.meta?.total;
  const tablePage = data?.data?.meta?.page;
  const [currentPage, setCurrentPage] = useState(tablePage);
  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const datas = data?.data?.data?.map((value, index) => ({
    key: index + 1,
    user: {
      name: value?.user?.name,
      img: value?.user?.profileImage?.startsWith("https")
        ? value?.user?.profileImage
        : `${imageURL}${value?.user?.profileImage}`,
      location: value?.user?.location, 
      contact: value?.salon?.contact,
    },
    salon: value?.salon?.name,
    service_orders: value?.service, 
    booking_date: value?.booking_date,
    booking_time: value?.booking_time,
    price: value?.service,
    status: value?.status,
    bookingId: value?.bookingId,
  }));


  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
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
            />
            <p
              style={{
                letterSpacing: 0.4,

                color: "#666666",

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
      title: "Salon",
      dataIndex: "salon",
      key: "salon",
    },
    {
      title: "Service Orders",
      dataIndex: "service_orders",
      key: "service_orders", 
      render: (_, record) => (
        <div>
          {record?.service_orders?.map((value, index) => (
            <div key={index} className="flex items-center gap-1">
              {value?.serviceName} .
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Booking Date",
      dataIndex: "booking_date",
      key: "booking_date",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => {
        const totalPrice = record?.price?.reduce((sum, service) => {
          return sum + parseFloat(service?.price || 0);
        }, 0);
    
        return (
          <div>
            <div className="">
             ${totalPrice}
            </div>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <p
          style={{
            letterSpacing: 0.4,
            fontSize: "#666666",
            fontWeight: "400",
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <span
            style={{
              height: 20,
              width: 20,
              borderRadius: 50,
              background:
                record?.status === "Complete" ? "#00B047" : "#F27405",
              color: "white",
              display: "flex",
            }}
          ></span>

          <span
            style={{
              color: record?.status === "Complete" ? "#00B047" : record?.status === "Pending" && "#F27405",
            }}
          >
            {record?.status}
          </span>
        </p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
      
          <button
            onClick={() => {
              setOpen(true), setModalData(record);
            }} 
            className="text-lg text-blue-800"
          >
          <MdOutlineArrowOutward />
          </button>     
      ),
    },
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setStatusData(value);
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
              All Transaction
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
              type="date"
              className=" h-10  border-0 text-primary placeholder:text-black hover:text-black"
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />

            <Select
              defaultValue="Complete"
              style={{
                width: 160,
                height: 44,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "Complete",
                  label: "Complete",
                },
                {
                  value: "Pending",
                  label: "Not Complete",
                },
              ]}
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
  <OrdersTransactionModal open={open} setOpen={setOpen} modalData={modalData} />
    </div>
  );
};

export default OrderTransaction;
