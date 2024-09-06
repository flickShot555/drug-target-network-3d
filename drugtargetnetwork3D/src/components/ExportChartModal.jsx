import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import html2canvas from 'html2canvas';

const ExportChartModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const captureScreenshot = async (format) => {
    const element = document.body; // You can change this to a specific chart or section you want to capture

    const canvas = await html2canvas(element);
    const imageData = canvas.toDataURL(`image/${format}`);

    // Create a link and trigger the download
    const link = document.createElement('a');
    link.href = imageData;

    if (format === 'png') {
      link.download = 'chart.png';
    } else if (format === 'jpeg') {
      link.download = 'chart.jpeg';
    }
    link.click();
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
        footer={null} // Remove default footer
        centered
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Button type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('png')}>
            Download PNG
          </Button>
          <Button type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('jpeg')}>
            Download JPEG
          </Button>
          <Button type="primary" onClick={() => captureScreenshot('xls')}>
            Download XLS
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ExportChartModal;
