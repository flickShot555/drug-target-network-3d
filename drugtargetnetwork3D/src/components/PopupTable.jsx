import React, { useState, useEffect } from 'react';
import { Table, Modal } from 'antd';

// Format Data Functions (Converted)
const formatData = (data) => {
  const lines = data.split('|');
  return lines.slice(0, -1).map((line, index) => {
    const parts = line.split(';');
    return (
      <span key={index}>
        <b>{parts[0]}</b>
        <a href="https://cancer.sanger.ac.uk/cosmic" target="_blank" rel="noreferrer">
          {parts[1]}
        </a>
        <br />
      </span>
    );
  });
};

const formatData2 = (data) => {
  const lines = data.split('|');
  return lines.slice(0, -1).map((line, index) => {
    const parts = line.split(':');
    return (
      <span key={index}>
        <b>{parts[0]}</b>: {parts[1]}
        <br />
      </span>
    );
  });
};

const formatData3 = (data) => {
  const lines = data.split('|');
  return lines.slice(0, -1).map((line, index) => {
    const parts = line.split('=');
    return (
      <span key={index}>
        <b>{parts[0]}</b> = {parts[1]}
        <br />
      </span>
    );
  });
};

const formatData4_compound = (data, data2) => {
  const lines = data.substring(1).split(', ');
  const lines2 = data2.split(', ');
  console.log(lines2 ,data2 , "here are the lines 2 ")
  const formattedLines = [];

  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].substring(1).split(' (PChEMBL=');
    const entityName = parts[0];
    const pChembl = parts[1]?.slice(0, -1); // Safely handle the closing parenthesis

    // JSX link for each target
    formattedLines.push(
      <span key={i}>
        <a href={`https://www.uniprot.org/uniprotkb/${lines2[i].substring(1, lines2[i].length - 1)}/entry`} target="_blank" rel="noreferrer">
          {entityName}
        </a> (PChEMBL={pChembl}),
        <br />
      </span>
    );
  }

  return formattedLines;
};

// React Component for Popup Table
const PopupTable = ({ visible, onClose, nodeId, tableData }) => {
  const [formattedTableData, setFormattedTableData] = useState([]);

  useEffect(() => {
    const formattedData = Object.entries(tableData).reduce((acc, [key, value]) => {
      let formattedValue;

      if (key === 'CROSS_REFERENCES_CELL_LINES') {
        formattedValue = formatData(value);
      } else if (key === 'COMMENTS') {
        formattedValue = formatData2(value);
      } else if (key === 'REFERENCE_ID') {
        formattedValue = formatData3(value);
      } else if (key === 'TARGETS') {
        formattedValue = formatData4_compound(value, tableData.TARGETS_UNIPROT);
      } else if (key === 'TARGETS_UNIPROT' || key === "Source_DB_DR_ID" || key ==="PREFERRED_COMPOUND_NAME") {
        // Do nothing to exclude this field from rendering
        return acc;
      } else {
        formattedValue = <span>{value}</span>;
      }

      const fieldName = getFieldName(key);

      acc.push({ field: fieldName, value: formattedValue });
      return acc;
    }, []);

    setFormattedTableData(formattedData);
  }, [tableData]);

  const getFieldName = (key) => {
    switch (key) {
      case 'CROSS_REFERENCES_CELL_LINES':
        return 'Cross Reference Cell Lines';
      case 'COMMENTS':
        return 'Comments';
      case 'REFERENCE_ID':
        return 'Reference ID';
      case 'TARGETS':
        return 'Targets';
      case 'COMPOUND_NAME':
        return 'Compound name';
      case 'PUBCHEM_ID':
        return 'PubChem ID';
      case 'CHEMBL_ID':
        return 'ChEMBL ID';
      case 'MAX_PHASE':
        return 'Max clinical phase';
      case 'SMILES':
        return 'SMILE';
      case 'COMPOUND_CLASS':
        return 'Compound class';
      case 'INCHI_KEY':
        return 'Standard InChiKey';
      case 'CELL_LINE_NAME':
        return 'Celline name';
      case 'CELL_LINE_SYNONYM':
        return 'Celline synonym';
      case 'COSMIC_ID':
        return 'Cosmic ID';
      case 'SANGER_MODEL_ID':
        return 'Sanger model ID';
      case 'Source_DB_CL_ID':
        return 'Source DB CL ID';
      case 'TCGA_STUDY_CODE':
        return 'TCGA study code';
      case 'ONCOTREE_CODE':
        return 'Oncotree code';
      case 'ONCOTREE_LINEAGE':
        return 'Oncotree lineage';
      case 'ONCOTREE_PRIMARY_DISEASE':
        return 'Oncotree primary disease';
      case 'CELLOSAURUS_DISEASE':
        return 'Cellosaurus disease';
      default:
        return key;
    }
  };
  
  const columns = [
    { title: 'Field', dataIndex: 'field', key: 'field' },
    { title: 'Value', dataIndex: 'value', key: 'value' },
  ];

  return (
    <Modal title={nodeId} visible={visible} onCancel={onClose} footer={null} width={600}>
      <Table
        columns={columns}
        dataSource={formattedTableData}
        pagination={false}
        bordered
        scroll={{ y: 400 }}
      />
    </Modal>
  );
};

export default PopupTable;
