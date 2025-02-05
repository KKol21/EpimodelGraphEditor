import React from 'react';
import {getBezierPath, BaseEdge, EdgeLabelRenderer} from '@xyflow/react';


export default function TransitionEdge({id, data, markerEnd, source, nodes, ...props}) {
    const [edgePath, labelX, labelY] = getBezierPath(props);
    const trans_rate = nodes.find(node => node.id === source).data.rate;

    const getLabel = (params = []) => {
        const transformedParams = params
            .filter(param => param !== "")
            .map(param => param.endsWith('_') ? `(1 - ${param.slice(0, -1)})` : param)
            .join(' * ');

        return transformedParams ? `${trans_rate} * ${transformedParams}` : `${trans_rate}`;
    };

    return (
        <>
            <BaseEdge id={id}
                      path={edgePath}
                      markerEnd={markerEnd}/>
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
                    {getLabel(data.params)}
                </div>
            </EdgeLabelRenderer>
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
