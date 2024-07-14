import {useState} from 'react';


const useNodeEditor = (setElements) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [position, setPosition] = useState({y: 0, x: 0});

    const onNodeClick = (event, node) => {
        event.stopPropagation();
        setSelectedNode(node);
        setIsPopoverOpen(true);
        setPosition({y: event.clientY, x: event.clientX})
    };

    const closePopover = () => {
        setIsPopoverOpen(false);
        setSelectedNode(null);
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
        closePopover();
    };

    return {
        isPopoverOpen,
        selectedNode,
        onNodeClick,
        closePopover,
        handleInputChange,
        saveChanges,
        position
    };
};

export default useNodeEditor;
