import React, { useState } from 'react';
import { Popover } from 'react-tiny-popover';
import './TransmissionCreator.css'; // Import any needed CSS

const TransmissionCreator = ({ isCreatorOpen, setIsCreatorOpen, creatorPosition,
                                 nodes, setNodes, setEdges }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');
    const [selectedActors, setSelectedActors] = useState([]);
    const [actorParameters, setActorParameters] = useState({});
    const [suscParams, setSuscParams] = useState([]);
    const [infParams, setInfParams] = useState([]);
    const [tmsRuleCounter, setTmsRuleCounter] = useState(0);

    // ------------------------------------------
    // Node Filtering
    // ------------------------------------------
    const susceptibleNodes = nodes.filter(node => node.data?.type === 'susceptible');
    const infectedNodes = nodes.filter(node => node.data?.type === 'infected');

    const closeCreator = () => {
        setIsCreatorOpen(false);
    };

    // ------------------------------------------
    // Transmission Logic (unchanged from your code)
    // ------------------------------------------
    const handleAddActor = (e) => {
        const actorId = e.target.value;
        if (actorId && !selectedActors.includes(actorId)) {
            setSelectedActors([...selectedActors, actorId]);
            setActorParameters({ ...actorParameters, [actorId]: '' });
        }
    };

    const handleParameterChange = (actorId, value) => {
        setActorParameters({ ...actorParameters, [actorId]: value });
    };

    const handleRemoveActor = (actorId) => {
        setSelectedActors(selectedActors.filter(id => id !== actorId));
        const { [actorId]: _, ...newActorParameters } = actorParameters;
        setActorParameters(newActorParameters);
    };

    const handleAddSuscParam = () => {
        setSuscParams(prev => [...prev, '']);
    };

    const handleSuscParamChange = (index, newValue) => {
        setSuscParams(prev => {
            const updated = [...prev];
            updated[index] = newValue;
            return updated;
        });
    };

    const handleRemoveSuscParam = (index) => {
        setSuscParams(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddInfParam = () => {
        setInfParams(prev => [...prev, '']);
    };

    const handleInfParamChange = (index, newValue) => {
        setInfParams(prev => {
            const updated = [...prev];
            updated[index] = newValue;
            return updated;
        });
    };

    const handleRemoveInfParam = (index) => {
        setInfParams(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddTransmissionRule = () => {
        // Basic validation
        const sourceNode = nodes.find(node => node.id === selectedSource);
        const targetNode = nodes.find(node => node.id === selectedTarget);
        if (!sourceNode || !targetNode) {
            alert("Please select valid source/target nodes!");
            return;
        }

        // In case position is missing
        const { x: sourceX = 0, y: sourceY = 0 } = sourceNode.position || {};
        const { x: targetX = 0, y: targetY = 0 } = targetNode.position || {};

        const x = (sourceX + targetX) / 2 - 10;
        const y = (sourceY + targetY) / 2 - 10;

        const infNode = {
            id: `tms_${tmsRuleCounter}`,
            type: 'infection',
            position: { x, y },
            data: {
                tmsRule: {
                    source: selectedSource,
                    target: selectedTarget,
                    "actors-params": Object.assign({},
                        ...selectedActors.map(actor => ({ [actor]: actorParameters[actor] }))
                    ),
                    susc_params: suscParams,
                    inf_params: infParams
                }
            }
        };

        setNodes(nds => nds.concat(infNode));

        // Edges from source -> transmission node, transmission node -> target
        const tmsEdges = [
            {
                id: `tms_${tmsRuleCounter}_source_${sourceNode.id}`,
                source: sourceNode.id,
                target: infNode.id,
                type: 'tmsTrans',
                label: suscParams.filter(Boolean).join(" * "),
                markerEnd: "arrow"
            },
            {
                id: `tms_${tmsRuleCounter}_target_${targetNode.id}`,
                source: infNode.id,
                target: targetNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            }
        ];

        // Edges from each actor -> infection node
        const infEdges = selectedActors.map((actor) => ({
            id: `tms_${tmsRuleCounter}_actor_${actor}`,
            source: actor,
            target: infNode.id,
            targetHandle: "infection",
            label: [...infParams, actorParameters[actor]].filter(Boolean).join(" * "),
            type: 'infection',
            markerEnd: "arrow"
        }));

        setEdges(edges => edges.concat(...infEdges, ...tmsEdges));
        setTmsRuleCounter(tmsRuleCounter + 1);

        // Optional: Reset form or close popover
        // resetForm();
        closeCreator();
    };

    // ------------------------------------------
    // RENDER
    // ------------------------------------------
    return (
        <div>
            {/* The popover containing the form */}
            <Popover
                isOpen={isCreatorOpen}
                onClickOutside={closeCreator}
                containerStyle={{ zIndex: 1000 }}
                content={(
                    <div className="popover-form" style={{ background: '#fff', border: '1px solid #ccc', padding: '1rem' }}>
                        <h2>Transmission Creator</h2>

                        {/* Source */}
                        <div>
                            <label>Source of Transmission:</label>
                            <select
                                className="transmission-select"
                                value={selectedSource}
                                onChange={(e) => setSelectedSource(e.target.value)}
                            >
                                <option value="">Select source</option>
                                {susceptibleNodes.map((node) => (
                                    <option key={node.id} value={node.id}>{node.id}</option>
                                ))}
                            </select>
                        </div>

                        {/* Target */}
                        <div>
                            <label>Target of Transmission:</label>
                            <select
                                className="transmission-select"
                                value={selectedTarget}
                                onChange={(e) => setSelectedTarget(e.target.value)}
                            >
                                <option value="">Select target</option>
                                {infectedNodes.map(node => (
                                    <option key={node.id} value={node.id}>{node.id}</option>
                                ))}
                            </select>
                        </div>

                        {/* Actors */}
                        <div>
                            <label>Actors:</label>
                            <select
                                className="transmission-select"
                                value=""
                                onChange={handleAddActor}
                            >
                                <option value="">Select actor</option>
                                {infectedNodes.map((node) => (
                                    <option key={node.id} value={node.id}>{node.id}</option>
                                ))}
                            </select>
                        </div>

                        {/* Render Actors */}
                        <div>
                            {selectedActors.map(actorId => (
                                <div key={actorId} className="actor-parameter">
                                    <span>{actorId}</span>
                                    <input
                                        className="parameter-input"
                                        type="text"
                                        placeholder="Parameter"
                                        value={actorParameters[actorId]}
                                        onChange={(e) => handleParameterChange(actorId, e.target.value)}
                                    />
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveActor(actorId)}}>Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Susc Params */}
                        <div>
                            <label>Susceptibility Parameters:</label>
                            <button onClick={handleAddSuscParam}>+ Add Param</button>
                            {suscParams.map((param, index) => (
                                <div key={index} className="actor-parameter">
                                    <span>Susc Param {index + 1}:</span>
                                    <input
                                        className="parameter-input"
                                        type="text"
                                        placeholder="Susceptibility Param"
                                        value={param}
                                        onChange={(e) => handleSuscParamChange(index, e.target.value)}
                                    />
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveSuscParam(index)}}>Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Inf Params */}
                        <div>
                            <label>Infectivity Parameters:</label>
                            <button onClick={handleAddInfParam}>+ Add Inf Param</button>
                            {infParams.map((param, index) => (
                                <div key={index} className="actor-parameter">
                                    <span>Inf Param {index + 1}:</span>
                                    <input
                                        className="parameter-input"
                                        type="text"
                                        placeholder="Infectivity Param"
                                        value={param}
                                        onChange={(e) => handleInfParamChange(index, e.target.value)}
                                    />
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveInfParam(index)}}>Remove</button>
                                </div>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <button onClick={handleAddTransmissionRule} style={{ marginRight: '1rem' }}>
                            Add Transmission Rule
                        </button>
                        <button onClick={closeCreator}>Close</button>
                    </div>
                )}
            >
                {/* Anchor div: Where popover will appear */}
                <div
                    style={{
                        position: 'absolute',
                        width: 0,
                        height: 0,
                        top: creatorPosition.y,
                        left: creatorPosition.x,
                    }}
                />
            </Popover>
        </div>
    );
};

export default TransmissionCreator;
