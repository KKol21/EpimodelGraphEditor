import React from 'react';
import {Popover} from 'react-tiny-popover';
import './NodePopover.css';

const NodePopover = ({
                         isPopoverOpen,
                         closePopover,
                         selectedNode,
                         handleInputChange,
                         position
                     }) => {
    return (
        <Popover
            isOpen={isPopoverOpen}
            content={
                <div>
                    {selectedNode ? (
                        <div className="popover-form">
                            <h2>Edit Node Data</h2>
                            <label>
                                Label:
                                <input
                                    type="text"
                                    name="label"
                                    value={selectedNode.data.label}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Type:
                                <input
                                    type="text"
                                    name="type"
                                    value={selectedNode.data.type}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label>
                                Number of Substates:
                                <input
                                    type="number"
                                    name="n_substates"
                                    value={selectedNode.data.n_substates}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <input
                                className="nodrag"
                                type="color"
                                name="color"
                                defaultValue={selectedNode.data.color}
                                onChange={handleInputChange}
                            />
                        </div>
                    ) : (
                        <div>No node selected</div>
                    )}
                </div>
            }
            onClickOutside={closePopover}
            containerStyle={{
                zIndex: 1000,
            }}
        >
            <div style={{position: 'absolute', top: `${position.y - 20}px`, left: `${position.x}px`}}/>
        </Popover>
    );
};

export default NodePopover;
