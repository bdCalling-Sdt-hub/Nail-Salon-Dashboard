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
} from "recharts";

const DailyOverviewChart = ({ totalSalon }) => {
  console.log(totalSalon);

  const data = totalSalon?.map((value) => ({
    name: value?.name,
    uv: value?.totalUser,
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
          Total Salon statistics
        </p>
      </div>
      <ResponsiveContainer width={"100%"} height={300}>
        <LineChart data={data} barGap={100}>
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
            tickCount={15}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <Line
            connectNulls
            type="linear"
            dataKey="uv"
            stroke="#734D2C"
            fill="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DailyOverviewChart;
