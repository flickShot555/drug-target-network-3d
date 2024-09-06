import React, { useState, useRef } from 'react';
import { Button, Modal } from 'antd';
import html2canvas from 'html2canvas';

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
      <Button type="primary" onClick={showModal}>
        Export
      </Button>
      <Modal
        title="Export Chart as"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('png')}>
            Download PNG
          </Button>
          <Button type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('jpeg')}>
            Download JPEG
          </Button>
        </div>
      </Modal>

      {/* Render the graph component inside a div with a ref */}
    
    </>
  );
};

export default ExportChartModal;
