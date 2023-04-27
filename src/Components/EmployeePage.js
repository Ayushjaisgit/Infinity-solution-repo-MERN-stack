import { useState, useEffect } from 'react';
import {API_BASE_URL} from '../api'
import axios from "axios";
import { Table, Button, Modal, Select } from 'antd';
import { Navbar } from './Navbar';
// import { getAssignedTasks, updateTaskStatus } from '../api'; // import API functions to fetch and update data

const { Option } = Select;

export const EmployeePage = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);
  // const [selectedTask, setSelectedTask] = useState(null);
  // const [showModal, setShowModal] = useState(false);
  // const [newStatus, setNewStatus] = useState('');

  const fetchUnallocatedTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/my-tasks`);
      // let respo = response.data.split('')
      if(response){
        setTasks(response.data);
      }else{
        alert('No Task has been Assigned to You')
      }

      console.log(response)
    } catch (error) {
      alert('No Task has been Assigned to You')
      console.error(error);
    }
  };
  useEffect(() => {
    // Fetch assigned tasks for this employee
    fetchUnallocatedTasks()
  },[]);

  const columns = [
    {
      title: 'Customer Username',
      dataIndex: 'username',
      key: 'customerUsername',
    },
    {
      title: 'Product Type',
      dataIndex: 'productType',
      key: 'productType',
    },
    {
      title: 'Issue Type',
      dataIndex: 'issueType',
      key: 'issueType',
    },
    {
      title: 'Date of Submission',
      dataIndex: 'dateOfSubmission',
      key: 'dateOfSubmission',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  return (
    <>
    <Navbar/>
      <Table dataSource={tasks}  columns={columns}  />
    </>
  );
};

