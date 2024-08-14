import { Modal } from 'antd'; 
import { FaCircle } from "react-icons/fa";
import React from 'react';
import moment from 'moment';

const OrdersTransactionModal = ({open ,setOpen , modalData }) => { 
    console.log(modalData); 

    const totalPrice = modalData?.price?.reduce((sum, service) => {
        return sum + parseFloat(service?.price || 0);
      }, 0);  
  

      const bookingTime = moment(modalData?.booking_time, "HH:mm a").format('LT')

    return (
        <div>
                 <Modal
        centered
        footer={false}
        open={open}
        onCancel={() => setOpen(false)}
        width={500}
      >
        <div className="px-10 py-5 flex flex-col justify-start gap-2 pt-8">
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">Name</p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.user?.name}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">
              Order No:
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.bookingId}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">Address</p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.user?.location}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">
              Salon Name
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.salon}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">Phone</p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.user?.contact}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">
              Booking Date
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {modalData?.booking_date}
            </p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[#000000] text-sm whitespace-nowrap">
              Booking Hours
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              {bookingTime}
            </p>
          </div>
 <p className=' border-t-2 bg-slate-500 my-2'> </p>
          <div className=""> 

            {
                modalData?.service_orders?.map((value , index )=><div key={index} className='flex justify-between items-center pb-2'> 
 <p className="text-[#000000] text-sm whitespace-nowrap">
            {value?.serviceName}
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              ${value?.price}
            </p>
                </div>)
            }
           
          </div> 

          <p className=' border-t-2 bg-slate-500 mb-1'> </p> 
 
          <div  className='flex justify-between items-center pb-2'> 
 <p className="text-[#000000] text-sm whitespace-nowrap">
            Total Price
            </p>
            <p className="text-[#000000] text-sm font-medium whitespace-nowrap">
              ${totalPrice}
            </p>
                </div> 


          <div className={`flex justify-start items-center gap-2 ${modalData?.status === "Complete" ? "text-[#00B047]" : "text-[#F27405]"}  `}>
            <FaCircle className="text-xl" /> {modalData?.status}
          </div>
        </div>
      </Modal>
        </div>
    );
};

export default OrdersTransactionModal;