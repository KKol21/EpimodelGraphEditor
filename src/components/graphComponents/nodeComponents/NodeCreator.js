import React, { useState } from 'react';
import './nodePopover/useNodePopover.css';

const NodeCreator = ({setNodes, nodeCounter, setNodeCounter }) => {
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeSubstates, setNewNodeSubstates] = useState(0);
    const [newNodeColor, setNewNodeColor] = useState('#00ff00');

    const addNode = () => {
        const newNode = {
            id: `n${nodeCounter}`,
            type: 'state',
            data: {
                label: newNodeLabel || `Node ${nodeCounter}`,
                type: newNodeType || ' ',
                n_substates: newNodeSubstates || 1,
                color: newNodeColor,
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
        <div className="node-handler" style={{color: newNodeColor}}>
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
            <input
                className="nodrag"
                type="color"
                defaultValue={newNodeColor}
                onChange={(e) => setNewNodeColor(e.target.value)}
            />
            <button className="add-node-button" onClick={addNode}>Add Node</button>
        </div>
    );
};

export default NodeCreator;
