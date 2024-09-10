import { Form, Input, Modal, Table } from 'antd';
import React, { useState } from 'react'
import { FaEdit } from 'react-icons/fa';

const ContactUs = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const columns = [
        {
            title: "S.No",
            dataIndex: "key",
            key: "key",
            render: (_, record, index)=> <p>{index + 1}</p>
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Contact Number",
            dataIndex: "contact",
            key: "contact",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            render: (_, record) => <FaEdit onClick={()=>(setValue(record), setOpen(true))} size={24} color='#888888' className='cursor-pointer'   />
        },
    ];

    const data = [
        {
            email: "nadirhossain336@gmail.com",
            contact: "017569536984"
        }
    ]

    const handleSubmit=async(values)=>{
        try {

            if(value){
                await createContact(values).unwrap().then((res)=>{
                    if(res.status === 200){}
                })
                return;
            }
            await createContact(values).unwrap().then((res)=>{
                if(res.status === 200){}
            })
        } catch (error) {
            
        }
    }
    return (
        <div className='bg-white h-full rounded-xl p-6 mt-4'>
            <div className='mb-6 flex items-center justify-between'>
                <h1 className='text-xl font-normal'>Contact Information</h1>
                <button onClick={()=>setOpen(true)} className='bg-[#6A5ECC] text-white h-10 px-4 rounded-lg'>Add Contact Info</button>
            </div>

            <Table columns={columns}  dataSource={data} pagination={false} />

            <Modal
                title={<p className=' px-6 pt-6'>{value ? "Edit Contact Information" : "Add Contact Information"}</p>}
                open={open}
                onCancel={()=>(setOpen(false), setValue(null))}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit} className='p-6'>
                    <Form.Item
                        label="Email"
                        name={"email"}
                        rules={[
                            {
                                required: true,
                                 message: "Please Enter Email"
                            }
                        ]}
                    >
                        <Input
                            placeholder='Enter Email'
                            style={{
                                height: 40,
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none",
                                background: "transparent"
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Contact Number"
                        name={"contact"}
                        rules={[
                            {
                                required: true,
                                 message: "Please Enter Contact Number"
                            }
                        ]}
                    >
                        <Input
                            placeholder='Enter Contact Number'
                            style={{
                                height: 40,
                                border: "1px solid #d9d9d9",
                                outline: "none",
                                boxShadow: "none",
                                background: "transparent"
                            }}
                        />
                    </Form.Item>

                    <button type='submit' className='bg-[#6A5ECC] w-full h-10 rounded-lg text-white'>Submit</button>
                </Form>
            </Modal>
        </div>
    )
}

export default ContactUs