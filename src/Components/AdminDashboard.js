import React, { useState , useEffect } from "react";
import { Table, Dropdown, Menu, message } from "antd";
import { Navbar } from "./Navbar";
// import {getAll} from "../Task"


export const AdminDashboard = ({ allocatedTasks, unallocatedTasks, employees }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTask] = useState(null);
  useEffect(()=>{
    // getList()
  },[])

  const handleAssignTask = (employeeId) => {
    // make a PATCH request to the API to assign the selected task to the employee
    message.success(`Assigned task to employee ${employeeId}`);
  };

  // const getList = ()=>{
    // getAll().
    // then(res=>{
// console.log(res)
// setTask(res)
    // }).
    // catch((err)=>{
      // console.log(err)
    // })
  // }

  const renderEmployeeMenu = () => (
    <Menu>
      {employees.map((employee) => (
        <Menu.Item key={employee.id} onClick={() => handleAssignTask(employee.id)}>
          {employee.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const columns = [
    {
      title: "Task Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (assignedTo) => assignedTo || <Dropdown menu={renderEmployeeMenu()}></Dropdown>,
    },
  ];

  return (
    <>
    <Navbar/>
    <div className=" text-center max-w-screen-md mx-auto p-5">
      <h2  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2">Unallocated Tasks</h2>
      <Table dataSource={unallocatedTasks} columns={columns} />

      <h2  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2">Allocated Tasks</h2>
      <Table dataSource={allocatedTasks} columns={columns} />

    </div>
    </>
  );
};

export default AdminDashboard;
