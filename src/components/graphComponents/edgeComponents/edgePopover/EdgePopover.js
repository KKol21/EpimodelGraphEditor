import React from 'react';
import { Popover } from 'react-tiny-popover';
import './EdgePopover.css';

const EdgePopover = ({
                         isEdgePopoverOpen,
                         closeEdgePopover,
                         selectedEdge,
                         handleEdgeInputChange,
                         edgePosition,
                         addParam,
                         deleteParam
                     }) => {
    const params = selectedEdge ? selectedEdge.data.params : [];
    const handleAddParam = () => {
        const newParam = ''; // Default new param
        addParam(newParam);
    };

    return (
        <Popover
            isOpen={isEdgePopoverOpen}
            content={
                <div>
                    {selectedEdge ? (
                        <div className="popover-form">
                            <h2>Edit Edge Data</h2>
                            {params.map((param, index) => (
                                <div key={index} className="param-row">
                                    <input
                                        type="text"
                                        value={param}
                                        placeholder="Parameter Name"
                                        onChange={(e) => handleEdgeInputChange(index, e)}
                                    />
                                    <button onClick={() => deleteParam(index)}>Delete</button>
                                </div>
                            ))}
                            <button onClick={handleAddParam}>Add Parameter</button>
                        </div>
                    ) : (
                        <div>No edge selected</div>
                    )}
                </div>
            }
            onClickOutside={closeEdgePopover}
            containerStyle={{
                zIndex: 1000,
            }}
        >
            <div style={{ position: 'absolute', top: `${edgePosition.y - 20}px`, left: `${edgePosition.x}px` }} />
        </Popover>
    );
};

export default EdgePopover;
