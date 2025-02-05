import { useState } from 'react';

const useNodePopover = (setNodes, setEdges) => {
    const [isNodePopoverOpen, setIsNodePopoverOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodePosition, setNodePosition] = useState({ y: 0, x: 0 });
    const [originalID, setOriginalID] = useState(null);

    const openNodePopover = (event, node) => {
        setSelectedNode(node);
        setIsNodePopoverOpen(true);
        setOriginalID(node.id);
        setNodePosition({ y: event.clientY, x: event.clientX });
    };

    const handleNodeInputChange = (e) => {
        const { name, value } = e.target;

        setSelectedNode((prevState) => {
            if (!prevState) return prevState;
            return {
                ...prevState,
                // If the label input is changed, update the node's id
                id: name === "label" ? value : prevState.id,
                data: {
                    ...prevState.data,
                    // For n_substates, ensure the value is converted to a number;
                    // For all other fields (including rate), store the string value
                    [name]: name === 'n_substates' ? parseInt(value, 10) : value,
                },
            };
        });
    };

    const saveChanges = () => {
        setNodes((els) =>
            els.map((el) => {
                if (el.id === selectedNode.id || el.id === originalID) {
                    return {
                        ...el,
                        id: selectedNode.id,
                        data: { ...selectedNode.data },
                    };
                }
                return el;
            })
        );
        setEdges((els) =>
            els.map((el) => ({
                ...el,
                source: el.source === originalID ? selectedNode.id : el.source,
                target: el.target === originalID ? selectedNode.id : el.target,
            }))
        );
    };

    const closeNodePopover = () => {
        saveChanges();
        setIsNodePopoverOpen(false);
        setSelectedNode(null);
    };

    return {
        isNodePopoverOpen,
        selectedNode,
        openNodePopover,
        closeNodePopover,
        handleNodeInputChange,
        nodePosition,
    };
};

export default useNodePopover;
