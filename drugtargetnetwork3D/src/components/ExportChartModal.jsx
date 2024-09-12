import  { useState } from 'react';
import { Modal } from 'antd';
import CustomButton from './CustomButton';
import { useSelector } from 'react-redux';
import * as XLSX from 'xlsx';

const ExportChartModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const OriginalData = useSelector((state) => state.data.OriginalData); // Get OriginalData from Redux

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const captureScreenshot = async ( ) => {
    setIsModalVisible(false);
    // Implement PNG or JPEG capture logic here
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(OriginalData); // Convert OriginalData to a worksheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data'); // Append worksheet to workbook

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, 'graph_data.xlsx');
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
            boxShadow: '0 4px 8px rgba(255, 255, 255, 0.6)', // Add your desired white shadow here
          }}
        >
          <CustomButton type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('png')}>
            Download PNG
          </CustomButton>
          <CustomButton type="primary" style={{ marginBottom: 10 }} onClick={() => captureScreenshot('jpeg')}>
            Download JPEG
          </CustomButton>
          <CustomButton type="primary" style={{ marginBottom: 10 }} onClick={exportToExcel}>
            Download Excel
          </CustomButton>
        </div>
      </Modal>
    </>
  );
};

export default ExportChartModal;
