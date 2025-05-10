import React from 'react';
import {Popover} from 'react-tiny-popover';
import './NodePopover.css';

const NodePopover = ({
                         isPopoverOpen,
                         closePopover,
                         selectedNode,
                         handleInputChange,
                         nodePosition,
                     }) => {
    return (
        <Popover
            isOpen={isPopoverOpen}
            content={
                <div>
                    {selectedNode ? (
                        <div className="popover-form">
                            <h2>Edit Node</h2>

                            <div className="popover-field">
                                <label htmlFor="label">Label</label>
                                <input
                                    id="label"
                                    type="text"
                                    name="label"
                                    className="input-standard"
                                    value={selectedNode.id ?? ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="popover-field">
                                <label htmlFor="type">Type</label>
                                <input
                                    id="type"
                                    type="text"
                                    name="type"
                                    className="input-standard"
                                    value={selectedNode.data.type ?? ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="popover-field">
                                <label htmlFor="n_substates">Number of Substates</label>
                                <input
                                    id="n_substates"
                                    type="number"
                                    name="n_substates"
                                    className="input-standard"
                                    value={selectedNode.data.n_substates}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="popover-field">
                                <label htmlFor="rate">Outflow Rate (optional)</label>
                                <input
                                    id="rate"
                                    type="text"
                                    name="rate"
                                    className="input-standard"
                                    value={selectedNode.data.rate ?? ''}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="popover-field">
                                <label htmlFor="color">Color</label>
                                <input
                                    id="color"
                                    type="color"
                                    name="color"
                                    className="color-picker"
                                    defaultValue={selectedNode.data.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="popover-buttons">
                                <button className="save-button" onClick={() => {
                                    closePopover(true); // Pass `true` to trigger save
                                }}>
                                    Save
                                </button>
                                <button className="cancel-button" onClick={() => {
                                    closePopover(false); // Pass `false` to cancel
                                }}>
                                    Cancel
                                </button>
                            </div>
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

            <div
                style={{
                    position: 'absolute',
                    top: `${nodePosition.y - 20}px`,
                    left: `${nodePosition.x}px`,
                }}
            />
        </Popover>
    );
};

export default NodePopover;
