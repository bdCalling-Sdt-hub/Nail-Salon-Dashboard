import { Modal } from 'antd';
import React from 'react';
import { FaStar } from "react-icons/fa"; 
import { useSingleSalonDetailsQuery } from '../redux/apiSlices/SalonApi';

const SalonDetailsModal = ({open ,setOpen , modalData }) => {  
    const {data:detailsData} = useSingleSalonDetailsQuery(modalData.id) 
    console.log(modalData);
    return (
        <div>
            <Modal
        open={open}
        onCancel={() => setOpen(false)}
        centered
        footer={false}
        width={700}
      >
        <div>
          <div className="flex justify-center items-center flex-col gap-4">
            <img
              className="w-full h-[180px]"
              src="https://i.ibb.co/CBvrNxh/Rectangle-5252.png"
              alt=""
            />
            <div className="flex justify-center items-center flex-col gap-2 -mt-16">
              <div className="w-20 h-20 rounded-full relative">
                <img
                  className="w-full h-full rounded-full"
                  src={modalData?.salon?.img}
                  alt=""
                />
              </div>
              <p className="text-base font-semibold">
                {modalData?.salon?.name}
              </p>
              <div className="flex justify-start items-center gap-2">
                <FaStar className="text-yellow-500" />
                <p>{modalData?.rating}/5</p>
              </div>
             
            </div>
          </div>
          <div className=" p-5 my-4"> 
            <div className='flex flex-wrap  items-center justify-center gap-4 mb-3'>
            {
detailsData?.data?.map((value)=><div key={value?._id} className=' flex items-center gap-3  border border-gray-200 rounded-xl p-2 '> 
 <p className=''>{value?.serviceName}</p> 
 <p>{value?.price}</p>
</div>)
      }
            </div>
      
            <div >
              <p className="text-sm font-semibold mb-1">About</p>
              <p className=" text-xs">{modalData?.description}</p>
            </div>
          </div>
        </div>
      </Modal>
        </div>
    );
};

export default SalonDetailsModal;