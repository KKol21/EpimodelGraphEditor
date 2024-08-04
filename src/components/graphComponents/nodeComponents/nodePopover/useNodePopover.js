import {useState} from 'react';


const useNodePopover = (setElements) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [position, setPosition] = useState({y: 0, x: 0});

    const onNodeDoubleClick = (event, node) => {
        if (node.type === "state") {
            event.stopPropagation();
            setSelectedNode(node);
            setIsPopoverOpen(true);
            setPosition({y: event.clientY, x: event.clientX})
        }
    };

    const handleInputChange = (e) => {
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

    const closePopover = () => {
        setIsPopoverOpen(false);
        setSelectedNode(null);
        saveChanges();
    };

    return {
        isPopoverOpen,
        selectedNode,
        onNodeDoubleClick,
        closePopover,
        handleInputChange,
        position
    };
};

export default useNodePopover;
