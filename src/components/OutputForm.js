import React from 'react';

const OutputForm = ({ nodes, edges }) => {
    const generateOutput = () => {
        const state_data = {};
        const trans_data = [];
        const tms_rules = [];

        nodes.forEach(node => {
            state_data[node.id] = { type: node.data.type};
        });

        edges.forEach(edge => {
            trans_data.push({
                source: edge.source,
                target: edge.target,
                param: 'gamma',  // Replace with actual logic to get the parameter
            });
        });

        tms_rules.push({
            source: 's',
            target: 'e',
            'actors-params': {
                'i': null,
            }
        });

        const output = { state_data, trans_data, tms_rules };
        console.log(output);
    };

    return (
        <div>
            <button onClick={generateOutput}>Generate Output</button>
        </div>
    );
};

export default OutputForm;