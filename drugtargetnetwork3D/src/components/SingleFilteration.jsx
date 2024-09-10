import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Card, Input, Checkbox, Button, Empty ,ConfigProvider } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from "react-redux";
import { updateSingleFilteration } from "./../app/features/data/dataSlice";
import { useSelector as useThemeSelector } from 'react-redux';

const SingleFilteration = () => {
    const dispatch = useDispatch();
    const isDarkMode = useThemeSelector((state) => state.theme.isDarkMode); // Adjust according to your theme slice
    const CompoundNames = useSelector((state) => state.data.CompoundNames);
    const CellineNames = useSelector((state) => state.data.CellineNames);

    const [selectedCompounds, setSelectedCompounds] = useState([...CompoundNames]);
    const [selectedCellLines, setSelectedCellLines] = useState([...CellineNames]);

    const [visible, setVisible] = useState(false);
    const [compoundSearch, setCompoundSearch] = useState('');
    const [cellLineSearch, setCellLineSearch] = useState('');

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const handleClose = () => {
        setVisible(false);
    };

    const handleCompoundChange = (checkedValues) => {
        setSelectedCompounds(checkedValues);

        // Clear the compoundSearch if unchecked
        if (!checkedValues.includes(compoundSearch)) {
            setCompoundSearch('');
        }
    };

    const handleCellLineChange = (checkedValues) => {
        setSelectedCellLines(checkedValues);

        // Clear the cellLineSearch if unchecked
        if (!checkedValues.includes(cellLineSearch)) {
            setCellLineSearch('');
        }
    };

    const filteredCompounds = CompoundNames.filter(compound =>
        compound.toLowerCase().includes(compoundSearch.toLowerCase())
    );

    const filteredCellLines = CellineNames.filter(cellLine =>
        cellLine.toLowerCase().includes(cellLineSearch.toLowerCase())
    );

    const handleFilterClick = () => {
        dispatch(updateSingleFilteration([selectedCompounds, selectedCellLines]));
    };

    const cardStyle = {
        width: 500,
        height: 400,
        cursor: 'move',
        position: 'absolute',
        top: '50px',
        left: '50px',
        zIndex: 9999,
        boxShadow: isDarkMode ? '0px 4px 8px rgba(135, 206, 235, 0.6)' : '0px 4px 8px rgba(135, 206, 235, 0.6)',
        backgroundColor: isDarkMode ? '#333' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderColor: isDarkMode ? '#444' : '#d9d9d9',
        overflowY: 'auto',
        scrollbarColor: isDarkMode ? '#555 #333' : '#ddd #fff', // Custom scrollbar colors
    };

    const inputStyle = {
        marginBottom: 10,
        backgroundColor: isDarkMode ? '#555' : '#fff',
        color: isDarkMode ? '#fff' : '#000',
        borderColor: isDarkMode ? '#777' : '#d9d9d9',
    };

    const buttonStyle = {
        marginTop: '10px',
    };

    const titleStyle = {
        color: isDarkMode ? '#fff' : '#000',
    };

    return (

        <ConfigProvider
        theme={{
          token: {
            colorPrimary: isDarkMode ? '#001529' : '#1890ff', // Change primary color based on theme
            colorTextBase: isDarkMode ? '#fff' : '#000', // Change text color based on theme
            colorBgBase: isDarkMode ? '#333' : '#f9f9f9', // Change background color based on theme
          },
        }}
      >
        <div>
            <a onClick={toggleVisibility} style={{ color: isDarkMode ? '#fff' : '#000' }}>
                Filter Compounds/Celline
            </a>
            {visible && (
                <Draggable>
                    <Card
                        title={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={titleStyle}>Filter Compounds/Celline</span>
                                <CloseOutlined onClick={handleClose} style={{ cursor: 'pointer', color: isDarkMode ? '#fff' : '#000' }} />
                            </div>
                        }
                        style={cardStyle}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Search compounds"
                                    style={inputStyle}
                                    value={compoundSearch}
                                    onChange={(e) => setCompoundSearch(e.target.value)}
                                />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <Checkbox.Group
                                        style={{ display: 'block' }}
                                        value={selectedCompounds}
                                        onChange={handleCompoundChange}
                                    >
                                        {filteredCompounds.length > 0 ? (
                                            filteredCompounds.map((compound) => (
                                                <Checkbox key={compound} value={compound} style={{ display: 'flex', color: isDarkMode ? '#fff' : '#000' }}>
                                                    {compound}
                                                </Checkbox>
                                            ))
                                        ) : (
                                            <Empty description="No match found" />
                                        )}
                                    </Checkbox.Group>
                                </div>
                            </div>

                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Search Cell lines"
                                    style={inputStyle}
                                    value={cellLineSearch}
                                    onChange={(e) => setCellLineSearch(e.target.value)}
                                />
                                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                                    <Checkbox.Group
                                        style={{ display: 'block' }}
                                        value={selectedCellLines}
                                        onChange={handleCellLineChange}
                                    >
                                        {filteredCellLines.length > 0 ? (
                                            filteredCellLines.map((cellLine) => (
                                                <Checkbox key={cellLine} value={cellLine} style={{ display: 'flex', color: isDarkMode ? '#fff' : '#000' }}>
                                                    {cellLine}
                                                </Checkbox>
                                            ))
                                        ) : (
                                            <Empty description="No match found" />
                                        )}
                                    </Checkbox.Group>
                                </div>
                            </div>
                        </div>

                        <Button onClick={handleFilterClick} type="primary" style={buttonStyle}>
                            Filter
                        </Button>
                    </Card>
                </Draggable>
            )}
        </div>
        </ConfigProvider>
    );
};

export default SingleFilteration;
