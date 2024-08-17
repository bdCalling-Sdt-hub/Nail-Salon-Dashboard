import { useEffect, useRef, useState } from "react";
import { Dropdown, Input, Modal, Select, Table } from "antd";
import { useSalonDetailsQuery, useSalonFeaturedMutation } from "../../redux/apiSlices/SalonApi";
import { imageURL } from "../../redux/api/apislice";
import SalonDetailsModal from "../../Components/SalonDetailsModal";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";

const SalonDetailsList = () => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [modalData, setModalData] = useState({});  
  const [isFeatured , setIsFeatured]= useState()
  const [keyword, setKeyword] = useState(""); 

  const { data  , refetch} = useSalonDetailsQuery({ searchValue: keyword , isFeatured: isFeatured}); 

  // console.log(data);   
  const [salonFeatured] = useSalonFeaturedMutation()

  const totalPage = data?.data?.meta?.total;
  const datas = data?.data?.data?.map((value, index) => ({
    key: index + 1,
    id: value?._id ,
    salon: {
      name: value?.name,
      img: value?.profileImage?.startsWith("https")
        ? value?.profileImage
        : `${imageURL}${value?.profileImage}`,
    },
    email: value?.email,
    contact: value?.contact,
    location: value?.location,
    rating: value?.totalRating,
    description: value?.description,
    openingTime: value?.openingTimes,
    openingDay: value?.openingDays,
    featured: value?.featured,
  }));

  const SalonDetails = (values) => {
    setOpen(true);
    setModalData(values);
  };

  const handlePage = (page) => {
    setCurrentPage(page);
  };

  const handleFeature = async(id) => {  
    try {
      await salonFeatured(id).then((res)=>{ 
        // console.log(res?.data?.statusCode)    
if(res?.data?.statusCode === 200){
  Swal.fire({
    position: "center",
    icon: "success",
    title: res?.data?.message ,
    showConfirmButton: false,
    timer: 1500,
  })
 refetch()
}
      })
    } catch (error) {
      // console.log(error); 
    }
  }; 

  const Features= [ 

    {
      value: "true",
      label: 'Featured On',
    },
    {
      value: "false",
      label: 'Featured off',
    },
  ] 


  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Salon",
      dataIndex: "salon",
      key: "salon",
      render: (salon) => {
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
              src={salon?.img}
              alt="ok"
            />
            <p
              style={{
                letterSpacing: 0.4,
                fontSize: "#666666",
                fontWeight: "400",
              }}
            >
              {salon?.name}
            </p>
          </div>
        );
      },
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      width: 150,
      textAlign: "center",
      render: (_, record) => (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >
          <button
            style={{
              cursor: "pointer",
              border: "none",
              outline: "none",
            }}
            onClick={() => SalonDetails(record)}
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

          <button
            onClick={() => handleFeature(record?.id)}
            className={`${
              !record?.featured
                ? "bg-[#CCCCCC] text-[#808080]"
                : "bg-[#6A5ECC] text-white"
            }`}
            style={{
              fontSize: 10,
              fontWeight: "400",
              padding: "10px 10px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <span>
              {record?.featured ? "Featured On" : "Featured Off"}
            </span>
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
              All salon list
            </h3>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}> 
 {/* search bar   */} 
 <Input
              // <Search color="#fff" /> 
              style={{
                width: 310,
                background: "#F2F2F2",
                boxShadow: "none",
                color: "black",
              }}
              className=" h-10  border-0 text-primary placeholder:text-black hover:text-black"
              placeholder="Search by location..."  
              prefix={<FaSearch color="gray"  size={18}/> }
              onChange={(e) => setKeyword(e.target.value)}
              // value={keyword}
            />


<Select
     placeholder="Filter By Featured"
      style={{
        width: 150, 
        height: 40
      }}
      onChange={(e)=>setIsFeatured(e)}
      options={Features}
    />
       
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            style={{}}
            dataSource={datas}
            pagination={{
              total: { totalPage },
              current: currentPage,
              onChange: handlePage,
            }}
          />
        </div>
      </div>

      <SalonDetailsModal open={open} setOpen={setOpen} modalData={modalData} />
    </div>
  );
};

export default SalonDetailsList;
