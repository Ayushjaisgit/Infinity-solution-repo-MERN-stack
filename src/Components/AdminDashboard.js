import React, { useState , useEffect } from "react";
import {API_BASE_URL} from '../api'
import { Table } from "antd";
import { Navbar } from "./Navbar";
import axios from "axios";

// import {getAll} from "../Task"
// { allocatedTasks, unallocated, employees }

export const AdminDashboard = () => {
  // const [selectedTask, setSelectedTask] = useState(null);
  const [unallocatedTasks, setUnallocatedTasks] = useState('');
  const [allocatedTasks, setallocatedTasks] = useState('');
  const [tasks, setTask] = useState(null);

  const fetchUnallocatedTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/unallocated-tasks`);
      setUnallocatedTasks(response.data);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchallocatedTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/allocated-tasks`,{});
      setallocatedTasks(response.data);
      console.log(response)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    fetchUnallocatedTasks()
    fetchallocatedTasks()
    getList()
  },[])

  console.log(tasks,'tasks1')
  
const getList = async()=>{
  const responseList = await axios.get(`${API_BASE_URL}/employee/list`);
  // const data = await responseList.data.map((d)=>{
  //   return {
  //     id: d._id,
  //     username:d.username
  //   }
  // })
  setTask(responseList.data)
  
}


  // const renderEmployeeMenu = () => (
  //   // <Menu>
  //   //   {employees.map((employee) => (
  //   //     <Menu.Item key={employee.id} onClick={() => handleAssignTask(employee.id)}>
  //   //       {employee.name}
  //   //     </Menu.Item>
  //   //   ))}
  //   // </Menu>
  // );
  const items = tasks
  console.log(items,'tasks')

  const columns = [
    {
      title: "Task Name",
      dataIndex: "productType",
      key: "name",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
      key: "description",
    },
    {
      title: "Issue Description",
      dataIndex: "issueDescription",
      key: "description",
    },

    {
      title: "Assign Task",
  
    //   render: (record) => ( 
    //     <>
    //   <Dropdown  menu={
       
    // } >abc</Dropdown>
    // </>
    // )

    },
  ];
  const column2 = [
    {
      title: "Product Type",
      dataIndex: "productType",
      key: "name",
    },
    {
      title: "Issue Type",
      dataIndex: "issueType",
      key: "description",
    },
    {
      title: "Issue Description",
      dataIndex: "issueDescription",
      key: "description",
    },

    {
      title: "Assigned To",
    
      render: (record) =>  <span>{record?.assignedTo?.username}</span>,
    },
  ];


  return (
    <>
    <Navbar/>
    <div className=" text-center max-w-screen-md mx-auto p-5">
      <h2  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2">Unallocated Tasks</h2>
      <Table dataSource={unallocatedTasks} columns={columns} />

      <h2  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2">Allocated Tasks</h2>
      <Table dataSource={allocatedTasks} columns={column2} />

    </div>
    </>
  );
};

export default AdminDashboard;
