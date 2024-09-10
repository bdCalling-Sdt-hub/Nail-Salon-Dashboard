
import React from "react";
import "./DashboardHome.css";
import TotalSellerChart from "./TotalSellerChart";
import DailyOverviewChart from "./DailyOverviewChart";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GrMoney } from "react-icons/gr";
import { IoIosCut } from "react-icons/io";
import TotalEarningGoth from "./TotalEarningGrowth";
import { useTotalDataQuery } from "../../../redux/apiSlices/DashboardHomeApi";

function DashboardHome() {
  const { data } = useTotalDataQuery();
  // console.log(data); 
  const totalUser = data?.data?.userMonths;
  const totalSalon = data?.data?.salonMonths;
  const onChange = (pageNumber) => {
    // console.log("Page: ", pageNumber); 
  };

  const datas = [
    {
      name: "Total User",
      count: data?.data?.totalUser,
      icon: <HiMiniUserGroup color="#6A5ECC" size={24} />,
      bgColor: "#E5E5E5",
    },
    {
      name: "Total Salon",
      count: data?.data?.totalSalon,
      icon: <IoIosCut color="#6A5ECC" size={24} />,
      bgColor: "#E5E5E5",
    },
    {
      name: "Total Incomes",
      count: data?.data?.totalIncome,
      icon: <GrMoney color="#6A5ECC" size={24} />,
      bgColor: "#E5E5E5",
    },{
      name: "Total Earning",
      count: `${data?.data?.totalEarnings}`,
      icon: <GrMoney color="#6A5ECC" size={24} />,
      bgColor: "#E5E5E5",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-4 gap-3 items-center mt-4">
        {datas.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-md p-10 "
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                background: `${item.bgColor}`,
                width: "44px",
                height: "44px",
                borderRadius: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {item?.icon}
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",

                  fontSize: "1.2em",
                  fontWeight: "400",
                  color: "#6A6D7C",
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontSize: "1.6em",
                  fontWeight: "600",
                  color: "#6A5ECC",
                }}
              >
                {item.count}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: "20px",
          marginBottom: "15px",
          display: "grid",
          gridTemplateColumns: "auto auto",
          gap: "20px",
        }}
      >
        <div
          className="bg-black"
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            width: "100%",
            height: "370px",
            padding: "10px 20px 20px 20px",
          }}
        >
          <TotalSellerChart totalUser={totalUser} />
        </div>
        <div
          style={{
            borderRadius: "15px",
            backgroundColor: "#fff",
            width: "100%",
            height: "370px",
            padding: "10px 20px 20px 20px",
          }}
        >
          <DailyOverviewChart totalSalon={totalSalon} />
        </div>
      </div>
      <div
        style={{
          borderRadius: "15px",
          backgroundColor: "#fff",
          width: "100%",
          height: "424px",
          padding: "10px 20px 20px 20px",
        }}
      >
        <TotalEarningGoth />
      </div>
    </div>
  );
}

export default DashboardHome;
