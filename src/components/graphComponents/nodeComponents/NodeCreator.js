import React, { useState } from 'react';
import './nodePopover/useNodePopover.css';

const NodeCreator = ({setNodes, nodeCounter, setNodeCounter }) => {
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeSubstates, setNewNodeSubstates] = useState(0);

    const addNode = () => {
        const newNode = {
            id: `n${nodeCounter}`,
            type: 'default',
            data: {
                label: newNodeLabel || `Node ${nodeCounter}`,
                type: newNodeType || ' ',
                n_substates: newNodeSubstates || 1,
            },
            position: { x: 100 + 500 * Math.random(), y: 100 + 500 * Math.random()},
        };
        setNodes((nds) => nds.concat(newNode));
        setNodeCounter(nodeCounter + 1);
        setNewNodeLabel('');
        setNewNodeType('');
        setNewNodeSubstates(1);
    };

    return (
        <div className="node-handler">
            <input
                type="text"
                className="node-input"
                placeholder="Node label"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
            />
            <input
                type="text"
                className="node-input"
                placeholder="Node type"
                value={newNodeType}
                onChange={(e) => setNewNodeType(e.target.value)}
            />
            <input
                type="number"
                className="node-input"
                placeholder="Number of substates"
                value={newNodeSubstates}
                onChange={(e) => setNewNodeSubstates(Number(e.target.value))}
            />
            <button className="add-node-button" onClick={addNode}>Add Node</button>
        </div>
    );
};

export default NodeCreator;
