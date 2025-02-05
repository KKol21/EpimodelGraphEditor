import React from 'react';
import { getBezierPath, BaseEdge } from '@xyflow/react';

export default function TmsTransitionEdge({ id, data, label, markerEnd, ...props }) {
    const [edgePath, labelX, labelY] = getBezierPath(props);

    return (
        <>
            <BaseEdge
                id={id}
                path={edgePath}
                markerEnd={markerEnd}
                // either pass label directly or read from data
                label={data?.label ?? label}
                labelX={labelX}
                labelY={labelY}
            />
            <circle
                style={{ filter: 'drop-shadow(3px 3px 5px #00ff00)' }}
                r="4"
                fill="#00ff00"
                className="circle"
            >
                <animateMotion dur="3s" repeatCount="indefinite" path={edgePath} />
            </circle>
        </>
    );
}
