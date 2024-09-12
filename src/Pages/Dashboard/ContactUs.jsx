import { Button, Form, Input, Modal, Table } from 'antd';
import React, { useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa';
import { useGetContactQuery, usePostContactMutation, useUpdateContactMutation } from '../../redux/apiSlices/AboutApi';
import Swal from 'sweetalert2';

const ContactUs = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null) 
    const {data:contact , refetch} = useGetContactQuery()  
    const [postContact]= usePostContactMutation() 
    const [updateContact] = useUpdateContactMutation() 
    const [form] = Form.useForm()
    // console.log(contact);  

    const data = contact?.data?.map((value , index)=>({ 
        key:index+1 ,
         email: value?.email,
          contact: value?.contact , 
          id:value?._id
    }))  

    useEffect(()=>{ 
        if(value){
            form.setFieldsValue({email:value?.email , contact:value?.contact})
        }
    } ,[value])

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


    const handleSubmit=async(values)=>{  
        const data ={
            id: value?.id ,
            ...values
        }
        console.log(data); 
            if(value){
                await updateContact(data).then((response)=>{ 
                    console.log(response);
                    if (response?.data?.statusCode === 200) {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: response?.data?.message,
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(()=>{ 
                            refetch()
                         setOpen(false)  
                            setValue(null) ,
                            form.resetFields() 
                        })   
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: "error",
                          title: response?.error?.data?.message,
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                })              
            } 
            else{ 
                await postContact(values).then((response)=>{ 
                    console.log(response);
                    if (response?.data?.statusCode === 200) {
                        Swal.fire({
                          position: "center",
                          icon: "success",
                          title: response?.data?.message,
                          showConfirmButton: false,
                          timer: 1500,
                        }).then(()=>{
                            refetch()  
                            setOpen(false)  
                            setValue(null) ,
                            form.resetFields() 
                        }) 
                      } else {
                        Swal.fire({
                          position: "center",
                          icon: "error",
                          title: response?.error?.data?.message,
                          showConfirmButton: false,
                          timer: 1500,
                        });
                      }
                })
            }   
    }
    return (
        <div className='bg-white h-full rounded-xl p-6 mt-4'>
            <div className='mb-6 flex items-center justify-between'>
                <h1 className='text-xl font-normal'>Contact Information</h1> 
                {
                    contact?.data.length === 0 ?   <button onClick={()=>setOpen(true)} className='bg-[#6A5ECC] text-white h-10 px-4 rounded-lg'>Add Contact Info</button> :""
                }
               
            </div>

            <Table columns={columns}  dataSource={data} pagination={false} />

            <Modal
                title={<p className=' px-6 pt-6'>{value ? "Edit Contact Information" : "Add Contact Information"}</p>}
                open={open}
                onCancel={()=>(setOpen(false), setValue(null))}
                footer={false}
            >
                <Form layout='vertical' onFinish={handleSubmit} className='p-6' form={form}>
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

                    <Button htmlType='submit'   className='bg-[#6A5ECC] w-full h-10 rounded-lg text-white'>Submit</Button>
                </Form>
            </Modal>
        </div>
    )
}

export default ContactUs