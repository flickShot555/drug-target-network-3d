import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import html2canvas from 'html2canvas';
import CustomButton from './CustomButton';

const ExportChartModal = ({ graphData, getNodeShape }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const captureScreenshot = async (format) => {
    setIsModalVisible(false);
  };

  return (
    <>
      <CustomButton type="primary" onClick={showModal}>
        Export
      </CustomButton>
      <Modal
        title="Export Chart as"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.6)' // Add your desired white shadow here
          }}
        >
          <CustomButton type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('png')}>
            Download PNG
          </CustomButton>
          <CustomButton type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('jpeg')}>
            Download JPEG
          </CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default ExportChartModal;
