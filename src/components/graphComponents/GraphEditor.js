// General imports
import React, {useState} from 'react';
import ReactFlow, {useNodesState, useEdgesState} from 'reactflow';
import 'reactflow/dist/style.css';

// Node related
import NodeCreator from './nodeComponents/NodeCreator';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import useNodeEditor from './nodeComponents/nodePopover/useNodeEditor';

// Edge related
import TransitionEdge from './edgeComponents/TransitionEdge';
import useEdgeConnection from './hooks/useEdgeConnection';

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import OutputForm from '../OutputForm';


const edgeTypes = {
    transition: TransitionEdge,
};


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
        saveChanges,
        nodeRef,
        position
    } = useNodeEditor(setNodes);

    return (
        <div>
            <MarkerDefinition/>
            <NodeCreator
                nodes={nodes}
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
                saveChanges={saveChanges}
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
                    style={{background: '#00fffB'}}
                />
            </div>
            <OutputForm nodes={nodes} edges={edges}/>
        </div>
    );
};

export default GraphEditor;
