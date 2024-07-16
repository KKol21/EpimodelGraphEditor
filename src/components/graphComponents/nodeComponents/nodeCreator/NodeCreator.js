import React, { useState } from 'react';
import './NodeCreator.css';

const NodeCreator = ({nodes, setNodes }) => {
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeSubstates, setNewNodeSubstates] = useState(1);
    const [newNodeColor, setNewNodeColor] = useState('#00ff00');

    const addNode = () => {
        if (newNodeLabel && !nodes.some(node => node.id === newNodeLabel)) {
            const newNode = {
                id: newNodeLabel,
                type: 'state',
                data: {
                    label: newNodeLabel,
                    type: newNodeType || ' ',
                    n_substates: newNodeSubstates,
                    color: newNodeColor,
                },
                position: { x: 100 + 500 * Math.random(), y: 100 + 500 * Math.random()},
            };
            setNodes((nds) => nds.concat(newNode));
            setNewNodeLabel('');
            setNewNodeType('');
            setNewNodeSubstates(1);
        }
        else {
            alert('Node label is required and must be unique.');
        }
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
