import React, { useState, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import { useIncomeGrowthQuery } from "../../../redux/apiSlices/DashboardHomeApi";

const TotalEarningGrowth = () => {
  const { data } = useIncomeGrowthQuery();
  console.log(data);
  const datas = data?.data?.map((value) => ({
    name: value?.name,
    uv: value?.totalIncome,
    pv: 2400,
    tv: "12k",
    amt: 10,
  }));

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          marginTop: "10px",
          marginBottom: "10px",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#555555",
          }}
        >
          Total earning growth
        </p>

      </div>

      <ResponsiveContainer width={"100%"} height={380}>
        <AreaChart data={datas} barGap={100}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6A5ECC" stopOpacity={1} />
              <stop offset="100%" stopColor="#6A5ECC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="name"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <YAxis
            tickCount={5}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Area
            connectNulls
            type="monotone"
            dataKey="uv"
            stroke="#6A5ECC"
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalEarningGrowth;
