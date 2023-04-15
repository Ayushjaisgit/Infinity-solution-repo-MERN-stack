import React, { useState } from 'react';
import { Select, Upload, Button, Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Navbar } from './Navbar';
import {API_BASE_URL} from '../api'
import axios from 'axios';

const { Option } = Select;

export const AddRequest = () => {
  const [productType, setProductType] = useState('');
  const [issueType, setIssueType] = useState('');
  const [description, setDescription] = useState('');
  // const [file, setFile] = useState(null);

  const handleProductTypeChange = (value) => {
    setProductType(value);

    // Reset issue type when product type is changed
    setIssueType('');
  };

  const handleIssueTypeChange = (value) => {
    setIssueType(value);

  };

  const getProductTypeOptions = () => {
    return (
      <>
        <Option value="Mobile Phone">Mobile Phone</Option>
        <Option value="TV">TV</Option>
        <Option value="Refrigerator">Refrigerator</Option>
        <Option value="Washing Machine">Washing Machine</Option>
      </>
    );
  };

  const getIssueTypeOptions = () => {
    switch (productType) {
      case 'Mobile Phone':
        return (
          <>
            <Option value="broken-screen">Broken Screen</Option>
            <Option value="faulty-camera">Faulty Camera</Option>
            <Option value="overheating-issue">Overheating Issue</Option>
          </>
        );
      case 'TV':
        return (
          <>
            <Option value="damaged-screen">Damaged Screen</Option>
            <Option value="discoloration-of-screen">Discoloration Of Screen</Option>
            <Option value="adapter-issues">Adapter Issues</Option>
          </>
        );
      case 'Refrigerator':
        return (
          <>
            <Option value="panel-controls-broken">Panel Controls Broken</Option>
            <Option value="compressor-not-working">Compressor Not Working</Option>
            <Option value="unable-to-turn-on">Unable To Turn On</Option>
          </>
        );
      case 'Washing Machine':
        return (
          <>
            <Option value="water-overflowing">Water overflowing</Option>
            <Option value="motor-not-working">Motor not working</Option>
          </>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productType', productType);
    formData.append('issueType', issueType);
    formData.append('description', description);

    try {
      await axios.post (`${API_BASE_URL}/support-request`, formData);

      const response = await axios.post(`${API_BASE_URL}/login`, {
        productType: productType,
        issueType: issueType,
        issueDescription: description, 
      });
      // Show success message or redirect to success page
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
<Navbar/>
    <div className="max-w-screen-md mx-auto p-5">
  <div className="text-center mb-16">
    <p className="mt-4 text-sm leading-7 text-gray-500 font-regular uppercase">
        Contact Support
      </p>
      <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
        New <span className="text-green-600"> Request</span>
      </h3>
  </div>
  
  <form className="w-full" onSubmit={handleSubmit}>
  <div className="flex flex-wrap -mx-3 mb-6">
  <h3  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2" >Product Type:</h3>
      <Select placeholder="Select product type" onChange={handleProductTypeChange} style={{ width: 200 }}>{getProductTypeOptions()}</Select>

      <h3  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 p-2" >Issue Type:</h3>
      <Select mode="single" placeholder="Select issue type" onChange={handleIssueTypeChange} style={{ width: 200 }} value={issueType} disabled={!productType}>
        {getIssueTypeOptions()}
      </Select>
 
  </div>
  
    
    <div className="flex flex-wrap -mx-3 mb-6">
    <div className="w-full px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
        Issue Description
      </label>
      <textarea  value={description} onChange={(e) => setDescription(e.target.value)}  rows="10" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
        
      </textarea>
    </div>
    <div className="flex justify-between w-full px-3">
      <div className="md:flex md:items-center">
        <label className="block text-gray-500 font-bold">
            {/* <Form>
        <Form.Item label="Upload" required>
                
        <Upload>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
            </Form> */}
        </label>
      </div>
      <button className="shadow bg-green-600 hover:bg-green-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-6 rounded" type="submit">
        Send Message
      </button>
    </div>
      
  </div>
    
</form>
</div>
    </>
  );
};
