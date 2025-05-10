import React, { useState } from 'react';
import "./NodeCreator.css";

const NodeCreator = ({ nodes, setNodes }) => {
    const [newNodeLabel, setNewNodeLabel] = useState('');
    const [newNodeType, setNewNodeType] = useState('');
    const [newNodeSubstates, setNewNodeSubstates] = useState(1);
    const [newNodeColor, setNewNodeColor] = useState('#00ff00');
    const [newNodeRate, setNewNodeRate] = useState(''); // Outflow rate (optional)

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
                    rate: newNodeRate, // Include the outflow rate (optional)
                },
                position: {
                    x: 100 + 500 * Math.random(),
                    y: 100 + 500 * Math.random()
                },
            };
            setNodes(nds => nds.concat(newNode));
            setNewNodeLabel('');
            setNewNodeType('');
            setNewNodeSubstates(1);
            setNewNodeRate('');
        } else {
            alert('Node label is required and must be unique.');
        }
    };

    return (
        <div className="node-handler">
            <div className="node-field">
                <label>Node label</label>
                <input
                    type="text"
                    className="input-standard"
                    placeholder="e.g. S"
                    value={newNodeLabel}
                    onChange={(e) => setNewNodeLabel(e.target.value)}
                />
            </div>

            <div className="node-field">
                <label>Node type</label>
                <input
                    type="text"
                    className="input-standard"
                    placeholder="e.g. susceptible"
                    value={newNodeType}
                    onChange={(e) => setNewNodeType(e.target.value)}
                />
            </div>

            <div className="node-field">
                <label>Number of substates</label>
                <input
                    type="number"
                    className="input-standard"
                    value={newNodeSubstates}
                    onChange={(e) => setNewNodeSubstates(Number(e.target.value))}
                />
            </div>

            <div className="node-field">
                <label>Outflow rate (optional)</label>
                <input
                    type="text"
                    className="input-standard"
                    value={newNodeRate}
                    onChange={(e) => setNewNodeRate(e.target.value)}
                />
            </div>

            <div className="node-field">
                <label>Node color</label>
                <input
                    className="color-picker"
                    type="color"
                    value={newNodeColor}
                    onChange={(e) => setNewNodeColor(e.target.value)}
                />
            </div>

            <button className="add-node-button" onClick={addNode}>
                Add Node
            </button>
        </div>
    );
};

export default NodeCreator;
