import React, { useState } from 'react';
import Draggable from 'react-draggable';
import { Card, Input, Checkbox, Button, Empty } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { useSelector ,useDispatch } from "react-redux";
import { updateSingleFilteration } from "./../app/features/data/dataSlice";
const SingleFilteration = () => {
const dispatch = useDispatch() ; 
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
console.log(selectedCompounds  , 'compoundSearch' , selectedCellLines)
    const filteredCompounds = CompoundNames.filter(compound =>
        compound.toLowerCase().includes(compoundSearch.toLowerCase())
    );

    const filteredCellLines = CellineNames.filter(cellLine =>
        cellLine.toLowerCase().includes(cellLineSearch.toLowerCase())
    );
    const handleFilterClick = () => {
        dispatch(updateSingleFilteration([selectedCompounds, selectedCellLines]));
    };


    return (
        <div>
            <a onClick={toggleVisibility}>Filter Compounds/Celline</a>
            {visible && (
                <Draggable>
                    <Card
                        title={
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span>Filter Compounds/Celline</span>
                                <CloseOutlined onClick={handleClose} style={{ cursor: 'pointer' }} />
                            </div>
                        }
                        style={{
                            width: 500,
                            height: 400,
                            cursor: 'move',
                            position: 'absolute',
                            top: '50px',
                            left: '50px',
                            zIndex: 9999,
                            boxShadow: '0px 4px 8px rgba(135, 206, 235, 0.6)' // Sky-blue shadow
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                            <div style={{ flex: 1 }}>
                                <Input
                                    placeholder="Search compounds"
                                    style={{ marginBottom: 10 }}
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
                                                <Checkbox key={compound} value={compound} style={{ display: 'flex' }}>
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
                                    style={{ marginBottom: 10 }}
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
                                                <Checkbox key={cellLine} value={cellLine} style={{ display: 'flex' }}>
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

                        <Button    onClick={handleFilterClick} type="primary" style={{ marginTop: '10px' }}>
                            Filter
                        </Button>
                    </Card>
                </Draggable>
            )}
        </div>
    );
};

export default SingleFilteration;
