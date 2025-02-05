import React, {forwardRef, useImperativeHandle, useState} from 'react';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import EdgePopover from "./edgeComponents/edgePopover/EdgePopover";

import TransmissionCreator from "./transmissionComponents/transmissionCreator/TransmissionCreator";
import TransmissionEditor from "./transmissionComponents/transmissionEditor/TransmissionEditor";
import useNodePopover from './nodeComponents/nodePopover/useNodePopover';
import useEdgePopover from "./edgeComponents/edgePopover/useEdgePopover";
import useTransmissionEditor from "./transmissionComponents/transmissionEditor/useTransmissionEditor";

export const Popovers =
    forwardRef(({ nodes, setNodes, edges, setEdges }, ref) => {
    // Node Popover Logic
    const {
        isNodePopoverOpen,
        selectedNode,
        openNodePopover,
        closeNodePopover,
        handleNodeInputChange,
        nodePosition
    } = useNodePopover(setNodes, setEdges);

    // Edge Popover Logic
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

    // Transmission creator Logic
    const [isCreatorOpen, setIsCreatorOpen] = useState(false);
    const [creatorPosition, setCreatorPosition] = useState({ x: 200, y: 100 });

    // Transmission Editor Logic
    const {
        // Popover
        isTmsEditorOpen,
        tmsEditorPosition,

        // Source & Target
        selectedTmsSource,
        setSelectedTmsSource,
        selectedTmsTarget,
        setSelectedTmsTarget,

        // Actors
        selectedTmsActors,
        handleAddTmsActor,
        handleTmsParameterChange,
        handleRemoveTmsActor,
        tmsActorParameters,

        // Susceptibility
        suscParams,
        addSuscParam,
        updateSuscParam,
        removeSuscParam,

        // Infectivity
        infParams,
        addInfParam,
        updateInfParam,
        removeInfParam,

        // Editor Actions
        openTmsEditor,
        closeTmsEditor,
        saveTmsChanges,
    } = useTransmissionEditor(nodes, setNodes, edges, setEdges);


        useImperativeHandle(ref, () => ({
        openTmsCreator(event) {
            event.stopPropagation();
            setIsCreatorOpen(true);
            setCreatorPosition({x: 500, y: 400});
        },
        onNodeDoubleClick(event, node) {
            event.stopPropagation();
            switch (node.type) {
                case ("state"):
                    openNodePopover(event, node);
                    break;
                case ("infection"):
                    openTmsEditor(event, node);
                    break;
                default:
            }
        },
        onEdgeDoubleClick(event, edge) {
            event.stopPropagation();
            switch (edge.type) {
                case "transition":
                    openEdgePopover(event, edge);
                    break;
                case "infection":
                    openTmsEditor(event, nodes.find(node => node.id === edge.target));
                    break;
                case "tmsTrans":
                    openTmsEditor(event, nodes.find(
                        node => node.id === `tms_${edge.id.split('_')[1]}`
                    ))
                    break;
                default:
                    return;
            }
        }
    }));

    const susceptibleNodes = nodes.filter(node => node.data && node.data.type === 'susceptible');
    const infectedNodes = nodes.filter(node => node.data && node.data.type === 'infected');

    return (
        <>
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
            <TransmissionCreator
                isCreatorOpen={isCreatorOpen}
                setIsCreatorOpen={setIsCreatorOpen}
                creatorPosition={creatorPosition}
                nodes={nodes}
                setNodes={setNodes}
                setEdges={setEdges}
            />
            <TransmissionEditor
                // Popover
                isTmsEditorOpen={isTmsEditorOpen}
                tmsEditorPosition={tmsEditorPosition}

                // Source & Target
                selectedTmsSource={selectedTmsSource}
                setSelectedTmsSource={setSelectedTmsSource}
                selectedTmsTarget={selectedTmsTarget}
                setSelectedTmsTarget={setSelectedTmsTarget}

                // Actors
                selectedTmsActors={selectedTmsActors}
                handleAddTmsActor={handleAddTmsActor}
                handleTmsParameterChange={handleTmsParameterChange}
                handleRemoveTmsActor={handleRemoveTmsActor}
                tmsActorParameters={tmsActorParameters}

                // Susceptibility Params
                suscParams={suscParams}
                addSuscParam={addSuscParam}
                updateSuscParam={updateSuscParam}
                removeSuscParam={removeSuscParam}

                // Infectivity Params
                infParams={infParams}
                addInfParam={addInfParam}
                updateInfParam={updateInfParam}
                removeInfParam={removeInfParam}

                // Node Lists
                susceptibleNodes={susceptibleNodes}
                infectedNodes={infectedNodes}

                // Popover actions
                closeTmsEditor={closeTmsEditor}
                saveTmsChanges={saveTmsChanges}
            />
        </>
    );
});
