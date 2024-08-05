// General imports
import React from 'react';
import {ReactFlow, useNodesState, useEdgesState} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node related
import NodeCreator from './nodeComponents/nodeCreator/NodeCreator';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import useNodePopover from './nodeComponents/nodePopover/useNodePopover';
import StateNode from "./nodeComponents/nodeTypes/StateNode";
import InfectionNode from "./nodeComponents/nodeTypes/InfectionNode";

// Edge related
import TransitionEdge from './edgeComponents/TransitionEdge';
import useEdgeConnection from '../../hooks/useEdgeConnection';

// Transmission
import TransmissionManager from "./TransmissionManager/TransmissionManager";

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import OutputForm from '../OutputForm';
import useEdgePopover from "./edgeComponents/edgePopover/useEdgePopover";
import EdgePopover from "./edgeComponents/edgePopover/EdgePopover";


const edgeTypes = {
    transition: TransitionEdge,
};

const nodeTypes = {
    state: StateNode,
    infection: InfectionNode
}


const GraphEditor = ({initialNodes, initialEdges}) => {
        const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
        const onConnect = useEdgeConnection(setEdges);

        const {
            isNodePopoverOpen,
            selectedNode,
            onNodeDoubleClick,
            closeNodePopover,
            handleNodeInputChange,
            nodePosition
        } = useNodePopover(setNodes);

        const {
            isEdgePopoverOpen,
            selectedEdge,
            onEdgeDoubleClick,
            closeEdgePopover,
            handleEdgeInputChange,
            edgePosition,
            addParam,
            deleteParam
        } = useEdgePopover(setEdges);

        return (
            <div>
                <MarkerDefinition/>
                <NodeCreator
                    nodes={nodes}
                    setNodes={setNodes}
                />
                <TransmissionManager
                    nodes={nodes}
                    setNodes={setNodes}
                    setEdges={setEdges}
                />
                <NodePopover
                    isPopoverOpen={isNodePopoverOpen}
                    closePopover={closeNodePopover}
                    selectedNode={selectedNode}
                    handleInputChange={handleNodeInputChange}
                    nodePosition={nodePosition}
                />
                <EdgePopover
                    isEdgePopoverOpen={isEdgePopoverOpen}
                    closeEdgePopover={closeEdgePopover}
                    selectedEdge={selectedEdge}
                    handleEdgeInputChange={handleEdgeInputChange}
                    edgePosition={edgePosition}
                    addParam={addParam}
                    deleteParam={deleteParam}
                />
                <div style={{height: '600px'}}>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onEdgeDoubleClick={onEdgeDoubleClick}
                        deleteKeyCode={["Backspace","Delete"]}
                        edgeTypes={edgeTypes}
                        nodeTypes={nodeTypes}
                    >
                    </ReactFlow>
                </div>
                <OutputForm nodes={nodes} edges={edges}/>
            </div>
        );
    }
;

export default GraphEditor;
