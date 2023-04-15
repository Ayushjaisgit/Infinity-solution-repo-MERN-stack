import { useState, useEffect } from 'react';
import { Table, Button, Modal, Select } from 'antd';
// import { getAssignedTasks, updateTaskStatus } from '../api'; // import API functions to fetch and update data

const { Option } = Select;

export const EmployeePage = ({ employeeId }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

//   useEffect(() => {
//     // Fetch assigned tasks for this employee
//     getAssignedTasks(employeeId)
//       .then((data) => setTasks(data))
//       .catch((error) => console.error(error));
//   }, [employeeId]);

  const columns = [
    {
      title: 'Customer Username',
      dataIndex: 'customerUsername',
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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => handleMoreDetails(record)}>
          More Details
        </Button>
      ),
    },
  ];

  const handleMoreDetails = (record) => {
    setSelectedTask(record);
    setShowModal(true);
  };

//   const handleStatusChange = () => {
//     // Update the selected task status with the new status
//     updateTaskStatus(selectedTask.id, newStatus)
//       .then(() => {
//         // Close modal and update task status in the tasks array
//         setShowModal(false);
//         setTasks((prevState) =>
//           prevState.map((task) =>
//             task.id === selectedTask.id ? { ...task, status: newStatus } : task
//           )
//         );
//       })
//       .catch((error) => console.error(error));
//   };

  return (
    <>
      <Table columns={columns} dataSource={tasks} />
      {showModal && (
        <Modal
          title="Task Details"
          visible={showModal}
          onCancel={() => setShowModal(false)}
          footer={[
            <Button key="back" onClick={() => setShowModal(false)}>
              Cancel
            </Button>,
            <Button
              key="submit"
              type="primary"
            //   onClick={handleStatusChange}
              disabled={!newStatus}
            >
              Submit
            </Button>,
          ]}
        >
          <p>Customers Username: {selectedTask.customerUsername}</p>
          <p>Product Type: {selectedTask.productType}</p>
          <p>Issue Type: {selectedTask.issueType}</p>
          <p>Date of Submission: {selectedTask.dateOfSubmission}</p>
          <p>Status:</p>
          <Select
            value={newStatus}
            onChange={(value) => setNewStatus(value)}
            style={{ width: '100%' }}
          >
            <Option value="In Progress">In Progress</Option>
            <Option value="On Hold">On Hold</Option>
            <Option value="Completed">Completed</Option>
          </Select>
        </Modal>
      )}
    </>
  );
};

