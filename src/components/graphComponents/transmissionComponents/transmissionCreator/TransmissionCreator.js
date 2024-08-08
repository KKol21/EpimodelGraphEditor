import React, {useState} from 'react';
import './TransmissionCreator.css'; // Import the CSS file

const TransmissionCreator = ({nodes, setNodes, setEdges}) => {
    const [selectedSource, setSelectedSource] = useState('');
    const [selectedTarget, setSelectedTarget] = useState('');
    const [selectedActors, setSelectedActors] = useState([]);
    const [actorParameters, setActorParameters] = useState({});
    const [tmsRuleCounter, setTmsRuleCounter] = useState(0);

    const susceptibleNodes = nodes.filter(node => node.data && node.data.type === 'susceptible');
    const infectedNodes = nodes.filter(node => node.data && node.data.type === 'infected');

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
        setSelectedActors(selectedActors.filter(id => id !== actorId));
        const {[actorId]: _, ...newActorParameters} = actorParameters;
        setActorParameters(newActorParameters);
    };

    const handleAddTransmissionRule = () => {
        const sourceNode = nodes.find(node => node.id === selectedSource);
        const targetNode = nodes.find(node => node.id === selectedTarget);

        const x = (sourceNode.position.x + targetNode.position.x) / 2 - 10;
        const y = (sourceNode.position.y + targetNode.position.y) / 2 - 10;
        const infNode = {
            id: `tms_${tmsRuleCounter}`,
            type: 'infection',
            position: {x: x, y: y},
            data: {
                tmsRule: {
                    source: selectedSource,
                    target: selectedTarget,
                    actors: selectedActors,
                    params: Object.assign({},
                        ...selectedActors.map(actor => ({[actor]: actorParameters[actor]}))),
                }
            }
        };

        setNodes((nds) => nds.concat(infNode));

        const tmsEdges = [
            {
                id: `tms-${tmsRuleCounter}_source-${sourceNode.id}-`,
                source: sourceNode.id,
                target: infNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            },
            {
                id: `tms-${tmsRuleCounter}_target-${targetNode.id}`,
                source: infNode.id,
                target: targetNode.id,
                type: 'tmsTrans',
                markerEnd: "arrow"
            }
        ];
        const infEdges = selectedActors.map(actor => ({
            id: `tms-${tmsRuleCounter}_actor-${actor}`,
            source: actor,
            target: infNode.id,
            targetHandle: "infection",
            label: actorParameters[actor] || "",
            type: 'infection',
            markerEnd: "arrow"
        }));

        setEdges((edges) => edges.concat(...infEdges, ...tmsEdges));
        setTmsRuleCounter(tmsRuleCounter + 1);
    }


    return (
        <div className="transmission-manager">
            <div>
                <label>Source of Transmission:</label>
                <select
                    className="transmission-select"
                    value={selectedSource}
                    onChange={(e) => setSelectedSource(e.target.value)}
                >
                    <option value="">Select source</option>
                    {susceptibleNodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                    ))}
                </select>
            </div>

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

            <div>
                <label>Actors:</label>
                <select
                    className="transmission-select"
                    value=""
                    onChange={handleAddActor}
                >
                    <option value="">Select actor</option>
                    {infectedNodes.map(node => (
                        <option key={node.id} value={node.id}>{node.id}</option>
                    ))}
                </select>
            </div>

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
                        <button onClick={() => handleRemoveActor(actorId)}>Remove</button>
                    </div>
                ))}
            </div>
            <button onClick={handleAddTransmissionRule}> Add transmission rule</button>
        </div>
    );
};

export default TransmissionCreator;
