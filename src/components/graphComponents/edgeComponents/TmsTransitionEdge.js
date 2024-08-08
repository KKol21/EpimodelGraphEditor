import React from 'react';
import {getBezierPath, BaseEdge, EdgeLabelRenderer} from '@xyflow/react';


export default function TmsTransitionEdge({id, data, markerEnd, ...props}) {
    const [edgePath, labelX, labelY] = getBezierPath(props);

    return (
        <>
            <BaseEdge id={id}
                      path={edgePath}
                      markerEnd={markerEnd}/>
            <circle
                style={{filter: `drop-shadow(3px 3px 5px #00ff00`}}
                r="4"
                fill={`#00ff00`}
                className="circle"
            >
                <animateMotion dur="3s" repeatCount="indefinite" path={edgePath}/>
            </circle>
        </>
    );
};
