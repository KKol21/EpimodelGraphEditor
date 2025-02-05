import React from 'react';
import {Popover} from 'react-tiny-popover';
import './TransmissionEditor.css';

const TransmissionEditor = ({
                                isTmsEditorOpen,
                                tmsEditorPosition,

                                // Source & Target
                                selectedTmsSource,
                                setSelectedTmsSource,
                                selectedTmsTarget,
                                setSelectedTmsTarget,

                                // Actors
                                selectedTmsActors,
                                handleAddTmsActor,
                                handleTmsParameterChange,
                                handleRemoveTmsActor,
                                tmsActorParameters,

                                // S & I Params
                                suscParams,
                                addSuscParam,
                                updateSuscParam,
                                removeSuscParam,

                                infParams,
                                addInfParam,
                                updateInfParam,
                                removeInfParam,

                                // Node Lists
                                susceptibleNodes,
                                infectedNodes,

                                // Popover Actions
                                closeTmsEditor,
                                saveTmsChanges
                            }) => {
    return (
        <Popover
            isOpen={isTmsEditorOpen}
            position="absolute"
            content={
                <div className="popover-form">
                    <h2>Edit Transmission Rule</h2>

                    {/* SOURCE */}
                    <label>
                        Source of Transmission:
                        <select
                            className="transmission-select"
                            value={selectedTmsSource}
                            onChange={(e) => setSelectedTmsSource(e.target.value)}
                        >
                            <option value="">Select source</option>
                            {susceptibleNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* TARGET */}
                    <label>
                        Target of Transmission:
                        <select
                            className="transmission-select"
                            value={selectedTmsTarget}
                            onChange={(e) => setSelectedTmsTarget(e.target.value)}
                        >
                            <option value="">Select target</option>
                            {infectedNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* ACTORS */}
                    <label>
                        Actors:
                        <select
                            className="transmission-select"
                            value=""
                            onChange={(e) => handleAddTmsActor(e.target.value)}
                        >
                            <option value="">Select actor</option>
                            {infectedNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* ACTOR PARAMETERS */}
                    <div>
                        {selectedTmsActors.map((actorId) => (
                            <div key={actorId} className="actor-parameter">
                                <span>{actorId}</span>
                                <input
                                    className="parameter-input"
                                    type="text"
                                    placeholder="Parameter"
                                    value={tmsActorParameters[actorId] || ""}
                                    onChange={(e) => handleTmsParameterChange(actorId, e.target.value)}
                                />
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveTmsActor(actorId);
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* SUSCEPTIBILITY PARAMS */}
                    <h3>Susceptibility Params:</h3>
                    <button onClick={addSuscParam}>+ Add Susc Param</button>
                    <div>
                        {suscParams.map((param, index) => (
                            <div key={index} className="actor-parameter">
                                <span>Susc {index + 1}:</span>
                                <input
                                    className="parameter-input"
                                    type="text"
                                    placeholder="Susceptibility Param"
                                    value={param}
                                    onChange={(e) => {
                                        updateSuscParam(index, e.target.value);
                                    }
                                    }
                                />
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    removeSuscParam(index)
                                }}>Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* INFECTIVITY PARAMS */}
                    <h3>Infectivity Params:</h3>
                    <button onClick={addInfParam}>+ Add Inf Param</button>
                    <div>
                        {infParams.map((param, index) => (
                            <div key={index} className="actor-parameter">
                                <span>Inf {index + 1}:</span>
                                <input
                                    className="parameter-input"
                                    type="text"
                                    placeholder="Infectivity Param"
                                    value={param}
                                    onChange={(e) => {
                                        updateInfParam(index, e.target.value)
                                    }}
                                />
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    removeInfParam(index)
                                }}>Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* SAVE & CLOSE */}
                    <div className="popover-buttons">
                        <button onClick={saveTmsChanges}>Save</button>
                        <button onClick={closeTmsEditor}>Close</button>
                    </div>
                </div>
            }
            onClickOutside={closeTmsEditor}
            containerStyle={{
                zIndex: 1000,
            }}
        >
            {/* The anchor for positioning the popover */}
            <div
                style={{
                    position: 'absolute',
                    top: `${tmsEditorPosition.y}px`,
                    left: `${tmsEditorPosition.x}px`
                }}
            />
        </Popover>
    );
};

export default TransmissionEditor;
