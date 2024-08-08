// General imports
import React from 'react';
import {ReactFlow, useNodesState, useEdgesState} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node types
import StateNode from "./nodeComponents/nodeTypes/StateNode";
import InfectionNode from "./nodeComponents/nodeTypes/InfectionNode";

// Node DAO
import NodeCreator from './nodeComponents/nodeCreator/NodeCreator';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import useNodePopover from './nodeComponents/nodePopover/useNodePopover';

// Edge types
import TransitionEdge from './edgeComponents/TransitionEdge';
import InfectionEdge from "./edgeComponents/InfectionEdge";
import TmsTransitionEdge from "./edgeComponents/TmsTransitionEdge";

// Edge DAO
import useEdgeConnection from '../../hooks/useEdgeConnection';
import useEdgePopover from "./edgeComponents/edgePopover/useEdgePopover";
import EdgePopover from "./edgeComponents/edgePopover/EdgePopover";


// Transmission DAO
import TransmissionCreator from "./transmissionComponents/transmissionCreator/TransmissionCreator";
import useTransmissionPopover from "./transmissionComponents/transmissionPopover/useTransmissionPopover";
import TransmissionPopover from "./transmissionComponents/transmissionPopover/TransmissionPopover";

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import OutputForm from '../OutputForm';


const nodeTypes = {
    state: StateNode,
    infection: InfectionNode
}

const edgeTypes = {
    transition: TransitionEdge,
    infection: InfectionEdge,
    tmsTrans: TmsTransitionEdge
};


const GraphEditor = ({initialNodes, initialEdges}) => {
        const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
        const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
        const onConnect = useEdgeConnection(setEdges);

        const {
            isNodePopoverOpen,
            setIsNodePopoverOpen,
            selectedNode,
            setSelectedNode,
            setNodePosition,
            closeNodePopover,
            handleNodeInputChange,
            nodePosition
        } = useNodePopover(setNodes);

        const susceptibleNodes = nodes.filter(node => node.data && node.data.type === 'susceptible');
        const infectedNodes = nodes.filter(node => node.data && node.data.type === 'infected');

        const {
            isTmsPopoverOpen,
            tmsPopoverPosition,
            selectedTmsSource,
            setSelectedTmsSource,
            selectedTmsTarget,
            setSelectedTmsTarget,
            selectedTmsActors,
            handleAddTmsActor,
            handleTmsParameterChange,
            handleRemoveTmsActor,
            tmsActorParameters,
            openTmsPopover,
            closeTmsPopover,
            saveTmsChanges
        } = useTransmissionPopover(nodes, setNodes, edges, setEdges);

        const onNodeDoubleClick = (event, node) => {
            if (node.type === "state") {
                event.stopPropagation();
                setSelectedNode(node);
                setIsNodePopoverOpen(true);
                setNodePosition({y: event.clientY, x: event.clientX})
            }
            if (node.type === "infection") {
                event.stopPropagation();
                openTmsPopover(event, node)
            }
        };

        const {
            isEdgePopoverOpen,
            selectedEdge,
            openEdgePopover,
            closeEdgePopover,
            handleEdgeInputChange,
            edgePosition,
            addParam,
            deleteParam
        } = useEdgePopover(setEdges);

        const onEdgeDoubleClick = (event, edge) => {
            event.stopPropagation();
            switch (edge.type) {
                case "transition":
                    openEdgePopover(event, edge);
                    break;
                case "infection":
                    openTmsPopover(event, nodes.find(node => node.id === edge.target));
                    break;
                case "tmsTrans":
                    openTmsPopover(event, nodes.find(
                        node => node.id === `tms_${edge.id.split('_')[1]}`
                    ))
                    break;
                default:
                    return;
            }
        };

        return (
            <div>
                <MarkerDefinition/>
                <NodeCreator
                    nodes={nodes}
                    setNodes={setNodes}
                />
                <TransmissionCreator
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
                <TransmissionPopover
                    isTmsPopoverOpen={isTmsPopoverOpen}
                    tmsPopoverPosition={tmsPopoverPosition}
                    selectedTmsSource={selectedTmsSource}
                    setSelectedTmsSource={setSelectedTmsSource}
                    selectedTmsTarget={selectedTmsTarget}
                    setSelectedTmsTarget={setSelectedTmsTarget}
                    selectedTmsActors={selectedTmsActors}
                    handleAddTmsActor={handleAddTmsActor}
                    handleTmsParameterChange={handleTmsParameterChange}
                    handleRemoveTmsActor={handleRemoveTmsActor}
                    tmsActorParameters={tmsActorParameters}
                    susceptibleNodes={susceptibleNodes}
                    infectedNodes={infectedNodes}
                    closeTmsPopover={closeTmsPopover}
                    saveTmsChanges={saveTmsChanges}
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
                        deleteKeyCode={["Backspace", "Delete"]}
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
