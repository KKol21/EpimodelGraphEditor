import React from 'react';
import {getBezierPath, BaseEdge} from '@xyflow/react';


export default function InfectionEdge({id, label, markerEnd, ...props}) {
    const [edgePath, labelX, labelY] = getBezierPath(props);
    return (
        <>
            <BaseEdge id={id}
                      path={edgePath}
                      markerEnd={markerEnd}
                      label={label}
                      labelX={labelX}
                      labelY={labelY}
            />
        </>
    );
};
