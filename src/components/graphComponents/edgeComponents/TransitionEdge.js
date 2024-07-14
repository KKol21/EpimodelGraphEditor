import React from 'react';
import {getBezierPath, BaseEdge, EdgeLabelRenderer} from 'reactflow';


export default function TransitionEdge({id, data, markerEnd, ...props}) {
    const [edgePath, labelX, labelY] = getBezierPath(props);
    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd}/>
            <EdgeLabelRenderer>
                <div
                    style={{
                        position: 'absolute',
                        transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
                        background: '#ffcc00',
                        padding: 10,
                        borderRadius: 5,
                        fontSize: 12,
                        fontWeight: 700,
                    }}
                    className="nodrag nopan"
                >
                    {data.param}
                </div>
            </EdgeLabelRenderer>
        </>
    );
};
