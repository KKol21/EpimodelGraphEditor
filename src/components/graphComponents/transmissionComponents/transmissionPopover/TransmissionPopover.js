import React from 'react';
import { Popover } from 'react-tiny-popover';
import './TransmissionPopover.css';

const TransmissionPopover = ({
                                 isTmsPopoverOpen,
                                 tmsPopoverPosition,
                                 selectedTmsSource,
                                 setSelectedTmsSource,
                                 selectedTmsTarget,
                                 setSelectedTmsTarget,
                                 selectedTmsActors,
                                 handleAddTmsActor,
                                 handleTmsParameterChange,
                                 handleRemoveTmsActor,
                                 tmsActorParameters,
                                 susceptibleNodes,
                                 infectedNodes,
                                 closeTmsPopover,
                                 saveTmsChanges,
                             }) => {
    return (
        <Popover
            isOpen={isTmsPopoverOpen}
            position="absolute"
            content={
                <div className="popover-form">
                    <h2>Edit Transmission Rule</h2>

                    <label>
                        Source of Transmission:
                        <select
                            className="transmission-select"
                            value={selectedTmsSource}
                            onChange={(e) => setSelectedTmsSource(e.target.value)}
                        >
                            <option value="">Select source</option>
                            {susceptibleNodes.map(node => (
                                <option key={node.id} value={node.id}>{node.id}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Target of Transmission:
                        <select
                            className="transmission-select"
                            value={selectedTmsTarget}
                            onChange={(e) => setSelectedTmsTarget(e.target.value)}
                        >
                            <option value="">Select target</option>
                            {infectedNodes.map(node => (
                                <option key={node.id} value={node.id}>{node.id}</option>
                            ))}
                        </select>
                    </label>

                    <label>
                        Actors:
                        <select
                            className="transmission-select"
                            value=""
                            onChange={(e) => handleAddTmsActor(e.target.value)}
                        >
                            <option value="">Select actor</option>
                            {infectedNodes.map(node => (
                                <option key={node.id} value={node.id}>{node.id}</option>
                            ))}
                        </select>
                    </label>

                    <div>
                        {selectedTmsActors.map(actorId => (
                            <div key={actorId} className="actor-parameter">
                                <span>{actorId}</span>
                                <input
                                    className="parameter-input"
                                    type="text"
                                    placeholder="Parameter"
                                    value={tmsActorParameters[actorId]}
                                    onChange={(e) => handleTmsParameterChange(actorId, e.target.value)}
                                />
                                <button onClick={() => handleRemoveTmsActor(actorId)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="popover-buttons">
                        <button onClick={saveTmsChanges}>Save</button>
                        <button onClick={closeTmsPopover}>Close</button>
                    </div>
                </div>
            }
            onClickOutside={closeTmsPopover}
            containerStyle={{
                zIndex: 1000,
            }}
        >
            <div style={{ position: 'absolute', top: `${tmsPopoverPosition.y}px`, left: `${tmsPopoverPosition.x}px` }} />
        </Popover>
    );
};

export default TransmissionPopover;
