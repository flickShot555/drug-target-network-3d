import React, { useState } from "react";
import { Modal, Table } from "antd"; // Ant Design components

// Popup Table Component
const PopupTable = ({ visible, onClose, nodeId, tableData }) => {
  const columns = [
    { title: "Field", dataIndex: "field", key: "field" },
    { title: "Value", dataIndex: "value", key: "value" },
  ];

  return (
    <Modal
      title={nodeId}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={600}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        bordered
      />
    </Modal>
  );
};

export default PopupTable;
