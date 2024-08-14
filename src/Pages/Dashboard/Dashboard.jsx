import { Layout } from "antd";
import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../assets/logo.png";

import { LuUser } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { GoBell } from "react-icons/go";
import { FaStore, FaFire } from "react-icons/fa";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { TbCategoryPlus } from "react-icons/tb";
import { FiUserPlus, FiLogOut } from "react-icons/fi";

import { RiNotification2Line } from "react-icons/ri";
import { useGetProfileQuery } from "../../redux/apiSlices/AuthApi";
import { imageURL } from "../../redux/api/apislice";
import { calc } from "antd/es/theme/internal";
const { Header, Sider, Content } = Layout;

const Dashboard = () => {
  const [setting, setSetting] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  
  const handleLogOut = () => {
    navigate("/login");
    window.location.reload();
  };
  const { data } = useGetProfileQuery();

  const ProfileImage = data?.user?.profileImage?.startsWith("https")
    ? data?.user?.profileImage
    : `${imageURL}${data?.user?.profileImage}`;
  const name = data?.user?.name;

  const linkItems = [
    {
      title: "Dashboard",
      path: "/",
      icon: <MdOutlineDashboard size={24} />,
    },
    {
      title: "User Details",
      path: "/user-list",
      icon: <LuUser size={24} />,
    },
    {
      title: "Salons Details",
      path: "/salon-list",
      icon: <FaStore size={24} />,
    },
    {
      title: "Salon Category",
      path: "/salon-category-list",
      icon: <TbCategoryPlus size={24} />,
    },
    {
      title: "Orders Transaction",
      path: "/order-transaction-list",
      icon: <LiaFileInvoiceDollarSolid size={24} />,
    },
    {
      title: "Settings",
      path: "/setting",
      icon: <IoSettingsOutline size={24} />,
      option: true,
      optionsItems: [
        {
          title: "Slider Setting",
          path: "/slider-setting",
        },
        {
          title: "About Us",
          path: "/about",
        },
        {
          title: "Privacy Policy",
          path: "/privacy",
        },
        {
          title: "FAQ",
          path: "/faq",
        },
        {
          title: "Terms & Condition",
          path: "/terms",
        },
      ],
    },
    {
      title: "Add admin",
      path: "/make-admin",
      icon: <FiUserPlus size={24} />,
    },
    {
      title: "Log out",
      path: "/login",
      icon: <FiLogOut size={24} />,
    },
  ];

  return (
    <Layout style={{ height: "100vh", width: "100vw" }}>
      <Sider
        width="17vw"
        trigger={false}
        style={{
          position: "fixed",
          height: "calc(100vh - 2px)",
          paddingBottom: "60px",
          zIndex: 2,
          backgroundColor: "white",
        }}
      >
        <div
          className="logo"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            width: "100%",
            // height: 60,
            padding: "0 0 20px 0",
          }}
        >
          <Link to="/">
            <img src={Logo} height="40px" />
          </Link>
        </div>

        <ul
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            height: "100%",
            marginTop: 0,
          }}
        >
          {linkItems.map((item, index) => (
            <li
              key={index}
              style={{
                width: "100%",
                position: "relative",
                paddingLeft: "40px",
              }}
            >
              {item.option ? (
                <Link
                  to={item.path}
                  style={{
                    width: "100%",
                  }}
                >
                  <div
                    onClick={() => {
                      setSetting(!setting);
                    }}
                    style={{
                      display: "flex",

                      color: setting ? "white" : "#6A6D7C",
                      alignItems: "flex-end",
                      margin: "auto  0 auto 0",
                      gap: "14px",
                      background: setting ? "#6A5ECC" : "white",
                      width: "100%",
                      padding: "10px 10px",
                      borderRadius: "100px 0px 0px 100px",
                    }}
                  >
                    <div style={{ height: "24px" }}>{item.icon}</div>
                    <div
                      style={{
                        fontSize: "14px",
                        textAlign: "center",
                        height: "fit-content",
                      }}
                    >
                      {item.title}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      flexDirection: "column",
                      marginTop: setting ? "15px" : 0,
                      marginBottom: "-7px",
                    }}
                  >
                    {setting &&
                      item.optionsItems.map((optionItem, optionIndex) => (
                        <Link
                          to={optionItem.path}
                          key={optionIndex}
                          style={{
                          
                            height: "50px",
                            borderRadius: "0 10px 10px 0",
                            width: "100%",
                          }}
                        >
                          <Link
                            to={optionItem.path}
                            style={{
                              display: "flex",

                              color: "#6A6D7C",
                              alignItems: "flex-end",
                              margin: "auto  0 auto 0",
                              gap: "14px",
                              background:
                                optionItem.path === pathname
                                  ? "#D0D2CE"
                                  : "white",
                              width: "100%",
                              padding: "10px 10px",
                              borderRadius: "100px 0px 0px 100px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "14px",
                                textAlign: "center",
                                height: "fit-content",
                              }}
                            >
                              {optionItem.title}
                            </div>
                          </Link>
                        </Link>
                      ))}
                  </div>
                </Link>
              ) : (
                <Link
                  to={item.path}
                  style={{
                    display: "flex",
                    color: item.path === pathname ? "white" : "#6A6D7C",
                    alignItems: "flex-end",
                    margin: "auto  0 auto 0",
                    gap: "14px",
                    background: item.path === pathname ? "#6A5ECC" : "white",
                    width: "100%",
                    padding: "10px 10px",
                    borderRadius: "100px 0px 0px 100px",
                  }}
                >
                  <div style={{ height: "24px" }}>{item.icon}</div>
                  <div
                    style={{
                      fontSize: "14px",
                      textAlign: "center",
                      height: "fit-content",
                    }}
                  >
                    {item.title}
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </Sider>

      <Layout> 
        <Header
          style={{
            position: "fixed",
            width: "100%",
            height: "80px",
            zIndex: 1,
            padding: 0,
            background: "white",
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "75px",
            paddingLeft: "17vw",
          }}
        >
          <div
            style={{
              width: "220px",
              display: "flex",
              alignItems: "center",
              gap: "15px",
              justifyContent: "space-between",
            }}
          >
            <Link to="/notification">
              <div
                style={{
                 
                  width: 50,
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                  position: "relative",
                }}
              >
                <RiNotification2Line color="#6A5ECC" size={19} />

                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    background: "#F8EC41",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "#6A5ECC",
                    position: "absolute",
                    top: 8,
                    right: 10,
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  5
                </div>
              </div>
            </Link>
            <Link
              to={"/admin-profile"}
              style={{
                height: "42px",
                cursor: "pointer",
                borderRadius: "5px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "10px",
              }}
            >
              <img
                src={ProfileImage}
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "100%",
                  borderColor: "#6A5ECC",
                  borderWidth: 2,
                }}
                alt=""
              />
              <h2
                style={{
                  color: "#6A5ECC",
                  fontSize: "16px",
                  fontWeight: "600",
                  width: 200,
                }}
              >
                {name}
              </h2>
            </Link>
          </div>
        </Header>

        <Content
          style={{
            marginTop: "60px",
            marginBottom: "20px",
            marginLeft: "17%",
            marginRight: "40px",

            overflow: "auto",
            padding: "20px",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default Dashboard;
