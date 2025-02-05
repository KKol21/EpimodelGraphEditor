import { useState, useCallback } from 'react';

const useEdgePopover = (setEdges) => {
    const [isEdgePopoverOpen, setIsEdgePopoverOpen] = useState(false);
    const [selectedEdge, setSelectedEdge] = useState(null);
    const [edgePosition, setEdgePosition] = useState({ x: 0, y: 0 });

    const openEdgePopover = useCallback((event, edge) => {
        setSelectedEdge(edge);
        setEdgePosition({ x: event.clientX, y: event.clientY });
        setIsEdgePopoverOpen(true);
    }, []);

    const handleEdgeInputChange = useCallback((index, e) => {
        const { value } = e.target;
        setSelectedEdge((prev) => {
            if (!prev || !prev.data?.params) return prev;
            const updatedParams = [...prev.data.params];
            updatedParams[index] = value;
            return {
                ...prev,
                data: {
                    ...prev.data,
                    params: updatedParams,
                },
            };
        });
    }, []);

    const saveChanges = useCallback(() => {
        if (!selectedEdge) return;
        setEdges((edges) =>
            edges.map((el) =>
                el.id === selectedEdge.id
                    ? {
                        ...el,
                        data: {
                            ...selectedEdge.data,
                            // Filter out any empty parameters
                            params: (selectedEdge?.data?.params || []).filter((param) => param.trim() !== ''),
                        },
                    }
                    : el
            )
        );
    }, [selectedEdge, setEdges]);

    const closeEdgePopover = useCallback(() => {
        saveChanges();
        setIsEdgePopoverOpen(false);
        setSelectedEdge(null);
    }, [saveChanges]);

    const addParam = useCallback((param) => {
        setSelectedEdge((prev) => {
            if (!prev || !prev.data) return prev;
            return {
                ...prev,
                data: {
                    ...prev.data,
                    params: [...(prev.data.params || []), param],
                },
            };
        });
    }, []);

    const deleteParam = useCallback((index) => {
        setSelectedEdge((prev) => {
            if (!prev || !prev.data?.params) return prev;
            const updatedParams = prev.data.params.filter((_, i) => i !== index);
            return {
                ...prev,
                data: {
                    ...prev.data,
                    params: updatedParams,
                },
            };
        });
    }, []);

    return {
        isEdgePopoverOpen,
        selectedEdge,
        edgePosition,
        openEdgePopover,
        closeEdgePopover,
        handleEdgeInputChange,
        addParam,
        deleteParam,
    };
};

export default useEdgePopover;
