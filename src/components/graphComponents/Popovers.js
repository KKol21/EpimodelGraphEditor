import React, {forwardRef, useImperativeHandle} from 'react';
import NodePopover from './nodeComponents/nodePopover/NodePopover';
import EdgePopover from "./edgeComponents/edgePopover/EdgePopover";
import TransmissionPopover from "./transmissionComponents/transmissionPopover/TransmissionPopover";
import useNodePopover from './nodeComponents/nodePopover/useNodePopover';
import useEdgePopover from "./edgeComponents/edgePopover/useEdgePopover";
import useTransmissionPopover from "./transmissionComponents/transmissionPopover/useTransmissionPopover";

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
    } = useNodePopover(setNodes);

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

    // Transmission Popover Logic
    const {
        isTmsPopoverOpen,
        openTmsPopover,
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
        closeTmsPopover,
        saveTmsChanges
    } = useTransmissionPopover(nodes, setNodes, edges, setEdges);

    useImperativeHandle(ref, () => ({
        onNodeDoubleClick(event, node) {
            event.stopPropagation();
            switch (node.type) {
                case ("state"):
                    openNodePopover(event, node);
                    break;
                case ("infection"):
                    openTmsPopover(event, node);
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
        </>
    );
});
