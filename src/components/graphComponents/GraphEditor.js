// General imports
import React, {useState} from 'react';
import {ReactFlow, useNodesState, useEdgesState} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node related
import NodeCreator from './nodeComponents/NodeCreator';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import useNodePopover from './nodeComponents/nodePopover/useNodePopover';
import StateNode from "./nodeComponents/nodeTypes/StateNode";

// Edge related
import TransitionEdge from './edgeComponents/TransitionEdge';
import useEdgeConnection from './hooks/useEdgeConnection';

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import OutputForm from '../OutputForm';


const edgeTypes = {
    transition: TransitionEdge,
};

const nodeTypes = {
    state: StateNode,
}


const GraphEditor = ({initialNodes, initialEdges}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCounter, setNodeCounter] = useState(initialNodes.length);

    const onConnect = useEdgeConnection(setEdges);

    const {
        isPopoverOpen,
        selectedNode,
        onNodeClick,
        closePopover,
        handleInputChange,
        nodeRef,
        position
    } = useNodePopover(setNodes);

    return (
        <div>
            <MarkerDefinition/>
            <NodeCreator
                setNodes={setNodes}
                nodeCounter={nodeCounter}
                setNodeCounter={setNodeCounter}
            />
            <NodePopover
                isPopoverOpen={isPopoverOpen}
                nodeRef={nodeRef}
                closePopover={closePopover}
                selectedNode={selectedNode}
                handleInputChange={handleInputChange}
                position={position}
            />
            <div style={{height: '600px'}}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={onNodeClick}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                />
            </div>
            <OutputForm nodes={nodes} edges={edges}/>
        </div>
    );
};

export default GraphEditor;
