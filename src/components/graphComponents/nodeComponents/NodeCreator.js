import React from 'react';
import {button, Leva, useControls} from 'leva';

const NodeCreator = ({nodes, setNodes}) => {
        const [{newNodeLabel, newNodeType, newNodeSubstates, newNodeColor}, set] = useControls(() => ({
                    newNodeLabel: {value: '', label: 'Node label'},
                    newNodeType: {value: '', label: 'Node type'},
                    newNodeSubstates: {value: 1, min: 1, label: 'Number of substates'},
                    "Node color": '#00ff00',
                    "Add Node": button((get) => {
                            const newNodeLabel = get("newNodeLabel");
                            if (newNodeLabel && !nodes.some(node => node.id === newNodeLabel)) {
                                const newNode = {
                                    id: newNodeLabel,
                                    type: 'state',
                                    data: {
                                        label: newNodeLabel,
                                        type: get('newNodeType'),
                                        n_substates: get('newNodeSubstates'),
                                        color: get('Node color'),
                                    },
                                    position: {x: 100 + 500 * Math.random(), y: 100 + 500 * Math.random()},
                                };
                                setNodes((nds) => nds.concat(newNode));
                                set({
                                    newNodeLabel: '',
                                    newNodeType: '',
                                    newNodeSubstates: 1,
                                    "Node color": '#00ff00',
                                });
                            } else {
                                alert('Node label is required and must be unique.');
                            }
                        }
                    )
                }
            )
        );

        return (
            <Leva oneLineLabels={true}/>
        );
    }
;

export default NodeCreator;
