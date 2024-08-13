import React, { useState, useRef } from 'react';
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node types
import StateNode from "./nodeComponents/nodeTypes/StateNode";
import InfectionNode from "./nodeComponents/nodeTypes/InfectionNode";

// DAO
import NodeCreator from './nodeComponents/nodeCreator/NodeCreator';
import useEdgeConnection from '../../hooks/useEdgeConnection';
import TransmissionCreator from "./transmissionComponents/transmissionCreator/TransmissionCreator";
import { Popovers } from "./Popovers";

// Edge types
import TransitionEdge from './edgeComponents/TransitionEdge';
import InfectionEdge from "./edgeComponents/InfectionEdge";
import TmsTransitionEdge from "./edgeComponents/TmsTransitionEdge";

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import OutputForm from '../OutputForm';
import SaveFlowButton from "../SaveFlowButton";

const nodeTypes = {
    state: StateNode,
    infection: InfectionNode
}

const edgeTypes = {
    transition: TransitionEdge,
    infection: InfectionEdge,
    tmsTrans: TmsTransitionEdge
};

const GraphEditor = ({ initialNodes, initialEdges }) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const popoversRef = useRef();

    const onConnect = useEdgeConnection(setEdges);

    const onNodeDoubleClick = (event, node) => {
        popoversRef.current.onNodeDoubleClick(event, node);
    };

    const onEdgeDoubleClick = (event, edge) => {
        popoversRef.current.onEdgeDoubleClick(event, edge);
    };

    return (
        <div>
            <MarkerDefinition />
            <NodeCreator
                nodes={nodes}
                setNodes={setNodes}
            />
            <TransmissionCreator
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
            />
            <Popovers
                ref={popoversRef}
                nodes={nodes}
                setNodes={setNodes}
                edges={edges}
                setEdges={setEdges}
            />
            <div style={{ height: '600px' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeDoubleClick={onNodeDoubleClick}
                    onEdgeDoubleClick={onEdgeDoubleClick}
                    deleteKeyCode={["Backspace", "Delete"]}
                    edgeTypes={edgeTypes}
                    nodeTypes={nodeTypes}
                />
            </div>
            <SaveFlowButton nodes={nodes} edges={edges} />
            <OutputForm nodes={nodes} edges={edges} />
        </div>
    );
};

export default GraphEditor;
