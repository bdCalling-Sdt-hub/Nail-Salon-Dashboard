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
} from "recharts";

const TotalSellerChart = ({ totalUser }) => {
  const data = totalUser?.map((value) => ({
    name: value?.name,
    uv: value?.totalUser,
    pv: 2400,
    tv: "12k",
    amt: 10,
  }));

  const [year, setYear] = useState(2024);

  const onClick = ({ key }) => {
    setYear(key);
  };

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
          Total User statistics
        </p>
      </div>
      <ResponsiveContainer width={"100%"} height={300}>
        <BarChart data={data} barGap={100}>
          <CartesianGrid horizontal vertical={false} />
          <XAxis
            dataKey="name"
            padding="gap"
            minTickGap={2}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Tooltip />
          <YAxis
            tickCount={15}
            width={40}
            fontSize="12px"
            fontWeight="400"
            strokeOpacity={0}
          />
          <Bar barSize={10} dataKey="pv" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalSellerChart;
