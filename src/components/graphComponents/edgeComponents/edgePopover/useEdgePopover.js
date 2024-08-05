import { useState } from 'react';

const useEdgePopover = (setEdges) => {
    const [isEdgePopoverOpen, setIsEdgePopoverOpen] = useState(false);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [edgePosition, setEdgePosition] = useState({ y: 0, x: 0 });

    const onEdgeDoubleClick = (event, edge) => {
        event.stopPropagation();
        setSelectedEdge(edge);
        setIsEdgePopoverOpen(true);
        setEdgePosition({ y: event.clientY, x: event.clientX });
    };

    const handleEdgeInputChange = (index, e) => {
        const { value } = e.target;
        setSelectedEdge((prevState) => {
            const updatedParams = [...prevState.data.params];
            updatedParams[index] = value;
            return {
                ...prevState,
                data: {
                    ...prevState.data,
                    params: updatedParams,
                },
            };
        });
    };

    const saveChanges = () => {
        setEdges((edges) =>
            edges.map((el) =>
                el.id === selectedEdge.id ? { ...el, data: { ...selectedEdge.data } } : el
            )
        );
    };

    const closeEdgePopover = () => {
        setIsEdgePopoverOpen(false);
        setSelectedEdge(null);
        saveChanges();
    };

    const addParam = (param) => {
        setSelectedEdge((prev) => ({
            ...prev,
            data: {
                ...prev.data,
                params: [...prev.data.params, param],
            },
        }));
    };

    const deleteParam = (index) => {
        setSelectedEdge((prev) => {
            const updatedParams = prev.data.params.filter((_, i) => i !== index);
            return {
                ...prev,
                data: {
                    ...prev.data,
                    params: updatedParams,
                },
            };
        });
    };

    return {
        isEdgePopoverOpen,
        selectedEdge,
        onEdgeDoubleClick,
        closeEdgePopover,
        handleEdgeInputChange,
        edgePosition,
        addParam,
        deleteParam
    };
};

export default useEdgePopover;
