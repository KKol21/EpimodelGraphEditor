import React, {useEffect, useMemo, useRef} from 'react';
import {ReactFlow, useNodesState, useEdgesState} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Node types
import StateNode from "./nodeComponents/nodeTypes/StateNode";
import InfectionNode from "./nodeComponents/nodeTypes/InfectionNode";

// DAO
import NodeCreator from './nodeComponents/nodeCreator/NodeCreator';
import useEdgeConnection from '../../hooks/useEdgeConnection';
import {Popovers} from "./Popovers";

// Edge types
import TransitionEdge from './edgeComponents/TransitionEdge';
import InfectionEdge from "./edgeComponents/InfectionEdge";
import TmsTransitionEdge from "./edgeComponents/TmsTransitionEdge";

// Other
import MarkerDefinition from "../svg/MarkerDefinition";
import SaveFlowButton from "../SaveFlowButton";
import {ReactFlowProvider} from "reactflow";

const nodeTypes = {
    state: StateNode,
    infection: InfectionNode
}


const GraphEditor = ({initialNodes, initialEdges}) => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const popoversRef = useRef();

    const nodesRef = useRef(nodes);
    useEffect(() => {
        nodesRef.current = nodes;
    }, [nodes]);

    // Memoize edgeTypes with an empty dependency array so that its reference remains constant.
    const edgeTypes = useMemo(() => ({
        transition: (edgeProps) => <TransitionEdge {...edgeProps} nodes={nodesRef.current} />,
        infection: InfectionEdge,
        tmsTrans: TmsTransitionEdge,
    }), []);

    const onConnect = useEdgeConnection(setEdges);

    const onNodeDoubleClick = (event, node) => {
        popoversRef.current.onNodeDoubleClick(event, node);
    };

    const onEdgeDoubleClick = (event, edge) => {
        popoversRef.current.onEdgeDoubleClick(event, edge);
    };

    const openTmsCreator = (event) => {
        popoversRef.current.openTmsCreator(event);
    }

    return (
        <ReactFlowProvider>
            <div>
                <MarkerDefinition/>
                <NodeCreator
                    nodes={nodes}
                    setNodes={setNodes}
                />
                <Popovers
                    ref={popoversRef}
                    nodes={nodes}
                    setNodes={setNodes}
                    edges={edges}
                    setEdges={setEdges}
                />
                <div style={{width: '100vw', height: '100vh', position: 'relative'}}>
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
                        style={{width: '100%', height: '100%'}}
                    />

                    <div style={{position: 'absolute', top: 10, left: 200}}>
                        <button onClick={openTmsCreator}>
                            Add transmission rule
                        </button>
                    </div>

                    <div style={{position: 'absolute', top: 10, left: 10}}>
                        <SaveFlowButton nodes={nodes} edges={edges}/>
                    </div>
                </div>
            </div>
        </ReactFlowProvider>
    );
};

export default GraphEditor;
