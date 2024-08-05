import {useState} from 'react';


const useNodePopover = (setElements) => {
    const [isNodePopoverOpen, setIsNodePopoverOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [nodePosition, setNodePosition] = useState({y: 0, x: 0});

    const onNodeDoubleClick = (event, node) => {
        if (node.type === "state") {
            event.stopPropagation();
            setSelectedNode(node);
            setIsNodePopoverOpen(true);
            setNodePosition({y: event.clientY, x: event.clientX})
        }
    };

    const handleNodeInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedNode((prevState) => ({
            ...prevState,
            data: {
                ...prevState.data,
                [name]: name === 'n_substates' ? parseInt(value) : value,
            },
        }));
    };

    const saveChanges = () => {
        setElements((els) =>
            els.map((el) =>
                el.id === selectedNode.id ? { ...el, data: { ...selectedNode.data } } : el
            )
        );
    };

    const closeNodePopover = () => {
        setIsNodePopoverOpen(false);
        setSelectedNode(null);
        saveChanges();
    };

    return {
        isNodePopoverOpen,
        selectedNode,
        onNodeDoubleClick,
        closeNodePopover,
        handleNodeInputChange,
        nodePosition
    };
};

export default useNodePopover;
