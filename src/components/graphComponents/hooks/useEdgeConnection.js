import { useCallback } from 'react';
import { addEdge} from '@xyflow/react';

const useEdgeConnection = (setEdges) => {
    return useCallback(
        (params) =>
            setEdges((eds) =>
                addEdge({
                        ...params,
                        type: "transition",
                        markerEnd: "arrow",
                        data: {param: 'Edge Label'}
                    },
                    eds)),
        [setEdges]
    );
};

export default useEdgeConnection;
