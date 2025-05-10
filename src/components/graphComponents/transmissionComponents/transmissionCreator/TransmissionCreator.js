import React, {useState} from 'react';
import {Popover} from 'react-tiny-popover';
import './TransmissionCreator.css';

const TransmissionCreator = ({
                                 isCreatorOpen,
                                 setIsCreatorOpen,
                                 creatorPosition,
                                 nodes,
                                 setNodes,
                                 setEdges,
                             }) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');
    const [selectedActors, setSelectedActors] = useState([]);
    const [actorParameters, setActorParameters] = useState({});
    const [suscParams, setSuscParams] = useState([]);
    const [infParams, setInfParams] = useState([]);
    const [tmsRuleCounter, setTmsRuleCounter] = useState(0);

    const susceptibleNodes = nodes.filter((node) => node.data?.type === 'susceptible');
    const infectedNodes = nodes.filter((node) => node.data?.type === 'infected');

    const closeCreator = () => setIsCreatorOpen(false);

    const handleAddActor = (e) => {
        const actorId = e.target.value;
        if (actorId && !selectedActors.includes(actorId)) {
            setSelectedActors([...selectedActors, actorId]);
            setActorParameters({...actorParameters, [actorId]: ''});
        }
    };

    const handleParameterChange = (actorId, value) => {
        setActorParameters({...actorParameters, [actorId]: value});
    };

    const handleRemoveActor = (actorId) => {
        setSelectedActors((prev) => prev.filter((id) => id !== actorId));
        const {[actorId]: _, ...rest} = actorParameters;
        setActorParameters(rest);
    };

    const handleAddSuscParam = () => setSuscParams((prev) => [...prev, '']);
    const handleSuscParamChange = (i, v) => setSuscParams((p) => Object.assign([...p], {[i]: v}));
    const handleRemoveSuscParam = (i) => setSuscParams((p) => p.filter((_, idx) => idx !== i));

    const handleAddInfParam = () => setInfParams((prev) => [...prev, '']);
    const handleInfParamChange = (i, v) => setInfParams((p) => Object.assign([...p], {[i]: v}));
    const handleRemoveInfParam = (i) => setInfParams((p) => p.filter((_, idx) => idx !== i));

    const handleAddTransmissionRule = () => {
        const sourceNode = nodes.find((n) => n.id === selectedSource);
        const targetNode = nodes.find((n) => n.id === selectedTarget);
        if (!sourceNode || !targetNode) return alert('Please select valid source and target.');

        const {x: x1 = 0, y: y1 = 0} = sourceNode.position || {};
        const {x: x2 = 0, y: y2 = 0} = targetNode.position || {};
        const x = (x1 + x2) / 2 - 10;
        const y = (y1 + y2) / 2 - 10;

        const infNode = {
            id: `tms_${tmsRuleCounter}`,
            type: 'infection',
            position: {x, y},
            data: {
                tmsRule: {
                    source: selectedSource,
                    target: selectedTarget,
                    'actors-params': Object.fromEntries(
                        selectedActors.map((actor) => [actor, actorParameters[actor]])
                    ),
                    susc_params: suscParams,
                    inf_params: infParams,
                },
            },
        };

        const tmsEdges = [
            {
                id: `tms_${tmsRuleCounter}_source_${sourceNode.id}`,
                source: sourceNode.id,
                target: infNode.id,
                type: 'tmsTrans',
                label: suscParams.filter(Boolean).join(' * '),
                markerEnd: 'arrow',
            },
            {
                id: `tms_${tmsRuleCounter}_target_${targetNode.id}`,
                source: infNode.id,
                target: targetNode.id,
                type: 'tmsTrans',
                markerEnd: 'arrow',
            },
        ];

        const infEdges = selectedActors.map((actor) => ({
            id: `tms_${tmsRuleCounter}_actor_${actor}`,
            source: actor,
            target: infNode.id,
            targetHandle: 'infection',
            label: [...infParams, actorParameters[actor]].filter(Boolean).join(' * '),
            type: 'infection',
            markerEnd: 'arrow',
        }));

        setNodes((prev) => [...prev, infNode]);
        setEdges((prev) => [...prev, ...tmsEdges, ...infEdges]);
        setTmsRuleCounter((n) => n + 1);
        closeCreator();
    };

    return (
        <Popover
            isOpen={isCreatorOpen}
            onClickOutside={closeCreator}
            containerStyle={{zIndex: 1000, width: 400}}
            content={
                <div className="popover-form">
                    <h2>Transmission Creator</h2>

                    <div className="node-field">
                        <label>Source of Transmission</label>
                        <select
                            className="transmission-select"
                            value={selectedSource}
                            onChange={(e) => setSelectedSource(e.target.value)}
                        >
                            <option value="">Select source</option>
                            {susceptibleNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="node-field">
                        <label>Target of Transmission</label>
                        <select
                            className="transmission-select"
                            value={selectedTarget}
                            onChange={(e) => setSelectedTarget(e.target.value)}
                        >
                            <option value="">Select target</option>
                            {infectedNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="node-field">
                        <label>Actors</label>
                        <select className="transmission-select" value="" onChange={handleAddActor}>
                            <option value="">Select actor</option>
                            {infectedNodes.map((node) => (
                                <option key={node.id} value={node.id}>
                                    {node.id}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedActors.map((actorId) => (
                        <div key={actorId} className="actor-parameter">
                            <span>{actorId}</span>
                            <input
                                className="parameter-input"
                                type="text"
                                placeholder="Parameter"
                                value={actorParameters[actorId]}
                                onChange={(e) => handleParameterChange(actorId, e.target.value)}
                            />
                            <button onClick={() => handleRemoveActor(actorId)}>Remove</button>
                        </div>
                    ))}

                    <div className="node-field">
                        <label>Susceptibility Parameters</label>
                        <button className="add-param" onClick={handleAddSuscParam}>+ Add Param</button>
                    </div>

                    {suscParams.map((param, i) => (
                        <div key={i} className="actor-parameter">
                            <span>Susc Param {i + 1}:</span>
                            <input
                                className="parameter-input"
                                type="text"
                                value={param}
                                onChange={(e) => handleSuscParamChange(i, e.target.value)}
                            />
                            <button onClick={() => handleRemoveSuscParam(i)}>Remove</button>
                        </div>
                    ))}

                    <div className="node-field">
                        <label>Infectivity Parameters</label>
                        <button className="add-param" onClick={handleAddInfParam}>+ Add Inf Param</button>
                    </div>

                    {infParams.map((param, i) => (
                        <div key={i} className="actor-parameter">
                            <span>Inf Param {i + 1}:</span>
                            <input
                                className="parameter-input"
                                type="text"
                                value={param}
                                onChange={(e) => handleInfParamChange(i, e.target.value)}
                            />
                            <button onClick={() => handleRemoveInfParam(i)}>Remove</button>
                        </div>
                    ))}

                    <div className="popover-buttons">
                        <button className="save-button" onClick={handleAddTransmissionRule}>
                            Add Rule
                        </button>
                        <button className="cancel-button" onClick={closeCreator}>
                            Cancel
                        </button>
                    </div>
                </div>
            }
        >
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
    );
};

export default TransmissionCreator;
